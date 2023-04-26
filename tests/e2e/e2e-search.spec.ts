import {test, expect} from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'

test.describe('Search', ()=> {
    test('Should find search results',async ({page}) => {
        let homePage: HomePage = new HomePage(page)

        await homePage.visit()
        await homePage.searchFor('bank')

        const numbOfLinks = await page.locator('li > a')
        await expect(numbOfLinks).toHaveCount(2)
    })
    test('Should not find search results',async ({page}) => {
        let homePage: HomePage = new HomePage(page)

        await homePage.visit()
        await homePage.searchFor('jiok')

        const numbOfLinks = await page.locator('li > a')
        await expect(numbOfLinks).toHaveCount(0)
    })


})