import { test, expect } from '@playwright/test';

test('Problem user sees the same image for all products', async ({ page }) => {
await page.goto('https://www.saucedemo.com/inventory.html');

const images = page.locator('.inventory_item_img img');

const imageSources = await images.evaluateAll(elements =>
    elements.map(element => element.getAttribute('src'))
);

expect(imageSources).toHaveLength(6);
expect(new Set(imageSources).size).toBe(1);
});