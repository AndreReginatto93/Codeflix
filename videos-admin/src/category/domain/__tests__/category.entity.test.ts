import { Category } from "../category.entity";

test('xpto', () => {
    expect(1).toBe(1);
})


describe('Category Entity', () => {
    test('should create a new category', () => {
        const category = new Category({
            name: 'Category 1'
        });
        expect(category.category_id).toBeUndefined();
        expect(category.name).toBe('Category 1');
        expect(category.description).toBe(null);
        expect(category.is_active).toBe(true);
        expect(category.created_at).toBeInstanceOf(Date);
   
        const created_at = new Date();

        const category2 = new Category({
            name: 'Category 2',
            description: 'Description 2',
            is_active: false,
            created_at
        });

        expect(category2.category_id).toBeUndefined();
        expect(category2.name).toBe('Category 2');
        expect(category2.description).toBe('Description 2');
        expect(category2.is_active).toBe(false);
        expect(category2.created_at).toBe(created_at);

    })

    test('should change name', () => {
        const category = new Category({
            name: 'Category 1'
        });
        category.name = 'Updated Category';
        expect(category.name).toBe('Updated Category');
    });

    test('should change description', () => {
        const category = new Category({
            name: 'Category 1',
            description: 'Initial Description'
        });
        category.description = 'Updated Description';
        expect(category.description).toBe('Updated Description');
    });

    test('should activate category', () => {
        const category = new Category({
            name: 'Category 1',
            is_active: false
        });
        category.is_active = true;
        expect(category.is_active).toBe(true);
    });

    test('should deactivate category', () => {
        const category = new Category({
            name: 'Category 1',
            is_active: true
        });
        category.is_active = false;
        expect(category.is_active).toBe(false);
    });
})