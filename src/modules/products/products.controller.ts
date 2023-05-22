import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get('/search/:query')
  search(@Param('query') query: string) {
    return this.productService.search(query);
  }

  @Get('/some-products')
  fetchSomeProducts(@Query('names') names: string) {
    return this.productService.fetchSomeProducts(names);
  }

  @Get()
  fetch(
    @Query('filter') filter: string,
    @Query('minPrice', ParseIntPipe) minPrice: number,
    @Query('maxPrice', ParseIntPipe) maxPrice: number,
  ) {
    return this.productService.fetch({ filter, minPrice, maxPrice });
  }

  @Get('/brands')
  fetchBrands() {
    return this.productService.fetchBrands();
  }

  @Get('/:slug')
  getByName(@Param('slug') slug: string) {
    return this.productService.getBySlug(slug);
  }

  @Get('/related-products/:type/:slug')
  getRelatedProducts(@Param('type') type: string, @Param('slug') slug: string) {
    return this.productService.getRelatedProducts(type, slug);
  }
}
