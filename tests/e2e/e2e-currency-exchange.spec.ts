import {test, expect} from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe('Currency', ()=>{
    let homePage: HomePage
    let loginPage: LoginPage
    test.beforeEach(async ({page}) => {
        homePage  = new HomePage(page)
        loginPage = new LoginPage(page)
        homePage.visit()
    })
    test('check currency',async ({page}) => {
        await homePage.clickOnSignIn()
        await loginPage.login('username','password')
        await page.goto('http://zero.webappsecurity.com/bank/pay-bills.html')
        await page.click("text=Purchase Foreign Currency")
        await page.selectOption('#pc_currency','EUR')
        const rate = page.locator('#sp_sell_rate')

        await expect(rate).toContainText('EUR')

        await page.type('#pc_amount', '1000')
        await page.click('#pc_inDollars_true')
        await page.click('#pc_calculate_costs')

        const conversionAmount = await page.locator('#pc_conversion_amount')
        await expect(conversionAmount).toContainText('1000')

        await page.click('#purchase_cash')

        const message = await page.locator('#alert_content')
        await expect(message).toBeVisible
        await expect(message).toContainText('Foreign currency cash was successfully purchased')
    })
})