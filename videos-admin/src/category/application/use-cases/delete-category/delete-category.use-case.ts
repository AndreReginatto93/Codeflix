import { Uuid } from "../../../../shared/domain/value-objects/uuid.vo";
import { IUseCase } from "../../../../shared/application/use-case.interface";
import { ICategoryRepository } from "../../../domain/category.repository";

export class DeleteCategoryUseCase implements IUseCase<DeleteCategoryInput, DeleteCategoryOutput> {
  
  constructor(private readonly categoryRepo: ICategoryRepository) {}
  
  async execute(input: DeleteCategoryInput): Promise<DeleteCategoryOutput> {
    const categoryId = new Uuid(input.id);
    await this.categoryRepo.delete(categoryId);

  }
}

export type DeleteCategoryInput = {
  id: string;
}

export type DeleteCategoryOutput = void;