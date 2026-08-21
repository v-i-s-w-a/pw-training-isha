import { test, expect } from './fixtures';

test('verify cart items and remove product', async ({ cartPage }) => {
  const names = await cartPage.itemNames();

  expect(names).toContain('Sauce Labs Backpack');
  expect(names).toContain('Sauce Labs Bike Light');

  await cartPage.removeItem('Sauce Labs Backpack');

  const remainingNames = await cartPage.itemNames();

  expect(remainingNames).toContain('Sauce Labs Bike Light');
  expect(remainingNames).not.toContain('Sauce Labs Backpack');
});