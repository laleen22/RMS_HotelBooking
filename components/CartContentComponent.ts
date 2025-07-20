import { Page } from '@playwright/test';
import { BlockList } from 'net';
import { isStringOneByteRepresentation } from 'v8';

export async function cartCheckout(page: Page) {
  console.log(`Ready to checkout cart`);
  validateCartVisbility(page);

  const checkOutButton = page.locator('[data-testid="btnCheckoutOnCart"]');
  await checkOutButton.click();
  
}

export async function closeCart(page: Page) {
  console.log(`Ready to close cart`);
  validateCartVisbility(page);

  const closeCartButton = page.locator('[data-testid="btnCloseOnCart"]');
  await closeCartButton.click();
  
}

async function validateCartVisbility(page: Page) {
  console.log(`Validate cart appears`);

  const cartComponent = page.locator('[data-testid="cartContentComponent"]');
  const isVisible = await cartComponent.first().isVisible();
    if (!isVisible) {
      throw new Error(`Cart component not found.`);
    }

  console.log(`Cart component appears as expected`);
}

