import {parseData, ParseError} from "../lib/parse-data";

test("valid data is parsed", () => {
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

test("invalid values are reported", () => {
  const stringData = `
    1  2
    8b 8
  `;

  expect(() => parseData(stringData)).toThrow(ParseError);
});

test("too long rows are reported", () => {
  const stringData = `
    1 2 3
    4 5 6
    7 8 9 4
    1 2 3
  `;

  expect(() => parseData(stringData)).toThrow(ParseError);
});

test("too short rows are reported", () => {
  const stringData = `
    1 2 3
    4 5
    7 8 8
    1 2 3
  `;

  expect(() => parseData(stringData)).toThrow(ParseError);
});
