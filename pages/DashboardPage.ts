import { Page, Locator } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly dashboardSection: Locator;
  readonly goToItemListButton: Locator;
  readonly goToFormPageButton: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashboardSection = page.locator('#dashboard');
    this.goToItemListButton = page.locator('button', { hasText: 'Go to Item List Page' });
    this.goToFormPageButton = page.locator('button', { hasText: 'Go to Form Page' });
    this.logoutButton = page.locator('button', { hasText: 'Logout' });
  }

  async expectPageLoaded() {
    await this.dashboardSection.waitFor();
  }

  async goToItemListPage() {
    await this.goToItemListButton.click();
  }

  async goToFormPage() {
    await this.goToFormPageButton.click();
  }

  async logout() {
    await this.logoutButton.click();
  }
}
