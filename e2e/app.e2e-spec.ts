import { AngularValidatorLibPage } from './app.po';

describe('angular-validator-lib App', () => {
  let page: AngularValidatorLibPage;

  beforeEach(() => {
    page = new AngularValidatorLibPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
