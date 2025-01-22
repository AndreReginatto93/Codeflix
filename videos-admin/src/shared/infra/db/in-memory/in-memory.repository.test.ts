import { Entity } from "../../../domain/entity";
import { NotFoundError } from "../../../domain/errors/not-found.error";
import { Uuid } from "../../../domain/value-objects/uuid.vo";
import { InMemoryRepository } from "./in-memory.repository";

type StubEntityProps = {
    entity_id?: Uuid;
    name: string;
    price: number;
}

class StubEntity extends Entity {
    entity_id: Uuid;
    name: string;
    price: number;

    toJSON() {
        return {
            entity_id: this.entity_id.id,
            name: this.name,
            price: this.price
        }
    }
    
    constructor(props : StubEntityProps) {
        super();
        this.entity_id = props.entity_id || new Uuid();
        this.name = props.name;
        this.price = props.price;
    }
}


class StubMemoryRepository extends InMemoryRepository<StubEntity, Uuid> {
    getEntity():new (...args: any[]) => StubEntity {
        return StubEntity;
    }
}

describe('InMemoryRepository', () => {
    let repo: StubMemoryRepository;

    beforeEach(() => {
        repo = new StubMemoryRepository();
    });

    test('should create a new entity', async () => {
        const entity = new StubEntity({
            name: 'Entity 1',
            price: 100,
        });
        await repo.insert(entity);
        
        repo.findAll().then(entities => {
            expect(entities).toHaveLength(1);
            expect(entities[0].name).toBe('Entity 1');
            expect(entities[0].price).toBe(100);
        });
    });

    test('should bulk insert entities', async () => {
        const entities = [
            new StubEntity({
                name: 'Entity 1',
                price: 100,
            }),
            new StubEntity({
                name: 'Entity 2',
                price: 200,
            }),
        ];
        await repo.bulkInsert(entities);
        
        repo.findAll().then(entities => {
            expect(entities).toHaveLength(2);
            expect(entities[0].name).toBe('Entity 1');
            expect(entities[0].price).toBe(100);
            expect(entities[1].name).toBe('Entity 2');
            expect(entities[1].price).toBe(200);
        });
    });

    test('should update an entity', async () => {
        const entity = new StubEntity({
            name: 'Entity 1',
            price: 100,
        });
        await repo.insert(entity);
        
        const updatedEntity = new StubEntity({
            entity_id: entity.entity_id,
            name: 'Updated Entity',
            price: 200,
        });
        await repo.update(updatedEntity);

        repo.findAll().then(entities => {
            expect(entities).toHaveLength(1);
            expect(entities[0].name).toBe('Updated Entity');
            expect(entities[0].price).toBe(200);
        });
    });

    test('should delete an entity', async () => {
        const entity = new StubEntity({
            name: 'Entity 1',
            price: 100,
        });
        await repo.insert(entity);
        
        await repo.delete(entity.entity_id);
    });

    test('should find an entity by id', async () => {
        const entity = new StubEntity({
            name: 'Entity 1',
            price: 100,
        });
        await repo.insert(entity);
        
        const foundEntity = await repo.findById(entity.entity_id);
        expect(foundEntity).not.toBeNull();
        expect(foundEntity?.name).toBe('Entity 1');
        expect(foundEntity?.price).toBe(100);
    });

    test('should return null if entity not found', async () => {
        const foundEntity = await repo.findById(new Uuid());
        expect(foundEntity).toBeNull();
    });

    test('should return all entities', async () => {
        const entities = [
            new StubEntity({
                name: 'Entity 1',
                price: 100,
            }),
            new StubEntity({
                name: 'Entity 2',
                price: 200,
            }),
        ];
        await repo.bulkInsert(entities);
        
        const foundEntities = await repo.findAll();
        expect(foundEntities).toHaveLength(2);
        expect(foundEntities[0].name).toBe('Entity 1');
        expect(foundEntities[0].price).toBe(100);
        expect(foundEntities[1].name).toBe('Entity 2');
        expect(foundEntities[1].price).toBe(200);
    });

    test('should return entity class', () => {
        const entityClass = repo.getEntity();
        expect(entityClass).toBe(StubEntity);
    });

    test('should throw NotFoundError if entity not found', async () => {

        const updatedEntity = new StubEntity({
            entity_id: new Uuid(),
            name: 'Updated Entity',
            price: 200,
        });
        await expect(repo.update(updatedEntity)).rejects.toThrowError(
            new NotFoundError(updatedEntity.entity_id, StubEntity)
        );
    });

    test('should throw NotFoundError if entity not found', async () => {
        const uuid = new Uuid();
        await expect(repo.delete(uuid)).rejects.toThrowError(
            new NotFoundError(uuid, StubEntity)
        );
    });
});