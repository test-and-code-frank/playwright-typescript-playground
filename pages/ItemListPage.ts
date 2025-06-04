import { Page, Locator } from '@playwright/test';

export class ItemListPage {
  readonly page: Page;
  readonly itemInput: Locator;
  readonly addItemButton: Locator;
  readonly itemEditInput: Locator;
  readonly saveButton: Locator;
  readonly backToDashboardButton: Locator;
  readonly itemListSection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemInput = page.locator('#item-input');
    this.addItemButton = page.locator('button', { hasText: 'Add Item' });
    this.itemEditInput = page.locator('li input');
    this.saveButton = page.locator('button', { hasText: 'Save' });
    this.backToDashboardButton = page.locator('#list-page button', { hasText: 'Back to Dashboard' });
    this.itemListSection = page.locator('#list-page');
  }

  async expectPageLoaded() {
    await this.itemListSection.waitFor();
  }

  async addItem(item: string) {
    await this.itemInput.fill(item);
    await this.addItemButton.click();
  }

  async editItem(oldName: string, newName: string) {
    const editButton = this.page.locator(`//span[text()='${oldName}']/following-sibling::button[1]`);
    await editButton.click();
    await this.itemEditInput.fill(newName);
    await this.saveButton.click();
  }

  async deleteItem(name: string) {
    const deleteButton = this.page.locator(`//span[text()='${name}']/following-sibling::button[2]`);
    await deleteButton.click();
  }

  async getItems(): Promise<string[]> {
    const items = this.page.locator('#item-list li span');
    return await items.allTextContents();
  }

  async goBackToDashboard() {
    await this.backToDashboardButton.click();
  }
}
