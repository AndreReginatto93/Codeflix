import { IUseCase } from "../../../../shared/application/use-case.interface";
import { Category } from "../../../domain/category.entity";
import { ICategoryRepository } from "../../../domain/category.repository";
import { CategoryOutput } from "../common/category-output";

export class CreateCategoryUseCase implements IUseCase<CreateCategoryInput, CreateCategoryOutput> {
  
  constructor(private readonly categoryRepository: ICategoryRepository) {}
  
  async execute(data: CreateCategoryInput): Promise<CreateCategoryOutput> {
    const category = Category.create(data);

    await this.categoryRepository.insert(category);

    return {
        id: category.category_id.toString(),
        name: category.name,
        description: category.description,
        is_active: category.is_active,
        created_at: category.created_at
    }
  }
}

export type CreateCategoryInput = {
    name: string;
    description?: string | null;
    is_active?: boolean;
}


export type CreateCategoryOutput = CategoryOutput;