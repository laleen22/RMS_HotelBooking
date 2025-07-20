import { Page } from '@playwright/test';
import {verifyPaymentSuccessTitle,verifyGuestDetails,verifyReservationDates } from '../components/PaymentConfirmationComponent';

export class PaymentConfirmationPage {
  constructor(private page: Page) {}

  async verifyPaymentSuccess(expectedTitle: string = 'Payment Successful') {
    await verifyPaymentSuccessTitle(this.page,expectedTitle)
    await this.page.waitForTimeout(300);
    console.log ("Landed on Payment Success Page successfully")
  }

  async verifyGuestDetails(expectedName: string, expectedEmail: string) {
    await verifyGuestDetails(this.page,expectedName,expectedEmail)
    await this.page.waitForTimeout(300);
    console.log ("Guest Details Verifired")
  }

  async verifyReservationDates(checkIn: string, checkOut: string){
    await verifyReservationDates(this.page,checkIn,checkOut)
    await this.page.waitForTimeout(300);
    console.log ("Reservation Dates Verifired")
  }
}