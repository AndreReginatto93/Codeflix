import { Uuid } from '../../shared/domain/value-objects/uuid.vo';
import { CategoryValidatorFactory } from './category.validator';
import { Entity } from '../../shared/domain/entity';
import { CategoryFakeBuilder } from './category-fake.builder';

export type CategoryConstructorProps = {
  category_id?: Uuid;
  name: string;
  description?: string | null;
  is_active?: boolean;
  created_at?: Date;
};

export type CategoryCreateProps = {
  name: string;
  description?: string | null;
  is_active?: boolean;
};

export class Category extends Entity {
  get entity_id(): Uuid {
    return this.category_id;
  }
  category_id: Uuid;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;

  constructor(props: CategoryConstructorProps) {
    super();
    this.category_id = props.category_id ?? new Uuid();
    this.name = props.name;
    this.description = props.description ?? null;
    this.is_active = props.is_active ?? true;
    this.created_at = props.created_at ?? new Date();
  }

  static create(props: CategoryCreateProps): Category {
    const category = new Category(props);
    category.validate(['name']);
    return category;
  }

  changeName(name: string): void {
    this.name = name;
    this.validate(['name']);
  }

  changeDescription(description: string): void {
    this.description = description;
  }

  activate(): void {
    this.is_active = true;
  }

  deactivate(): void {
    this.is_active = false;
  }

  validate(fields?: string[]) {
    const validator = CategoryValidatorFactory.create();
    return validator.validate(this.notification, this, fields);
  }

  static fake() {
    return CategoryFakeBuilder;
  }

  toJSON() {
    return {
      category_id: this.category_id.id,
      name: this.name,
      description: this.description,
      is_active: this.is_active,
      created_at: this.created_at,
    };
  }
}
