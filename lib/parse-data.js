export class ParseError extends Error {}

export const parseData = (data) => {
  const rows = [];

  for (const row of data.split("\n")) {
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
      if (columns.length < 2) {
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
