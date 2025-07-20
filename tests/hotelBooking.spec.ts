import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { getBaseUrl } from '../utils/getBaseUrl';
import { ReservationPage } from '../pages/ReservationPage';
import { PaymentConfirmationPage } from '../pages/PaymentConfirmationPage';
import { bookingDataSets } from '../test-data/bookingData';
import { encrypt, decrypt } from '../utils/encryptionUtil';


bookingDataSets.forEach((data, index) => {
  test(`Hotel booking flow - dataset ${index + 1}`, async ({ page }) => {
    const baseUrl = getBaseUrl();
    const home = new HomePage(page, baseUrl);
    const { checkInDate, checkOutDate, guests, customer, roomPreferences } = data;

    await home.goto();
    await home.selectCheckInOutDates(checkInDate, checkOutDate);
    await home.selectNumberOfGuests(guests.adults,guests.children,guests.infants);
    await home.performSearch();

    //Works for one or more room selections
    await home.selectRoomsBasedOnCategory(roomPreferences)
    await page.waitForTimeout(3000);
    await home.cartCheckOut();

    const reservation = new ReservationPage(page);
    await reservation. inputCustomerDetails(customer.title,customer.firstName,customer.lastName,
      customer.email,customer.mobile,customer.address,customer.state,customer.cardNumber,customer.expiry,customer.cvv,customer.cardName);

    const paymentconfirmation = new PaymentConfirmationPage(page); 
    await paymentconfirmation.verifyPaymentSuccess();
    await paymentconfirmation.verifyGuestDetails(`${customer.firstName} ${customer.lastName}`, customer.email);
    await paymentconfirmation.verifyReservationDates(checkInDate, checkOutDate);
  });
});