import {KnnModel} from "../lib/knn-model";

test("naive bayes model", () => {
  const model = new KnnModel(
    [
      [0, 0, 1, 0, 0],
      [1, 0, 0, 1, 1],
      [2, 0, 1, 0, 1],
      [0, 1, 0, 0, 1],
      [0, 1, 1, 0, 1],
      [0, 1, 1, 1, 0],
      [1, 0, 0, 1, 0],
      [2, 0, 0, 0, 1],
      [2, 1, 1, 0, 1],
      [0, 1, 1, 1, 0],
    ],
    0.1
  );

  expect(model.predict([2, 1, 1, 1])).toEqual(1);
});
