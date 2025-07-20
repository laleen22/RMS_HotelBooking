# 🏨 RMS Hotel Booking Automation - Playwright + TypeScript

This project is an automated test suite for the RMS Hotel Booking system using **Playwright** and **TypeScript**. It supports execution on both **desktop** and **mobile browsers**, and allows you to run tests across multiple environments like `QA1`, `QA2`, and `QA3`.

---

## 📁 Project Structure

```
RMS_HotelBooking/
├── tests/                    # Test specs
├── pages/                    # Page Object Model classes
├── utils/                    # Utility functions
├── test-data/               # Test data in structured format
├── .env                     # Environment variables
├── playwright.config.ts     # Playwright configuration
├── README.md                # Project instructions
```

---

## ⚙️ Installation Steps

### 🧱 Prerequisites

Ensure the following are installed:

- Node.js (v18+)
- npm (comes with Node.js)

---

### 📦 Setup Project

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd RMS_HotelBooking

# 2. Install dependencies
npm install

# 3. Install Playwright browsers
npx playwright install
```

---

## 🌍 Environment Setup

Create a `.env` file in the root with the following:

```env
QA1_URL=https://alphaibe12.rmscloud.com/22749/1
```

Set the environment before running tests:

```bash
# Mac/Linux
export TEST_ENV=QA1

# Windows CMD
set TEST_ENV=QA1

# PowerShell
$env:TEST_ENV="QA1"
```

---

## 🚀 Running Tests

### 💻 Desktop Browser

```bash
npx playwright test --project="Desktop Chrome"
```

### 📱 Mobile Browser (iPhone 13)

```bash
npx playwright test --project="Mobile Safari"
```

---

## 🧪 Running Specific Test File

```bash
npx playwright test tests/hotelBooking.spec.ts --project="Desktop Chrome" --headed
```

---

## 📊 Generating and Viewing HTML Report

Generate and view report after test execution:

```bash
npx playwright show-report reports/html-report
```

---

## 🔐 Sensitive Data Handling

Sensitive values like card numbers are stored in **encrypted mode**. Do **not** hard-code them in test files. For enhanced security:

- Use CI secrets or secure vaults in pipelines.

---

## 👤 Contributors

- Laleen Pallegoda

---

## 📄 License

MIT

---