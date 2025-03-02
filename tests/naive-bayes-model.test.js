import {NaiveBayesModel} from "../lib/naive-bayes-model";

test("naive bayes model", () => {
  const model = new NaiveBayesModel(
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

  expect(model.populationCount).toEqual(10);
  expect(model.labelFrequencies.get(0)).toEqual(4);
  expect(model.labelFrequencies.get(1)).toEqual(6);
  expect(model.predict([2, 1, 1, 1])).toEqual(1);
});
