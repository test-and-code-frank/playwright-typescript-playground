import { test, expect } from '@playwright/test';

import { LoginPom } from '../../pages/login.pom';
import { DashboardPom } from '../../pages/dashboard.pom';

import { loadYamlEnv } from '../../test-utils/config/load-yaml-env';

const env = loadYamlEnv();

test('retry and trace', async ({ page }) => {

  const loginPage = new LoginPom(page);
  const dashboard = new DashboardPom(page);

  // Navigate to login page
  await loginPage.goto();

  // Login
  await loginPage.login(env.username, env.password);

  // Expect to fail and retry
  expect(await dashboard.getHeaderText()).toBe('Wrong expected message');

});