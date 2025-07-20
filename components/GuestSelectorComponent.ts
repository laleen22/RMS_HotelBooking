import { Page } from '@playwright/test';


export async function selectGuestCount(page: Page, adultCount: number, childrenCount: number, infantCount: number) {


    console.log(`Target guest count - Adults: ${adultCount}, Children: ${childrenCount}, Infants: ${infantCount}`);


  // Default counts
  const defaultAdults = 2;
  const defaultChildren = 0;
  const defaultInfants = 0;

  const adultClickCount = adultCount - defaultAdults;
  const childrenClickCount = childrenCount - defaultChildren;
  const infantClickCount = infantCount - defaultInfants;




  // async function clickButtonTimes(selector: string, times: number) {
  //   const button = page.locator(selector);
  //   const noOfClicks = Math.abs(times);

  //   for (let i = 0; i < noOfClicks; i++) {
  //     if (times > 0) {
  //       await button.click();
  //     } else if (times < 0) {
  //       await button.click();
  //     }
  //   }
  // }

  async function clickButtonTimes(selector: string, times: number) {
  const button = page.locator(selector);
  const noOfClicks = Math.abs(times);

  for (let i = 0; i < noOfClicks; i++) {
    if (times !== 0) {
      // Use bounding box to ensure visible within viewport
      await button.waitFor({ state: 'attached', timeout: 2000 });
      
      const box = await button.boundingBox();
      if (!box) {
        throw new Error(`Button not visible or not in DOM: ${selector}`);
      }

      // Scroll explicitly using evaluate if needed
      const el = await button.elementHandle();
      if (el) {
        await page.evaluate((element) => {
          element.scrollIntoView({ behavior: 'instant', block: 'center' });
        }, el);
      }

      await page.waitForTimeout(100); // give time for scroll if needed
      await button.click({ trial: true }).catch(() => console.log("Initial trial click failed"));

      await button.click(); // final click
    }
  }
}

  const buttonExpander = page.locator('div[data-testid="keyboardarrowup"]')

  await buttonExpander.click();

  if (adultClickCount !== 0) {
    const adultSelector = adultClickCount > 0 ? 'button[data-testid="guest-selector-plusButton-adults"]': 'button[data-testid="guest-selector-minusButton-adults"]';
    await clickButtonTimes(adultSelector, adultClickCount);
  }

  // Click for children
  if (childrenClickCount !== 0) {
    const childSelector = childrenClickCount > 0 ? 'button[data-testid="guest-selector-plusButton-children"]': 'button[data-testid="guest-selector-minusButton-children"]';
    await clickButtonTimes(childSelector, childrenClickCount);
  }

  // Click for infants
  if (infantClickCount !== 0) {
    const infantSelector = infantClickCount > 0 ? 'button[data-testid="guest-selector-plusButton-infants"]' : 'button[data-testid="guest-selector-minusButton-infants"]';
    await clickButtonTimes(infantSelector, infantClickCount);
  }
  

}