import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { format } from 'date-fns';

import { LoginPom } from '../../pages/login.pom';
import { DashboardPom } from '../../pages/dashboard.pom';
import { FormPom } from '../../pages/form.pom';

import { loadYamlEnv } from '../../test-utils/config/load-yaml-env';
import {normalize} from "../../test-utils/text-utils";


const env = loadYamlEnv();
const csvContent = fs.readFileSync(path.join(__dirname, '../../test-data/form test.csv'));
const formTests = parse(csvContent, { columns: true, skip_empty_lines: true });

for (const form_test of formTests) {
  test(`Form test: ${form_test.text_input}`, async ({ page }) => {

     const loginPage = new LoginPom(page);
      const dashboard = new DashboardPom(page);
      const formPage = new FormPom(page);

      const date = new Date(form_test.date);
      const formattedDate = format(date, 'yyyy-MM-dd');
      const displayDate = format(date, 'yyyy-MM-dd');

      const expectedMessage = `Form submitted successfully! 
      Text: ${form_test.text_input}, 
      Option: ${form_test.selected_dropdown}, 
      Date: ${displayDate},
      Choice: ${form_test.select_radio}, 
      Agreed: true`;


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
      await formPage.clickSubmit();

      const actualMessage = await formPage.getFormMessage();
      expect(normalize(actualMessage)).toBe(normalize(expectedMessage));
  });
}
