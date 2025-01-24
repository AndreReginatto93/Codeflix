import { NotFoundError } from "../../../../shared/domain/errors/not-found.error";
import { Uuid } from "../../../../shared/domain/value-objects/uuid.vo";
import { IUseCase } from "../../../../shared/application/use-case.interface";
import { Category } from "../../../domain/category.entity";
import { ICategoryRepository } from "../../../domain/category.repository";
import { CategoryOutput } from "../common/category-output";

export class GetCategoryUseCase implements IUseCase<GetCategoryInput, GetCategoryOutput> {
  
  constructor(private readonly categoryRepo: ICategoryRepository) {}
  
  async execute(input: GetCategoryInput): Promise<GetCategoryOutput> {
    const categoryId = new Uuid(input.id);
    const category = await this.categoryRepo.findById(categoryId);

    if (!category) {
      throw new NotFoundError(input.id, Category);
    }

    return {
      id: category.category_id.toString(),
      name: category.name,
      description: category.description,
      is_active: category.is_active,
      created_at: category.created_at
  }
  }
}

export type GetCategoryInput = {
  id: string;
}

export type GetCategoryOutput = CategoryOutput;