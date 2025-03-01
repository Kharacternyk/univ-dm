export const parseData = (data) => {
  const rows = [];

  for (const row of data.split("\n")) {
    const columns = [];

    for (const column of row.split(/\s+/)) {
      if (column.length > 0) {
        columns.push(Number(column));
      }
    }

    if (columns.length > 0) {
      rows.push(columns);
    }
  }

  return rows;
};
