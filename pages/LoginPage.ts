
// Page: Represents a browser tab (or page) in Playwright.
// Locator: A smart, retryable reference to a DOM element (used to interact with or assert UI elements).
import { Page, Locator } from '@playwright/test';

export class LoginPage {

  // Using readonly means you can't reassign these properties once they’re set.
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

    // Targets a <p> element with class error and specific visible text "Invalid credentials".
    // The hasText option adds a filter to make the selector more precise.
    this.errorMessage = page.locator('p.error', { hasText: 'Invalid credentials.' });

  }

  /*
  What is async?
  When you mark a function with async, you're telling JavaScript/TypeScript:
  This function will do something that takes time (like loading a page, clicking a button, or waiting for a response),
  and it will return a Promise.
  */

  /*
  await is used inside an async function to pause the function's execution until a Promise resolves.
  */
 
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
