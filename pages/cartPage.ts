import { BasePage } from './basePage';
import { Page } from '@playwright/test';

export class CartPage extends BasePage {
constructor(page: Page) {
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