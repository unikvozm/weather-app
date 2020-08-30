describe('WeatherApp', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have weather screen', async () => {
    await expect(element(by.id('Weather Screen'))).toBeVisible();
    await expect(element(by.text('Weather'))).toBeVisible();
  });

  it('should have predefined cities', async () => {
    await expect(element(by.text('London'))).toBeVisible();
    await expect(element(by.text('Berlin'))).toBeVisible();
    await expect(element(by.text('Wrocław'))).toBeVisible();
  });

  it('should go to Details screen', async () => {
    await element(by.text('Wrocław')).tap();
    await expect(element(by.id('Details Screen'))).toBeVisible();
    await expect(element(by.text('Humidity'))).toBeVisible();
    await expect(element(by.text('Pressure'))).toBeVisible();
    await expect(element(by.text('Wind speed'))).toBeVisible();
    await expect(element(by.text('Cloud cover'))).toBeVisible();
  });

  it('should delete a city', async () => {
    await element(by.text('London')).swipe('left');
    await expect(element(by.text('Delete')).atIndex(0)).toBeVisible();
    await element(by.text('Delete')).atIndex(0).tap();
    await expect(element(by.text('London'))).toNotExist();
  });

  it('should add a city', async () => {
    await expect(element(by.text('Moscow'))).toNotExist();
    await element(by.text('Add a city')).tap();
    await expect(element(by.id('City to add'))).toBeVisible();
    await element(by.id('City to add')).typeText('Moscow');
    await expect(element(by.text('Moscow'))).toBeVisible();
    await element(by.text('Add')).tap();
    await expect(element(by.text('Moscow'))).toBeVisible();
  });
});
