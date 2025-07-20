import { Page } from '@playwright/test';
import { navigateToTargetMonth, selectDay,closeDatePickerIfMobile } from '../components/DatePickerComponent';
import { selectGuestCount } from '../components/GuestSelectorComponent';
import { seePricesBasedOnCategory,addToCartBasedOnSubCategory } from '../components/RoomSelecterComponent';
import {cartCheckout,closeCart } from '../components/CartContentComponent';

export class HomePage {
  constructor(private page: Page, private baseUrl: string) {}

  async goto() {
    console.log('Navigating to:', this.baseUrl);
    await this.page.goto(this.baseUrl);
  }

  async openDatePicker() {
    await this.page.click("//div[contains(text(), 'Check In')]"); 
  }

  async expandGuestSelector() {
    await this.page.click("//input[@value='2 Guests']"); 
  }

  async selectNumberOfGuests(adultCount: number,childrenCount: number,infantCount: number){
    await this.expandGuestSelector();
    await selectGuestCount(this.page,adultCount,childrenCount,infantCount)
  }

  async selectCheckInOutDates(checkIn: string, checkOut: string) {
    await this.openDatePicker();
    await navigateToTargetMonth(this.page, checkIn);
    await selectDay(this.page, checkIn);

    await navigateToTargetMonth(this.page, checkOut);
    await selectDay(this.page, checkOut);

    await closeDatePickerIfMobile(this.page);

    await this.expandGuestSelector()
  }

  async selectRoomsBasedOnCategory(roomPreferences: { category: string; package: string }[]) {
      const totalRooms = roomPreferences.length;

  for (let i = 0; i < totalRooms; i++) {
    const room = roomPreferences[i];

    await seePricesBasedOnCategory(this.page, room.category);
    await addToCartBasedOnSubCategory(this.page, room.package);

    // If more than one room and not the last iteration, close the cart
    if (totalRooms > 1 && i < totalRooms - 1) {
      await closeCart(this.page);  
    }
  }
  }



  async performSearch() {
    await this.page.click('button[data-testid="search"]'); 
  }

  async cartCheckOut() {
 await cartCheckout(this.page);
  }
}