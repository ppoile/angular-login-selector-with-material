import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('router-outlet should contain no text', () => {
    page.navigateTo();
    expect(page.getRouterOutletText()).toEqual('');
    expect(page.getTtt()).toContain('Logins:\n (All)\nChoose your logins');
  });
});
