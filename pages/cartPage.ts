import { BasePage } from './basePage';

export class CartPage extends BasePage {
  constructor(page) {
    super(page, '/cart.html');
  }

  async itemNames() {
    return this.page.locator('.inventory_item_name').allTextContents();
  }

  async removeItem(productName: string) {
    await this.page
      .locator('.cart_item')
      .filter({ hasText: productName })
      .locator('button')
      .click();
  }
}