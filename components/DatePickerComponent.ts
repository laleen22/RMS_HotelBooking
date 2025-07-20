import { Page } from '@playwright/test';

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export async function navigateToTargetMonth(page: Page, targetDate: string) {
  console.log(`navigateToTargetMonth called with targetDate: ${targetDate}`);

  const date = new Date(targetDate); // 'MM/dd/yyyy'
  console.log(`Parsed Date: ${date.toDateString()}`);

  const targetMonth = monthNames[date.getMonth()];
  const targetYear = date.getFullYear().toString();

  console.log(`Target Month: ${targetMonth}, Target Year: ${targetYear}`);

  let maxAttempts = 12;
  while (maxAttempts-- > 0) {
    console.log(`Remaining attempts: ${maxAttempts + 1}`);

    const visibleMonths = await page.$$('[data-index]');
    console.log(`Found ${visibleMonths.length} visible month elements`);

    let found = false;

    for (const [index, month] of visibleMonths.entries()) {
      const spans = await month.$$('span');

      if (spans.length >= 2) {
        const monthText = (await spans[0].innerText()).trim();
        const yearText = (await spans[1].innerText()).trim();

        console.log(`Month element ${index}: Month="${monthText}", Year="${yearText}"`);

        if (monthText === targetMonth && yearText === targetYear) {
          console.log(`Target month found at element index ${index}`);
          found = true;
          break;
        }
      } else {
        console.log(`Month element ${index} has less than 2 spans, skipping`);
      }
    }

    if (found) {
      console.log('Target month is visible, stopping clicks.');
      return; // found target month/year
    }

    console.log("Target month not found, clicking 'Next page' button...");
    await page.click("button[aria-label='Next page']");
    await page.waitForTimeout(300);
  }

  throw new Error(`Failed to find ${targetMonth} ${targetYear} in date picker.`);
}

export async function selectDay(page: Page, date: string) {
  const targetDate = new Date(date);

  const day = targetDate.getDate();
  const weekday = targetDate.toLocaleDateString('en-US', { weekday: 'long' });
  const month = targetDate.toLocaleDateString('en-US', { month: 'long' });
  const year = targetDate.getFullYear();

  const ariaLabel = `${weekday}, ${month} ${day}, ${year}`;

  console.log(`Select Date: ${date}`);
  console.log(`Matching aria-label: "${ariaLabel}"`);

  await page.click(`div[role="button"][aria-label="${ariaLabel}"]`);
}

export async function closeDatePickerIfMobile(page: Page) {
  const doneButton = page.getByRole('button', { name: 'Done' });

  try {
    if (await doneButton.isVisible({ timeout: 1000 })) {
      console.log("Detected 'Done' button - clicking to close mobile date picker");
      await doneButton.click();
    }
  } catch (e) {
    
  }
}