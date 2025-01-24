import { NotFoundError } from "../../../../shared/domain/errors/not-found.error";
import { Uuid } from "../../../../shared/domain/value-objects/uuid.vo";
import { IUseCase } from "../../../../shared/application/use-case.interface";
import { Category } from "../../../domain/category.entity";
import { ICategoryRepository } from "../../../domain/category.repository";
import { CategoryOutput } from "../common/category-output";

export class UpdateCategoryUseCase implements IUseCase<UpdateCategoryInput, UpdateCategoryOutput> {
  
  constructor(private readonly categoryRepo: ICategoryRepository) {}
  
  async execute(input: UpdateCategoryInput): Promise<UpdateCategoryOutput> {
    const categoryId = new Uuid(input.id);
    const category = await this.categoryRepo.findById(categoryId);

    if (!category) {
      throw new NotFoundError(input.id, Category);
    }

    input.name && category.changeName(input.name);

    if (input.description !== undefined) {
      category.changeDescription(input.description);
    }

    if (input.is_active === true) {
      category.activate();
    }

    if (input.is_active === false) {
      category.deactivate();
    }

    await this.categoryRepo.update(category);

    return {
      id: category.category_id.toString(),
      name: category.name,
      description: category.description,
      is_active: category.is_active,
      created_at: category.created_at
    }
  }
}

export type UpdateCategoryInput = {
  id: string;
  name?: string;
  description?: string | null;
  is_active?: boolean;
  created_at?: Date;
}


export type UpdateCategoryOutput = CategoryOutput;