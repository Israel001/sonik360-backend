import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Not, Repository } from 'typeorm';
import { Product } from './products.entity';
import { FILTER_TYPES, isNumeric } from 'src/utils';
import { SubCategories } from '../categories/sub_categories.entity';
import { SpecialCategories } from '../categories/special_categories.entity';

@Injectable()
export class ProductsService {
  public logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(Product) public productRepository: Repository<Product>,
    @InjectRepository(SubCategories)
    public subCategoryRepository: Repository<SubCategories>,
    @InjectRepository(SpecialCategories)
    public specialCategoryRepository: Repository<SpecialCategories>,
  ) {}

  async search(query: string) {
    const queryBuilder = this.productRepository.createQueryBuilder();
    queryBuilder
      .where('LOWER(name) LIKE :nameSearch', {
        nameSearch: `%${query.toLowerCase()}%`,
      })
      .orWhere('LOWER(brand) LIKE :brandSearch', {
        brandSearch: `%${query.toLowerCase()}%`,
      })
      .orWhere('LOWER(type) LIKE :typeSearch', {
        typeSearch: `%${query.toLowerCase()}%`,
      });
    const [data, total] = await queryBuilder.getManyAndCount();
    return { data, total };
  }

  async filter(filterType: string, filter: string) {
    const queryBuilder = this.productRepository.createQueryBuilder('product');
    switch (filterType) {
      case FILTER_TYPES.CATEGORY:
        return await queryBuilder
          .leftJoinAndSelect(
            'sub_categories',
            'subCategory',
            'subCategory.id = product.category',
          )
          .leftJoinAndSelect(
            'main_categories',
            'mainCategory',
            'mainCategory.id = subCategory.main_category_id',
          )
          .where(`LOWER(mainCategory.name) = '${filter}'`)
          .getMany();
      case FILTER_TYPES.SUB_CATEGORY:
        return await queryBuilder
          .leftJoinAndSelect(
            'sub_categories',
            'subCategory',
            'subCategory.id = product.category',
          )
          .where(`LOWER(subCategory.name) = '${filter}'`)
          .getMany();
      case FILTER_TYPES.BRAND:
        return await queryBuilder.where(`brand = '${filter}'`).getMany();
      case FILTER_TYPES.SPECIAL_CATEGORY:
        return await this.fetchSpecialCategoryProducts(filter);
    }
  }

  async fetchBrands(type: string) {
    const queryBuilder = this.productRepository.createQueryBuilder();
    let queryResult = await queryBuilder.select(['brand']).execute();
    let result = [];
    if (queryResult && queryResult.length) {
      result = queryResult.reduce((prev: any[], cur: { brand: string }) => {
        if (cur.brand.trim() && !prev.includes(cur.brand)) {
          if (
            type === 'gadgets' &&
            [
              'apple',
              'samsung',
              'jbl',
              'lenovo',
              'dell',
              'google',
              'asus',
              'msi',
              'sony',
              'hp',
              'tecno',
            ].includes(cur.brand.toLowerCase())
          ) {
            prev.push(cur.brand);
          } else if (
            type !== 'gadgets' &&
            ['lg', 'hisense', 'maxi', 'polystar'].includes(
              cur.brand.toLowerCase(),
            )
          ) {
            prev.push(cur.brand);
          }
        }
        return prev;
      }, []);
    }
    if (result.includes('Polystar')) {
      result.splice(
        result.findIndex((r) => r === 'Polystar'),
        1,
      );
      result.push('Polystar');
    }
    return result;
  }

  async fetchSomeProducts(names: string) {
    const productNames = names.split(',');
    const queryBuilder = this.productRepository.createQueryBuilder();
    queryBuilder.where(`name = '${productNames[0].trim()}'`);
    for (let i = 1; i < productNames.length; i++) {
      queryBuilder.orWhere(`name = '${productNames[i].trim()}'`);
    }
    const result = await queryBuilder.getMany();
    return result;
  }

  async fetchSpecialCategoryProducts(name: string) {
    const result = await this.specialCategoryRepository.findOne({
      where: { name },
    });
    return await this.fetchSomeProducts(result.products);
  }

  async fetch({
    filter,
    minPrice,
    maxPrice,
  }: {
    filter: string;
    minPrice: number;
    maxPrice: number;
  }) {
    const filters = filter ? filter.split(',') : [];
    const queryBuilder = this.productRepository.createQueryBuilder();
    if (minPrice || maxPrice) {
      queryBuilder.where(`price >= ${minPrice}`);
      queryBuilder.andWhere(`price <= ${maxPrice}`);
    }
    const categoryFilters = filters.filter((f) => isNumeric(f));
    const brandFilters = filters.filter((f) => !isNumeric(f));
    if (categoryFilters.length === 1) {
      queryBuilder.andWhere(`category_id = ${+categoryFilters[0]}`);
    } else if (categoryFilters.length > 1) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where(`category_id = ${+categoryFilters[0]}`);
          for (let i = 1; i < categoryFilters.length; i++) {
            qb.orWhere(`category_id = ${+categoryFilters[i]}`);
          }
        }),
      );
    }
    if (brandFilters.length === 1) {
      queryBuilder.andWhere(
        `LOWER(brand) = '${brandFilters[0].toLowerCase()}'`,
      );
    } else if (brandFilters.length > 1) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where(`LOWER(brand) = '${brandFilters[0].toLowerCase()}'`);
          for (let i = 1; i < brandFilters.length; i++) {
            qb.orWhere(`LOWER(brand) = '${brandFilters[i].toLowerCase()}'`);
          }
        }),
      );
    }
    const result = await queryBuilder.getMany();
    return result;
  }

  async getBySlug(slug: string) {
    return this.productRepository.findOne({ where: { slug } });
  }

  async getRelatedProducts(type: string, slug: string) {
    return this.productRepository.find({ where: { type, slug: Not(slug) } });
  }
}
