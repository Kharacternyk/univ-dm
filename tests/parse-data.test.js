import {parseData, ParseError, parseQuery} from "../lib/parse-data";

test("valid query is parsed", () => {
  const stringQuery = `
    1  2  1
  `;
  const query = parseQuery(stringQuery, 3);

  expect(query).toEqual([1, 2, 1]);
});

test("invalid query size is rejected", () => {
  const stringQuery = `
    1  2  1
  `;

  expect(() => parseQuery(stringQuery, 4)).toThrow(ParseError);
});

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

test("invalid values are rejected", () => {
  const stringData = `
    1  2
    8b 8
  `;

  expect(() => parseData(stringData)).toThrow(ParseError);
});

test("too long rows are rejected", () => {
  const stringData = `
    1 2 3
    4 5 6
    7 8 9 4
    1 2 3
  `;

  expect(() => parseData(stringData)).toThrow(ParseError);
});

test("too short rows are rejected", () => {
  const stringData = `
    1 2 3
    4 5
    7 8 8
    1 2 3
  `;

  expect(() => parseData(stringData)).toThrow(ParseError);
});

test("one dimensional rows are rejected", () => {
  const stringData = `
    1
    4
    7
    1
  `;

  expect(() => parseData(stringData)).toThrow(ParseError);
});

test("emtpy data is rejected", () => {
  const stringData = `
  `;

  expect(() => parseData(stringData)).toThrow(ParseError);
});
