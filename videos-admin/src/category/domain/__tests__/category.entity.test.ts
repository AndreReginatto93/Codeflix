import { EntityValidationError } from "../../../shared/domain/validators/validation.error";
import { Uuid } from "../../../shared/domain/value-objects/uuid.vo";
import { Category } from "../category.entity";


describe('Category Entity', () => {
    let validateSpy: any;
    
    beforeEach(() => {
        validateSpy = jest.spyOn(Category, 'validate');
    });

    test('should create a new category', () => {
        const category = Category.create({
            name: 'Category 1'
        });
        expect(category.category_id).toBeInstanceOf(Uuid);
        expect(category.name).toBe('Category 1');
        expect(category.description).toBe(null);
        expect(category.is_active).toBe(true);
        expect(category.created_at).toBeInstanceOf(Date);

        expect(validateSpy).toHaveBeenCalledTimes(1);
   
        const created_at = new Date();

        const category2 = new Category({
            name: 'Category 2',
            description: 'Description 2',
            is_active: false,
            created_at
        });

        expect(category2.category_id).toBeInstanceOf(Uuid);
        expect(category2.name).toBe('Category 2');
        expect(category2.description).toBe('Description 2');
        expect(category2.is_active).toBe(false);
        expect(category2.created_at).toBe(created_at);

    })

    test('should change name', () => {
        const category = Category.create({
            name: 'Category 1'
        });
        expect(validateSpy).toHaveBeenCalledTimes(1);
        category.changeName('Updated Category');
        expect(category.name).toBe('Updated Category');
        expect(validateSpy).toHaveBeenCalledTimes(2);
    });

    test('should change description', () => {
        const category = Category.create({
            name: 'Category 1',
            description: 'Initial Description'
        });
        expect(validateSpy).toHaveBeenCalledTimes(1);
        category.changeDescription('Updated Description');
        expect(category.description).toBe('Updated Description');
        expect(validateSpy).toHaveBeenCalledTimes(2);
    });

    test('should activate category', () => {
        const category = Category.create({
            name: 'Category 1',
            is_active: false
        });
        expect(validateSpy).toHaveBeenCalledTimes(1);
        category.activate();
        expect(category.is_active).toBe(true);
        expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    test('should deactivate category', () => {
        const category = Category.create({
            name: 'Category 1',
            is_active: true
        });
        expect(validateSpy).toHaveBeenCalledTimes(1);
        category.deactivate();
        expect(category.is_active).toBe(false);
        expect(validateSpy).toHaveBeenCalledTimes(1);
    });


    describe('category_id field', () => {
        test('should create a new category with category_id', () => {
            const category_id = new Uuid();
            const category = new Category({
                category_id,
                name: 'Category 1'
            });
            expect(category.category_id).toBe(category_id);

        });

        test('should throw an error if category_id is not a valid uuid', () => {
            expect(() => {
                new Category({
                    category_id: new Uuid('invalid-uuid'),
                    name: 'Category 1'
                });
            }).toThrowError('ID must be a valid UUID');
        });
    });
});

describe('Category Validator', () => {

    describe('Create command', () => {
        expect(() => {
            Category.create({
                name: null
            });
        }).containsErrorMessages([{
            name: [
                "name must be shorter than or equal to 255 characters",
                "name must be a string",
                "name should not be empty",
            ],
        }]);

        expect(() => 
            Category.create({
                name: null
            })
        ).containsErrorMessages([{
            name: [
                "name must be shorter than or equal to 255 characters",
                "name must be a string",
                "name should not be empty",
            ],
        }]);

    });

});