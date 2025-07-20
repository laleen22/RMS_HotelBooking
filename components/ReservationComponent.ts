import { Page } from '@playwright/test';
import { encrypt, decrypt } from '../utils/encryptionUtil';

export async function inputCustomerDetails(page: Page, title : string, fName:string, lname: string, email:string, mobileNo:string) {
  console.log(`Ready to fill in customer details`);

  const reservationHeader = page.locator('p:has-text("Complete your reservation")');
  await reservationHeader.first().waitFor({ state: 'visible', timeout: 5000 }); 

  const testBoxFirstName = page.locator('input[id="firstName"]');
  const testBoxLastNameTextBox = page.locator('input[autocomplete="family-name"]');
  const testBoxEmailTextBox = page.locator('input[autocomplete="email"]');
  const testBoxMobileNo = page.locator('input[autocomplete="tel"]');

  await selectTitleFromDropdown(page, title);
  await testBoxFirstName.fill(fName)
  await testBoxLastNameTextBox.fill(lname)
  await testBoxEmailTextBox.fill(email)
  await testBoxMobileNo.fill(mobileNo)

}



export async function inputPaymentDetails(page: Page, cardNo : string,  expiryDate: string, secCode: string,  nameOnCard:string ) {
  console.log(`Ready to insert card details`);

  const frameCardNo = page.frameLocator('iframe[title="Iframe for card number"]');
  const textBoxCardNo = frameCardNo.locator('input[data-fieldtype="encryptedCardNumber"]');
  await textBoxCardNo.waitFor({ state: 'visible', timeout: 5000 });
  await textBoxCardNo.fill(decrypt(cardNo));

  const frameExpiry = page.frameLocator('iframe[title="Iframe for expiry date"]');
  const textExpiryDate = frameExpiry.locator('input[data-fieldtype="encryptedExpiryDate"]');
  await textExpiryDate.waitFor({ state: 'visible', timeout: 5000 });
  await textExpiryDate.fill(expiryDate);

  const frameSecCode = page.frameLocator('iframe[title="Iframe for security code"]');
  const testBoxSecCode = frameSecCode.locator('input[data-fieldtype="encryptedSecurityCode"]');
  await testBoxSecCode.waitFor({ state: 'visible', timeout: 5000 });
  await testBoxSecCode.fill(secCode);

  const testBoxNameOnCard = page.locator('input[name="holderName"]');
  await testBoxNameOnCard.waitFor({ state: 'visible', timeout: 3000 });
  await testBoxNameOnCard.fill(nameOnCard);
  await submitResrvation(page);
  
}

 async function submitResrvation(page: Page ) {
  console.log(`Submitting and completing reservation with deposit payment`);
  const btnPay = page.locator('button[data-testid="pay-btn-summary"]');
  await btnPay.click();
  await page.waitForTimeout(3000);
}


//Helping Methods
async function selectTitleFromDropdown(page: Page, title: string) {
  const titleListBox = page.locator('div[id="booking-summary-form-title"]');
  await titleListBox.first().waitFor({ state: 'visible', timeout: 3000 });
  await titleListBox.click();

  const titles = page.locator('ul[aria-labelledby="booking-summary-form-title-label"] > li');
  const titleCount = await titles.count() - 1;
  console.log(`Found ${titleCount} title options`);

  for (let i = 0; i < titleCount; i++) {
    const currentTitle = titles.nth(i + 1);  // Skipping the first option
    const currentTitleText = (await currentTitle.innerText()).trim();
    console.log(`Current Title is: "${currentTitleText}"`);

    if (currentTitleText.toLowerCase() === title.toLowerCase()) {
      await currentTitle.click();
      return; // Exit after selecting the match
    }
  }

  throw new Error(`Title "${title}" not found in dropdown.`);
}

export async function addAdressManually(page: Page, manualAddress: string, state : string) {
  const manualAddressLink = page.locator('p:has-text("Add Address Manually")');
  await manualAddressLink.click();
  const textBoxManualAddress = page.locator('input[autocomplete="street-address"]')
  const textBoxManualState = page.locator('input[autocomplete="address-level1"]')

  await textBoxManualAddress.fill(manualAddress)
  await textBoxManualState.fill(state)

}