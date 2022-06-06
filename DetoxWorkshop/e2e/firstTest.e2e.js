describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should tap on button by id', async () => {
    await element(by.id('ButtonID')).tap();
    await expect(element(by.text('Button pressed'))).toBeVisible();
  });

  it('should fail tap on matcher that is not unique', async () => {
    await element(by.id('TrendingMovies.image')).tap(); //fails because there are many images with this id
    await expect(element(by.text('OVERVIEW'))).toBeVisible();
  });

  it('should tap at repetitive element by index', async () => {
    await element(by.id('TrendingMovies.image')).atIndex(0).tap();
    await expect(element(by.text('OVERVIEW'))).toBeVisible();
  });

  it('should fail on element not passing visibility threshold', async () => {
    await element(by.id('TrendingMovies.image')).atIndex(2).tap(); //fails here because we see only a small part of the image
    await expect(element(by.text('OVERVIEW'))).toBeVisible();
  });


  it('should swipe and tap on element', async () => {
    await element(by.id('TrendingMovies.image')).atIndex(0).swipe('left');
    await element(by.id('TrendingMovies.image')).atIndex(2).tap();
    await expect(element(by.text('OVERVIEW'))).toBeVisible();
  });

  it('should scroll until element is visible', async () => {
    await waitFor(element(by.id('OtherMovies'))).toBeVisible().whileElement(by.id('HomeScrollView')).scroll(50, 'down');
    await expect(element(by.id('Title').withAncestor(by.id('OtherMovies')))).toBeVisible();
  });

  it('should expect element to have text', async () => {
    await waitFor(element(by.id('OtherMovies'))).toBeVisible().whileElement(by.id('HomeScrollView')).scroll(50, 'down');
    await expect(element(by.id('Title').withAncestor(by.id('OtherMovies')))).toHaveText('Other Movies');
  });

  it('should have platform specific code', async () => {
    if (device.getPlatform() === 'ios') {
      // ...
    }

    if (device.getPlatform() === 'android') {
      // ...
    }
    await element(by.id('ButtonID')).tap();
    await expect(element(by.text('Button pressed'))).toBeVisible();
  });
});
