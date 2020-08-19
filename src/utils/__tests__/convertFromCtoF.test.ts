import { convertFromCtoF } from "../convertFromCtoF";

test("convertFromCtoF works", () => {
  expect(convertFromCtoF(0)).toEqual(32);
  expect(convertFromCtoF(18.5)).toEqual(65);
  expect(convertFromCtoF(-30)).toEqual(-22);

})