import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

import { getFormTestData } from '../src/utils/loadExcelData';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { FormPage } from '../pages/FormPage';
import { format } from 'date-fns';
import { loadYAMLEnv } from '../src/utils/loadYAMLEnv';

const env = loadYAMLEnv();
const csvContent = fs.readFileSync(path.join(__dirname, '../test-data/form test.csv'));
const formTests = parse(csvContent, { columns: true, skip_empty_lines: true });

for (const form_test of formTests) {
  test(`Form test: ${form_test.text_input}`, async ({ page }) => {

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
