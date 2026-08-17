import { test, expect } from '@playwright/test';
import { CartPage } from '../pages/cartPage';

test('verify cart items and remove product', async ({ page }) => {
await page.goto('https://www.saucedemo.com/');

await page.getByPlaceholder('Username').fill('standard_user');
await page.getByPlaceholder('Password').fill('secret_sauce');
await page.getByRole('button', { name: 'Login' }).click();

const product1 = 'Sauce Labs Backpack';
const product2 = 'Sauce Labs Bike Light';

await page
.locator('.inventory_item')
.filter({ hasText: product1 })
.getByRole('button', { name: 'Add to cart' })
.click();

await page
.locator('.inventory_item')
.filter({ hasText: product2 })
.getByRole('button', { name: 'Add to cart' })
.click();

const cartPage = new CartPage(page);
await cartPage.open();

const names = await cartPage.itemNames();

expect(names).toContain(product1);
expect(names).toContain(product2);

await cartPage.removeItem(product1);

const remainingNames = await cartPage.itemNames();

expect(remainingNames).toContain(product2);
expect(remainingNames).not.toContain(product1);
});