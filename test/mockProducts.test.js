import { faker } from '@faker-js/faker';

export const generateProduct = () => {
  const product = {
    id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    category: faker.commerce.department(),
    price: faker.commerce.price(),
    thumbnail: [],
    code: faker.string.alphanumeric(7),
    stock: faker.string.numeric(),
    status: faker.datatype.boolean(),
  };
  return product;
};
