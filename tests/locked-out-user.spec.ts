import { test, expect } from '@playwright/test';

test('Verify locked out user error banner', async ({ page }) => {
await page.goto('https://www.saucedemo.com/');

await page.getByPlaceholder('Username').fill('locked_out_user');
await page.getByPlaceholder('Password').fill('secret_sauce');

await page.getByRole('button', { name: 'Login' }).click();

await expect(page.getByTestId('error')).toBeVisible();
});