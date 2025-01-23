import { Sequelize } from "sequelize-typescript";
import { Category } from "../../../../domain/category.entity";
import { CategoryModel } from "../category.models";


describe('CategoryModel Integration Tests', () => {
    let sequelize;

    beforeEach( async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            models: [CategoryModel]
        });

        await sequelize.sync({ force: true });
    });

    test('should create a new category', async () => {        
        // Arrange
        const categoryFake = Category.fake().aCategory().build();

        // Act
        const createdCategory = await CategoryModel.create({
            category_id: categoryFake.entity_id.id,
            name: categoryFake.name,
            description: categoryFake.description,
            is_active: categoryFake.is_active,
            created_at: categoryFake.created_at
        });

        // Assert
        expect(createdCategory.name).toBe(categoryFake.name);
        expect(createdCategory.description).toBe(categoryFake.description);
        expect(createdCategory.is_active).toBe(categoryFake.is_active);
    });
});