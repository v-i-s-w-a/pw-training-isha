import { test, expect } from '@playwright/test';
import { CartPage } from '../pages/cartPage';

test('verify cart items and remove product', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByRole('button', { name: 'Add to cart' }).nth(0).click();
  await page.getByRole('button', { name: 'Add to cart' }).nth(1).click();

  const cartPage = new CartPage(page);
  await cartPage.open();

  const names = await cartPage.itemNames();

  expect(names).toHaveLength(2);
  await cartPage.removeItem(names[0]);

const remainingNames = await cartPage.itemNames();

expect(remainingNames).toContain(names[1]);
});