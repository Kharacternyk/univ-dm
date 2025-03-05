export class DecisionTreeModel {
  constructor(data) {
    this.leafValue = null;

    const labelFrequencies = new Map();

    for (let rowIndex = 0; rowIndex < data.length; ++rowIndex) {
      const row = data[rowIndex];
      const label = row[row.length - 1];

      labelFrequencies.set(label, 1 + (labelFrequencies.get(label) ?? 0));
    }

    if (labelFrequencies.size === 1) {
      for (const label of labelFrequencies.keys()) {
        this.leafValue = label;
        return;
      }
    }

    if (data[0].length === 1) {
      let greatestFrequency = 0;

      for (const [label, frequency] of labelFrequencies.entries()) {
        if (frequency > greatestFrequency) {
          this.leafValue = label;
          greatestFrequency = frequency;
        }
      }
    }
  }

  predict(row) {
    if (this.leafValue !== null) {
      return this.leafValue;
    }
  }
}
