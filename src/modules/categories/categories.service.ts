import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MainCategories } from "./main_categories.entity";
import { Repository } from "typeorm";
import { SubCategories } from "./sub_categories.entity";

@Injectable()
export class CategoriesService {
  public logger = new Logger(CategoriesService.name);

  constructor(
    @InjectRepository(MainCategories) public mainCategoryRepository: Repository<MainCategories>,
    @InjectRepository(SubCategories) public subCategoryRepository: Repository<SubCategories>
  ) {}

  async fetchSubCategories() {
    return this.subCategoryRepository.find();
  }

  async fetchMainCategories() {
    return this.mainCategoryRepository.find();
  }
}
