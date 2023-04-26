import {test, expect} from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe('Transfer funds and make payments', ()=> {
    let homePage: HomePage
    let loginPage: LoginPage
    test.beforeEach(async ({page}) => {
        homePage  = new HomePage(page)
        loginPage = new LoginPage(page)
        homePage.visit()
        await homePage.clickOnSignIn()
        await loginPage.login('username','password')
        await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')

    })
    test('Transfer funds',async ({page}) => {
        await page.selectOption('#tf_fromAccountId', '2')
        await page.selectOption('#tf_toAccountId','3')
        await page.type('#tf_amount','500')
        await page.type('#tf_description', 'Test')
        await page.click('#btn_submit')

        const boardHeader = await page.locator('h2.board-header')
        await expect(boardHeader).toContainText('Verify')
        await page.click('#btn_submit')

        const message = await page.locator('.alert-success')
        await expect(message).toContainText('You successfully submitted your transaction')
        
    })
})