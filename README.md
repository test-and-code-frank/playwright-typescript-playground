# 🧪 Playwright TypeScript Playground

A personal playground for exploring and experimenting with Playwright using TypeScript. This project serves two main purposes:

🚀 To play around with Playwright features and best practices.

🧠 To showcase my understanding and practical knowledge of writing scalable and maintainable test automation using Playwright and TypeScript.


---

## 🚀 Features

- 🧪 **Data-Driven Testing**
  - The framework supports parameterized testing using:
    - pytest.mark.parametrize (manual inline data)
    - Excel files as an external data source (e.g., for login credentials, test inputs, etc.)


- 📌 **Assertions**
  - Validates test outcomes with clear and informative assertion messages.


- 📸 **Screenshot on Failure**
  - Capture screenshots automatically when a test fails (useful for debugging UI failures).


- 📄 **Page Object Model (POM)**
  - Encapsulates page-specific actions and locators in dedicated classes for maintainability.
  

- 📊 **Test Reporting**

- ⚙️ Configuration with YAML
  - This framework supports externalizing environment-specific variables using a YAML configuration file
  - Easier configuration for headless mode through `webdriver_visible: False` in the YAML

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
Apply the Page Object Model for reusable and clean test architecture.

Explore Playwright features like fixtures, context isolation, and tracing.

Demonstrate best practices in automation testing with TypeScript.

Use this as a portfolio project for future opportunities and growth.
---