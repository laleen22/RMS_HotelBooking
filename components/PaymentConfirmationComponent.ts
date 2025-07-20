import { expect, Page } from '@playwright/test';
import { parse, format } from 'date-fns';

 export async function verifyPaymentSuccessTitle(page: Page,expectedTitle: string = 'Payment Successful') {
    const titleLocator = page.locator('h2', { hasText: expectedTitle });
    await expect(titleLocator).toBeVisible();
    const actualTitle = await titleLocator.textContent();
    expect(actualTitle?.trim()).toBe(expectedTitle);
}

 export async function  verifyGuestDetails(page: Page,expectedName: string, expectedEmail: string) {
    const nameLocator = page.locator('[data-testid="booking-confirmation-Name-0"]');
    const emailLocator = page.locator('[data-testid="booking-confirmation-Email-1"]');

    await expect(nameLocator).toBeVisible();
    await expect(emailLocator).toBeVisible();

    const actualName = (await nameLocator.textContent())?.trim();
    const actualEmail = (await emailLocator.textContent())?.trim();

    expect(actualName).toBe(expectedName);
    expect(actualEmail).toBe(expectedEmail);
  }

export async function verifyReservationDates(page: Page, checkIn: string, checkOut: string) {
  const inputFormat = 'MM/dd/yyyy';
  const displayFormat = 'EEE d MMM yyyy'; // <- FIXED FORMAT HERE

  const parsedCheckIn = parse(checkIn, inputFormat, new Date());
  const parsedCheckOut = parse(checkOut, inputFormat, new Date());

  const expectedCheckIn = format(parsedCheckIn, displayFormat);
  const expectedCheckOut = format(parsedCheckOut, displayFormat);

  const checkInLocator = page.locator('[data-testid="booking-confirmation-Check-in-1"]');
  const checkOutLocator = page.locator('[data-testid="booking-confirmation-Check-out-2"]');

  await expect(checkInLocator).toBeVisible();
  await expect(checkOutLocator).toBeVisible();

  const actualCheckIn = (await checkInLocator.textContent())?.trim();
  const actualCheckOut = (await checkOutLocator.textContent())?.trim();

  expect(actualCheckIn).toBe(expectedCheckIn);
  expect(actualCheckOut).toBe(expectedCheckOut);
}
