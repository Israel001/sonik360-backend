export interface ISeeder {
  run(): Promise<any>
}

export interface ISeederConstructor {
  new(...args): ISeeder
}

export interface IFindClassArgument {
  foundArgument: boolean,
  foundValue: boolean,
  argumentindex?: number,
  className?: string
}

export interface IProductSeedAttribute {
  [x: string]: string;
}

export interface IReview {
  name: string;
  review: string;
  email: string;
  rating: number;
}

export interface IProductSeed {
  name: string;
  brand: string;
  image: string;
  price: number;
  availability: number;
  colors: string[];
  category: string;
  subCategory: string;
  type: string;
  attributes: IProductSeedAttribute;
  reviews: IReview[];
  shortDescription: string;
  originalPrice: number;
  discount: number;
}
