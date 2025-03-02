export class OneRuleModel {
  constructor(data) {
    let leastError = 1;
    this.bestTable = null;
    this.bestColumn = null;

    const featureColumnCount = data[0].length - 1;

    for (let columnIndex = 0; columnIndex < featureColumnCount; ++columnIndex) {
      const table = new Map();

      for (let rowIndex = 0; rowIndex < data.length; ++rowIndex) {
        const row = data[rowIndex];
        const feature = row[columnIndex];
        const label = row[row.length - 1];

        if (!table.has(feature)) {
          table.set(feature, new Map());
        }

        const frequency = table.get(feature).get(label);

        table.get(feature).set(label, 1 + (frequency ?? 0));
      }

      const reducedTable = new Map();
      let error = 0;

      for (const [feature, labelFrequencies] of table.entries()) {
        let bestLabel = null;
        let bestLabelFrequency = 0;

        for (const [label, frequency] of labelFrequencies.entries()) {
          if (frequency > bestLabelFrequency) {
            bestLabel = label;
            bestLabelFrequency = bestLabelFrequency;
          }
        }

        for (const [label, frequency] of labelFrequencies.entries()) {
          if (label !== bestLabel) {
            error += frequency / data.length;
          }
        }

        reducedTable.set(feature, bestLabel);
      }

      if (error < leastError) {
        this.bestTable = reducedTable;
        this.bestColumn = columnIndex;
        leastError = error;
      }
    }
  }

  predict(row) {
    const label = this.bestTable.get(row[this.bestColumn]);

    if (label === undefined) {
      return 0;
    }

    return label;
  }
}
