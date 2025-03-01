import {parseData} from "../lib/parse-data";

test("parseData", () => {
  const stringData = `
    1  2  1
    8  8  2
    22 22 0
    0  0  0
  `;
  const parsedData = parseData(stringData);

  expect(parsedData).toEqual([
    [1, 2, 1],
    [8, 8, 2],
    [22, 22, 0],
    [0, 0, 0],
  ]);
});
