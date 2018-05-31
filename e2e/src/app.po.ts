import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getRouterOutletText() {
    return element(by.css('app-root router-outlet')).getText();
  }

  getTtt() {
    return element(by.css('app-root mat-card')).getText();
  }
}
