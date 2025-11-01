import { getSpinnerSize } from "src/common/components/spinner/utils";

test("Should return corretc size and stroke width with small", () => {
  const obj = getSpinnerSize("small");
  expect(obj.strokeWidth).toMatchInlineSnapshot(`1`);
  expect(obj.size).toMatchInlineSnapshot(`75`);
});

test("Should return correct size and stroke width with medium", () => {
  const obj = getSpinnerSize("medium");
  expect(obj.strokeWidth).toMatchInlineSnapshot(`1`);
  expect(obj.size).toMatchInlineSnapshot(`100`);
});

test("Should return correct size and stroke width with large", () => {
  const obj = getSpinnerSize("large");
  expect(obj.strokeWidth).toMatchInlineSnapshot(`2`);
  expect(obj.size).toMatchInlineSnapshot(`125`);
});
