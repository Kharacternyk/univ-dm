import {OneRuleModel} from "../lib/one-rule-model";

test("one rule model", () => {
  const model = new OneRuleModel([
    [0, 0, 1, 0, 2],
    [1, 0, 0, 1, 1],
    [2, 0, 1, 0, 1],
    [0, 1, 0, 0, 1],
    [0, 1, 1, 0, 1],
    [0, 1, 1, 1, 2],
    [1, 0, 0, 1, 2],
    [2, 0, 0, 0, 1],
    [2, 1, 1, 0, 1],
    [0, 1, 1, 1, 2],
  ]);

  expect(model.bestColumn).toEqual(3);
  expect(model.predict([2, 1, 1, 1])).toEqual(2);
  expect(model.predict([2, 1, 1, 3])).toEqual(0);
});
