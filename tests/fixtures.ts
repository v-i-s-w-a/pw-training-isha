import { test as base, expect, Page } from '@playwright/test';
import { CartPage } from '../pages/cartPage';

type Fixtures = {
  inventoryPage: Page;
  cartPage: CartPage;
};

export const test = base.extend<Fixtures>({
  inventoryPage: async ({ page }, use) => {
    await page.goto('https://www.saucedemo.com/');

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    await use(page);
  },

  cartPage: async ({ inventoryPage }, use) => {
    const product1 = 'Sauce Labs Backpack';
    const product2 = 'Sauce Labs Bike Light';

    await inventoryPage
      .locator('.inventory_item')
      .filter({ hasText: product1 })
      .getByRole('button', { name: 'Add to cart' })
      .click();

    await inventoryPage
      .locator('.inventory_item')
      .filter({ hasText: product2 })
      .getByRole('button', { name: 'Add to cart' })
      .click();

    const cartPage = new CartPage(inventoryPage);
    await cartPage.open();

    await use(cartPage);
  },
});

export { expect };
