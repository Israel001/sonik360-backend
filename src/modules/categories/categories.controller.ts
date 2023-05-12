import { Controller, Get } from "@nestjs/common";
import { CategoriesService } from "./categories.service";

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @Get('/sub-categories')
  fetchSubCategories() {
    return this.categoryService.fetchSubCategories();
  }

  @Get('/main-categories')
  fetchMainCategories() {
    return this.categoryService.fetchMainCategories();
  }
}
