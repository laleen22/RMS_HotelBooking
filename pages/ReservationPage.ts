import { Page } from '@playwright/test';
import {inputCustomerDetails, addAdressManually,inputPaymentDetails } from '../components/ReservationComponent';

export class ReservationPage {
  constructor(private page: Page) {}

  async inputCustomerDetails(title : string, fName:string, lname: string, email:string, mobileNo:string, manualAddress: string, 
    state : string, cardNo  : string,  expiryDate: string,secCode: string,  nameOnCard:string) {
    await inputCustomerDetails(this.page,title, fName, lname, email, mobileNo)
    await addAdressManually(this.page, manualAddress, state) 
    await inputPaymentDetails(this.page,cardNo , expiryDate,secCode,nameOnCard)
    await this.page.waitForTimeout(300);
  }
}