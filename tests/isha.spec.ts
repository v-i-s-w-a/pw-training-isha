import { test, expect } from '@playwright/test';

test('Check SauceDemo website', async ({ page }) => {

await page.goto('https://www.saucedemo.com/');

await expect(page).toHaveTitle('WRONG TITLE');

await expect(page).toHaveURL('https://www.saucedemo.com/');

});