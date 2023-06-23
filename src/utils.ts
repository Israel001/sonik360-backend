export const isNumeric = (value: string) => {
  return /^\d+$/.test(value);
};

export enum FILTER_TYPES {
  CATEGORY = 'category',
  SUB_CATEGORY = 'subCategory',
  BRAND = 'brand',
  SPECIAL_CATEGORY = 'specialCategory',
}
