import { Page, Locator } from '@playwright/test';

export class FormPage {
  readonly page: Page;
  readonly formDropdown: Locator;
  readonly pageLoad: Locator;
  readonly textInput: Locator;
  readonly date: Locator;
  readonly agree: Locator;
  readonly submit: Locator;
  readonly formMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.formDropdown = page.locator('#dropdown');
    this.pageLoad = page.locator('#form-page');
    this.textInput = page.locator('#form-input');
    this.date = page.locator('#date');
    this.agree = page.locator('#agree')
    this.submit = page.locator('button', { hasText: 'Submit' });
    this.formMessage = page.locator('#form-message');
  }

  async expectPageLoaded() {
    await this.pageLoad.waitFor();
  }

  async fillTextInput(text: string) {
    await this.textInput.fill(text);
  }

  async selectDropdown(option: string) {
    await this.formDropdown.selectOption({ value: option });
  }

  async fillDate(date: string) {
    await this.date.fill(date);
  }

  async selectRadioOption(value: string) {
    await this.page.locator(`input[type="radio"][value="${value}"]`).check();
  }

  async checkAgree() {
    await this.agree.check();
  }

  async clickSubmit() {
    await this.submit.click();
  }

  async getFormMessage(): Promise<string> {
    return await this.formMessage.textContent() ?? '';
  }
}
