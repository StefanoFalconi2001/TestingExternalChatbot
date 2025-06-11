import { Page, expect } from '@playwright/test';
import { IntroductoryAndFinalActionsPage } from './introductoryAndFinalActionsPage';


export class PageManager{
    private readonly page : Page
    private readonly introductoryAndFinalActionsPage: IntroductoryAndFinalActionsPage

    constructor(page: Page){
        this.page = page
        this.introductoryAndFinalActionsPage = new IntroductoryAndFinalActionsPage(this.page)
    }

    introductoryAndFinalActionsVerify(){
        return this.introductoryAndFinalActionsPage
    }
}