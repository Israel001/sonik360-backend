import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Not, Repository } from 'typeorm';
import { Product } from './products.entity';
import { isNumeric } from 'src/utils';

@Injectable()
export class ProductsService {
  public logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(Product) public productRepository: Repository<Product>,
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

  async fetchBrands() {
    const queryBuilder = this.productRepository.createQueryBuilder();
    let queryResult = await queryBuilder.select(['brand']).execute();
    let result = [];
    if (queryResult && queryResult.length) {
      result = queryResult.reduce((prev: any[], cur: { brand: any }) => {
        if (!prev.includes(cur.brand)) prev.push(cur.brand);
        return prev;
      }, []);
    }
    return result;
  }

  async fetchSomeProducts(names: string) {
    const productNames = names.split(',');
    const queryBuilder = this.productRepository.createQueryBuilder();
    queryBuilder.where(`name = '${productNames[0]}'`);
    for (let i = 1; i < productNames.length; i++) {
      queryBuilder.orWhere(`name = '${productNames[i]}'`);
    }
    console.log("query", queryBuilder.getQuery());
    const result = await queryBuilder.getMany();
    return result;
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
