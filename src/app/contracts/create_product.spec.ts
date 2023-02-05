import { CreateProduct } from './create_product';

describe('Product', () => {
  it('should create an instance', () => {
    expect(new CreateProduct()).toBeTruthy();
  });
});
