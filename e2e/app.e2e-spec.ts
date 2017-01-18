import { GameCardPage } from './app.po';

describe('game-card App', function() {
  let page: GameCardPage;

  beforeEach(() => {
    page = new GameCardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
