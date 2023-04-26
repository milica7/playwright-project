import { expect, Locator, Page } from "@playwright/test";

export class PaymentPage {
    readonly page:Page
    readonly paySelectbox:Locator
    readonly payDetailsButton: Locator
    readonly payDetail: Locator
    readonly accountSelectbox: Locator
    readonly amountInput:Locator
    readonly dateInput:Locator
    readonly description: Locator
    readonly paymentButon:Locator
    readonly message: Locator

    constructor(page:Page){
        this.page = page
        this.paySelectbox = page.locator('#sp_payee')
        this.payDetailsButton = page.locator('#sp_get_payee_details')
        this.payDetail = page.locator('#sp_payee_details')
        this.accountSelectbox = page.locator('#sp_account')
        this.amountInput = page.locator('#sp_amount')
        this.dateInput = page.locator('#sp_date')
        this.description = page.locator('#sp_description')
        this.paymentButon = page.locator('#pay_saved_payees')
        this.message = page.locator('#alert_content > span')
    }

    async createPayment(){
        await this.paySelectbox.selectOption('apple')
        await this.payDetailsButton.click()
        await expect(this.payDetail).toBeVisible()
        await this.accountSelectbox.selectOption('6')
        await this.amountInput.type('5000')
        await this.dateInput.type('2023-01-01')
        await this.description.type('bla')
        await this.paymentButon.click()
    }
    async assertSuccessMessage(){
        await expect(this.message).toBeVisible
        await expect(this.message).toContainText('The payment was successfully submitted')
    }

}

