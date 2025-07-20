import { Page } from '@playwright/test';
import { BlockList } from 'net';
import { isStringOneByteRepresentation } from 'v8';

export async function seePricesBasedOnCategory(page: Page, roomCategory: string) {
  console.log(`Looking for room category: ${roomCategory}`);

  const roomBlocks = page.locator('[data-testid^="roomItem-"]');

  await roomBlocks.first().waitFor({ state: 'visible', timeout: 10000 }); // wait up to 10 seconds

  const count = await roomBlocks.count();
  console.log(`Found ${count} room items`);

  for (let i = 0; i < count; i++) {
    const room = roomBlocks.nth(i);

    const dataTestId = await room.getAttribute('data-testid');
    if (!dataTestId) continue;

    const suffix = dataTestId.split('-')[1]; // e.g., "2", "5"
    const roomTitle = page.locator(`[data-testid="room-title-${suffix}"]`);
    if (!(await roomTitle.isVisible())) continue;

    const titleText = (await roomTitle.innerText()).trim();
    console.log(`Checking room title: ${titleText}`);

    if (titleText.toLowerCase() === roomCategory.toLowerCase()) {

      // Now clicking "See Prices" button
      const seePricesButton = room.locator('button:has-text("See Prices")').first();
      await seePricesButton.scrollIntoViewIfNeeded();
      await seePricesButton.click();

      console.log(`Clicked "See Prices" for room: ${titleText}`);
      return;
    }
  }

  throw new Error(`Room category "${roomCategory} not found.`);
}

export async function addToCartBasedOnSubCategory(page: Page, subCategory: string) {
  console.log(`Looking for subcategory: "${subCategory}" within the opened 'See Prices' block`);

  const subCategoryBlocks = page.locator('[data-testid="room-price-list-item"]');
  const count = await subCategoryBlocks.count();
  console.log(`Found ${count} room sub-category blocks`);

  for (let i = 0; i < count; i++) {
    const roomBlock = subCategoryBlocks.nth(i);

    // Locate the h2 tag within this block (assuming it's the subcategory title)
    const title = roomBlock.locator('h2');
    const isVisible = await title.isVisible();

    if (!isVisible) {
      console.log(`Skipping hidden block index ${i}`);
      continue;
    }

    const titleText = (await title.innerText()).trim();
    console.log(`Block ${i}: Title = "${titleText}"`);

    if (titleText.toLowerCase() === subCategory.toLowerCase()) {
      console.log(`Match found at index ${i} — clicking "Add to cart"`);

      const addToCartButton = roomBlock.locator('button:has-text("Add to cart")');
      await addToCartButton.scrollIntoViewIfNeeded();
      await addToCartButton.click();

      console.log(`Successfully clicked 'Add to cart' for "${subCategory}"`);
      return;
    }
  }

  throw new Error(`Sub-category "${subCategory}" not found in the visible price list.`);
}