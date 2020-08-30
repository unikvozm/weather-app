describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have weather screen', async () => {
    await expect(element(by.id('Weather Screen'))).toBeVisible();
  });
});
