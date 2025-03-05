import {DecisionTreeModel} from "../lib/decision-tree-model";

test("decision tree with one label", () => {
  const model = new DecisionTreeModel([
    [0, 0, 1, 0, 1],
    [1, 0, 0, 1, 1],
    [2, 0, 1, 0, 1],
    [0, 1, 0, 0, 1],
    [0, 1, 1, 0, 1],
    [0, 1, 1, 1, 1],
    [1, 0, 0, 1, 1],
    [2, 0, 0, 0, 1],
    [2, 1, 1, 0, 1],
    [0, 1, 1, 1, 1],
  ]);

  expect(model.predict([2, 1, 1, 1])).toEqual(1);
  expect(model.predict([0, 0, 0, 1])).toEqual(1);
  expect(model.predict([2, 1, 1, 3])).toEqual(1);
});

test("decision tree with no features", () => {
  const model = new DecisionTreeModel([
    [0],
    [1],
    [2],
    [3],
    [1],
    [0],
    [2],
    [3],
    [3],
    [4],
  ]);

  expect(model.predict([2, 1, 1, 1])).toEqual(3);
  expect(model.predict([0, 1, 0, 0])).toEqual(3);
  expect(model.predict([2, 3, 1, 1])).toEqual(3);
});
