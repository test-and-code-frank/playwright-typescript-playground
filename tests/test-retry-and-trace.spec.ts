import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

import { loadYAMLEnv } from '../src/utils/loadYAMLEnv';

const env = loadYAMLEnv();

test('retry and trace', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const dashboard = new DashboardPage(page);

  // Navigate to login page
  await loginPage.goto();

  // Login
  await loginPage.login(env.username, env.password);

  expect(await dashboard.getHeaderText()).toBe('Wrong expected message');

});