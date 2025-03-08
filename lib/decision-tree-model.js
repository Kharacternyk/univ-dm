export class DecisionTreeModel {
  constructor(data) {
    this.leafValue = null;
    this.partitionColumnIndex = null;

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

    let greatestFrequency = 0;

    for (const [label, frequency] of labelFrequencies.entries()) {
      if (frequency > greatestFrequency) {
        this.leafValue = label;
        greatestFrequency = frequency;
      }
    }

    if (data[0].length === 1) {
      return;
    }

    const featureColumnCount = data[0].length - 1;
    let leastPenalty = Infinity;

    for (let columnIndex = 0; columnIndex < featureColumnCount; ++columnIndex) {
      const featureFrequencies = new Map();
      const featureLabelFrequencies = new Map();

      for (let rowIndex = 0; rowIndex < data.length; ++rowIndex) {
        const row = data[rowIndex];
        const feature = row[columnIndex];
        const label = row[row.length - 1];

        featureFrequencies.set(
          feature,
          1 + (featureFrequencies.get(feature) ?? 0)
        );

        if (!featureLabelFrequencies.has(feature)) {
          featureLabelFrequencies.set(feature, new Map());
        }

        const labelFrequencies = featureLabelFrequencies.get(feature);

        labelFrequencies.set(label, 1 + (labelFrequencies.get(label) ?? 0));
      }

      let penalty = 0;

      for (const [
        feature,
        labelFrequencies,
      ] of featureLabelFrequencies.entries()) {
        for (const frequency of labelFrequencies.values()) {
          penalty -=
            (frequency / data.length) *
            Math.log2(frequency / featureFrequencies.get(feature));
        }
      }

      if (penalty < leastPenalty) {
        this.partitionColumnIndex = columnIndex;
        leastPenalty = penalty;
      }
    }

    const childData = new Map();

    for (const row of data) {
      const feature = row[this.partitionColumnIndex];
      const childRow = [];

      for (let columnIndex = 0; columnIndex < row.length; ++columnIndex) {
        if (columnIndex !== this.partitionColumnIndex) {
          childRow.push(row[columnIndex]);
        }
      }

      if (childData.has(feature)) {
        childData.get(feature).push(childRow);
      } else {
        childData.set(feature, [childRow]);
      }
    }

    this.children = new Map();

    for (const [feature, featureData] of childData.entries()) {
      this.children.set(feature, new DecisionTreeModel(featureData));
    }
  }

  predict(row) {
    if (this.partitionColumnIndex === null) {
      return this.leafValue;
    }

    const feature = row[this.partitionColumnIndex];

    if (!this.children.has(feature)) {
      return this.leafValue;
    }

    const childRow = [];

    for (let columnIndex = 0; columnIndex < row.length; ++columnIndex) {
      if (columnIndex !== this.partitionColumnIndex) {
        childRow.push(row[columnIndex]);
      }
    }

    return this.children.get(feature).predict(childRow);
  }
}
