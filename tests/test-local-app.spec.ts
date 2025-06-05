import { test, expect } from '@playwright/test';
import { format } from 'date-fns';

import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { FormPage } from '../pages/FormPage';
import { loadYAMLEnv } from '../src/utils/loadYAMLEnv';
import { getFormTestData } from '../src/util/loadExcelData';

const env = loadYAMLEnv();

test.describe('Form Submission - Excel Data Driven', () => {
  for (const [index, form_test] of formTests.entries()) {
    test(`should submit form successfully with input #${index + 1} (${form_test.text_input})`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const dashboard = new DashboardPage(page);
      const formPage = new FormPage(page);

      const date = new Date(form_test.date);
      const formattedDate = format(date, 'yyyy-MM-dd');
      const displayDate = format(date, 'yyyy-MM-dd');

      const expectedMessage = `Form submitted successfully! Text: ${form_test.text_input}, Option: ${form_test.selected_dropdown}, Date: ${displayDate}, Choice: ${form_test.select_radio}, Agreed: true`;

      await loginPage.goto();
      await loginPage.login(env.username, env.password);
      await dashboard.expectPageLoaded();
      await dashboard.goToFormPage();
      await formPage.expectPageLoaded();

      await formPage.fillTextInput(form_test.text_input);
      await formPage.selectDropdown(form_test.selected_dropdown);
      await formPage.fillDate(formattedDate);
      await formPage.selectRadioOption(form_test.select_radio);
      await formPage.checkAgree();
      await formPage.submit();

      const actualMessage = await formPage.getFormMessage();
      expect(actualMessage).toBe(expectedMessage);
    });
  }
});