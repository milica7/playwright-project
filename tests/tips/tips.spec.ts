import {test } from '@playwright/test'
import { getRandomNumber } from '../../utils/data-helpers'
import { getRandomString } from '../../utils/data-helpers'

test.describe("Tips and tricks", ()=>{
    test.only('Test Info Object', async({page}, testInfo)=>{
        await page.goto('https://example.com')
  //      console.log(testInfo.title)
        let randomNumber = await getRandomNumber()
        console.log(randomNumber);

        let randomString = await getRandomString()
        console.log(randomString)

    })

    test('Skip Browser', async ({page, browserName})=> {
        test.skip(browserName==='chromium','Feature not ready in Chrome browser')
        await page.goto('https://www.example.com')
    })

    test('Test Fixme Annotation', async ({page, browserName})=> {
        // test.fixme(browserName==='chromium','Test is not stable')
        await page.goto('http//www.example.com')
    })

    const people = ["Mike", "Judy", "Peter","Elon", "Alice"]
    for(const name of people){
        test(`Running test for ${name}`, async({ page }) => {
            await page.goto('http://zero.webappsecurity.com/index.html')
            await page.type("#searchTerm", `${name}`)
            await page.waitForTimeout(3000)
        })
    }

    test("Mouse Movement Simulation",async ({page})=>{
        await page.goto('https://www.example.com')
        await page.mouse.move(0,0)
        await page.mouse.down()
        await page.mouse.move(0,100)
        await page.mouse.up()

    })

    test("Multiple Browser Tabs", async ({browser})=>{
        const context = await browser.newContext()
        const page1 = await context.newPage()
        const page2 = await context.newPage()
        await page1.goto('https://www.example.com')
        await page2.goto('https://www.example.com')

        await page1.waitForTimeout(5000)



    })
})