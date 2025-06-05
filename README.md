# 🧪 Playwright TypeScript Playground

A personal playground for exploring and experimenting with Playwright using TypeScript. This project serves two main purposes:

- To play around with Playwright features and best practices.

- To showcase my understanding and practical knowledge of writing scalable and maintainable test automation using Playwright and TypeScript.


---

## 💡 Experiment Highlights

- ### Page Object Model (POM)
  Using the Page Object Model pattern to encapsulate UI interactions and selectors for maintainability and readability.
  
  ✅ Each page/component has its own class in the /pages/ directory
  
  ✅ Constructor receives the `Page` object
  
  ✅ Methods expose common actions and assertions
  
- ### Data-Driven Testing
  Exploring different approaches to run the same test logic against multiple sets of input data.

  ✅ Using Arrays + test.describe()
  
  ✅ Using CSV files as data sources. Used fs and csv-parse to read and parse test data
  
  🚧 Using Excel files as data sources
  
  > Attempted with exceljs, Issue: its async API didn’t play well with Playwright’s test declaration flow
  > Only one test would execute instead of iterating through all rows.
  > xlsx also has vulnerabilities.

- ### Assertions with Playwright
  Using Playwright Test Assertions to validate UI and behavior:

  ✅`expect(actualMessage).toBe(expectedMessage);` – Validating strings 
  
  ✅`expect(items.length).toBe(0)` – Validating item length
  
  ☐ `expect(locator).` - Validating locator properties.

- ### Screenshot on Failure
  Playwright automatically captures screenshots when a test fails (when configured). This helps with debugging visual or timing issues.
  
  ✅ Enabled via Playwright config: `screenshot: 'only-on-failure'`

- ### Test Reporting
  Experimenting with different reporting tools and formats to track test results effectively.

  ✅ Built-in HTML Reporter (Playwright)

- ### Configuration with YAML
  Experimenting with managing test data and dynamic config using .yaml files.
  
  ✅ Use Cases - Environment-specific settings (e.g., base URLs, credentials)

---

## 📁 Project Structure
```
playwright-typescript-playground/
├── config/             # Configuration utilities
├── pages/              # Page Object Models (POMs)
├── src/                # Optional utility or mock app logic
├── test-site/          # Static site for controlled testing
├── tests/              # Playwright test cases
├── playwright.config.ts
├── tsconfig.json
├── package.json
└── .gitignore
```

---

## 🚀 Getting Started
Prerequisites
Node.js (v16+)
npm or Yarn
```
git clone https://github.com/test-and-code-frank/playwright-typescript-playground.git
cd playwright-typescript-playground
npm install
npx playwright install
```

---

## 🧪 How to run the test

##### ✅ Run the entire test suite
```
npx playwright test
```

##### 🔍 Run a specific test file
```
npx playwright test tests/example.spec.ts
```

---

## 🎯Project Goals

Explore Playwright features like fixtures, context isolation, and tracing.

Demonstrate best practices in automation testing with TypeScript.

Use this as a portfolio project for future opportunities and growth.
