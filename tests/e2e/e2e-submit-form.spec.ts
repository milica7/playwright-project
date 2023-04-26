import {test} from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { FeedbackPage } from '../../page-objects/FeedBackPage'

test.describe.parallel('Feedback form', () => {
    let homePage: HomePage 
    let feedbackPage: FeedbackPage 

    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page)
        feedbackPage = new FeedbackPage(page)
        homePage.visit()
        homePage.clickOnFeedbackLink()
    })
    //reset feedback form
    test('Reset feedback form',async ({page}) => {
      await feedbackPage.fillForm(
        'name',
        'email@email.com',
        'subject',
        'message'
      )
      await feedbackPage.resetForm()
      await feedbackPage.assertResult()

    })
    //submit feedback form
    test('Submit feedback form',async ({page}) => {
    await feedbackPage.fillForm(
        'name',
        'email@email.com',
        'subject',
        'message'
        )
    await feedbackPage.submitForm()
    await feedbackPage.feedbackFormSent()

    })
    })
