import { Logger } from '@nestjs/common';
import { MainCategories } from 'src/modules/categories/main_categories.entity';
import { SubCategories } from 'src/modules/categories/sub_categories.entity';
import { Product } from 'src/modules/products/products.entity';
import { Repository } from 'typeorm';
import { IProductSeed } from './seeder.interface';
import slug from 'slug';

const logger = new Logger('SeederRunner');

const saveProduct = async (
  prd: IProductSeed,
  productRepo: Repository<Product>,
  mainCategoryRepo: Repository<MainCategories>,
  subCategoryRepo: Repository<SubCategories>,
) => {
  let mainCategory = await mainCategoryRepo.findOne({
    where: { name: prd.category },
  });
  if (!mainCategory) {
    mainCategory = mainCategoryRepo.create({
      name: prd.category,
    });
    mainCategory = await mainCategory.save();
  }

  let subCategory = await subCategoryRepo.findOne({
    where: { name: prd.subCategory },
  });
  if (!subCategory) {
    subCategory = subCategoryRepo.create({
      name: prd.subCategory,
      brands: prd.brand,
    });
    subCategory.mainCategory = Promise.resolve(mainCategory);
    subCategory = await subCategory.save();
  } else {
    subCategory.mainCategory = Promise.resolve(mainCategory);
    if ((await subCategory.mainCategory).name !== prd.category) {
      logger.error(
        `Error occurred when seeding product ${prd.name}: '${prd.subCategory}' is not a subcategory of '${prd.category}'`,
      );
      return false;
    }
    const brands = subCategory.brands.split(',');
    brands.push(prd.brand);
    subCategory.brands = brands.join(',');
    subCategory = await subCategory.save();
  }

  let product = productRepo.create({
    name: prd.name,
    slug: slug(prd.name),
    brand: prd.brand,
    price: prd.price,
    image: prd.image,
    availability: prd.availability,
    colors: prd.colors.join(','),
    attributes: JSON.stringify(prd.attributes),
    type: prd.type,
    reviews: JSON.stringify(prd.reviews),
    shortDescription: prd.shortDescription,
    originalPrice: prd.originalPrice,
    discount: prd.discount,
  });
  product.category = Promise.resolve(subCategory);
  product = await product.save();
};

export const seederRunner = async (
  productsData: IProductSeed[],
  productRepo: Repository<Product>,
  mainCategoryRepo: Repository<MainCategories>,
  subCategoryRepo: Repository<SubCategories>,
) => {
  await productRepo.delete({});
  await subCategoryRepo.delete({});
  await mainCategoryRepo.delete({});
  for (const prd of productsData) {
    await saveProduct(
      prd,
      productRepo,
      mainCategoryRepo,
      subCategoryRepo,
    ).catch((error) => {
      logger.error(
        `Error occurred when seeding product: '${prd.name}'`,
        error.stack,
        'ProductSeeder',
      );
    });
  }
  return true;
};
