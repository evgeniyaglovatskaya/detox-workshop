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
});
