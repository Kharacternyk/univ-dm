export class ParseError extends Error {}

export const parseQuery = (input, expectedSize) => {
  const data = parseData(input, true);

  if (data.length !== 1) {
    throw new ParseError("Exactly one row is expected");
  }
  if (data[0].length !== expectedSize) {
    throw new ParseError(`Exactly ${expectedSize} values are expected`);
  }

  return data[0];
};

export const parseData = (input, allowOneValue = false) => {
  const rows = [];

  for (const row of input.split("\n")) {
    const columns = [];

    for (const column of row.split(/\s+/)) {
      if (column.length > 0) {
        if (!/^\d+$/.test(column)) {
          throw new ParseError(`Invalid integer: ${column}`);
        }

        columns.push(Number(column));
      }
    }

    if (columns.length > 0) {
      if (!allowOneValue && columns.length < 2) {
        throw new ParseError(`Row #${rows.length + 1} has only one value`);
      }

      if (rows.length > 0) {
        const previousRowLength = rows[rows.length - 1].length;

        if (previousRowLength != columns.length) {
          throw new ParseError(
            `Data is not rectangular: size of row #${
              rows.length + 1
            } is not ${previousRowLength}`
          );
        }
      }

      rows.push(columns);
    }
  }

  if (rows.length === 0) {
    throw new ParseError(`Data is empty`);
  }

  return rows;
};
