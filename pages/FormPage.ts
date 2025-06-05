import { Page } from '@playwright/test';

export class FormPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectPageLoaded() {
    await this.page.locator('#form-page').waitFor();
  }

  async fillTextInput(text: string) {
    await this.page.locator('#form-input').fill(text);
  }

  async selectDropdown(option: string) {
    await this.page.locator('#dropdown').selectOption({ value: option });
  }

  async fillDate(date: string) {
    await this.page.locator('#date').fill(date);
  }

  async selectRadioOption(value: string) {
    await this.page.locator(`input[type="radio"][value="${value}"]`).check();
  }

  async checkAgree() {
    await this.page.locator('#agree').check();
  }

  async submit() {
    await this.page.locator('button', { hasText: 'Submit' }).click();
  }

  async getFormMessage(): Promise<string> {
    const rawText = await this.page.locator('#form-message').textContent() ?? '';
    return rawText
    .replace(/\s+/g, ' ')  // collapse all whitespace to single spaces
    .trim();
  }
}
