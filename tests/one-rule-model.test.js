import {OneRuleModel} from "../lib/one-rule-model";

test("one rule model with last column best", () => {
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
  expect(model.predict([0, 0, 0, 1])).toEqual(2);
  expect(model.predict([2, 1, 1, 3])).toEqual(0);
});

test("one rule model with second column best", () => {
  const model = new OneRuleModel([
    [0, 0, 0, 1, 2],
    [1, 1, 0, 0, 1],
    [2, 0, 0, 1, 1],
    [0, 0, 1, 0, 1],
    [0, 0, 1, 1, 1],
    [0, 1, 1, 1, 2],
    [1, 1, 0, 0, 2],
    [2, 0, 0, 0, 1],
    [2, 0, 1, 1, 1],
    [0, 1, 1, 1, 2],
  ]);

  expect(model.bestColumn).toEqual(1);
  expect(model.predict([2, 1, 1, 1])).toEqual(2);
  expect(model.predict([0, 1, 0, 0])).toEqual(2);
  expect(model.predict([2, 3, 1, 1])).toEqual(0);
});
