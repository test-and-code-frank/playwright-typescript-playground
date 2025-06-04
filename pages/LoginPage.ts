import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('button[onclick="login()"]');
    this.errorMessage = page.locator('p.error', { hasText: 'Invalid credentials.' });
  }

  async goto() {
    await this.page.goto('file:///D:/Repo/playwright-typescript-playground/test-site/index.html');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async isInvalidLoginMessageVisible() {
    await this.errorMessage.waitFor({ state: 'visible' });
  }
}
