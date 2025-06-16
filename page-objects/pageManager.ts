import { Page, expect } from '@playwright/test';
import { IntroductoryAndFinalActionsPageEN } from './introductoryAndFinalActionsPageEN';
import { IntroductoryAndFinalActionsPageES } from './introductoryAndFinalActionsPageES';


export class PageManager{
    private readonly page : Page
    private readonly introductoryAndFinalActionsPageEN: IntroductoryAndFinalActionsPageEN
    private readonly introductoryAndFinalActionsPageES: IntroductoryAndFinalActionsPageES

    constructor(page: Page){
        this.page = page
        this.introductoryAndFinalActionsPageEN = new IntroductoryAndFinalActionsPageEN(this.page)
        this.introductoryAndFinalActionsPageES = new IntroductoryAndFinalActionsPageES(this.page)
    }

    introductoryAndFinalActionsVerifyEN(){
        return this.introductoryAndFinalActionsPageEN
    }

    introductoryAndFinalActionsVerifyES(){
        return this.introductoryAndFinalActionsPageES
    }
}