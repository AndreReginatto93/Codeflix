import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategorySequelizeRepository } from '../core/category/infra/db/sequelize/category-sequelize.repository';

@Controller('categories')
export class CategoriesController {
  constructor(private categoryRepo: CategorySequelizeRepository) {
    console.log(categoryRepo);
  }

  @Post()
  create() {}

  @Get()
  findAll() {}

  @Get(':id')
  findOne(@Param('id') id: string) {}

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {}

  @Delete(':id')
  remove(@Param('id') id: string) {}
}
