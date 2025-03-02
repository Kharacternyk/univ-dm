export class NaiveBayesModel {
  constructor(data, smoothingFactor) {
    this.populationCount = data.length;
    this.smoothingFactor = smoothingFactor;
    this.labelFrequencies = new Map();
    this.featureFrequencies = new Map();

    const featureColumnCount = data[0].length - 1;

    for (const row of data) {
      const label = row[row.length - 1];
      const classFrequency = this.labelFrequencies.get(label);

      this.labelFrequencies.set(label, 1 + (classFrequency ?? 0));

      if (!this.featureFrequencies.has(label)) {
        const featureFrequencies = [];

        for (
          let columnIndex = 0;
          columnIndex < featureColumnCount;
          ++columnIndex
        ) {
          featureFrequencies.push(new Map());
        }

        this.featureFrequencies.set(label, featureFrequencies);
      }

      const featureFrequencies = this.featureFrequencies.get(label);

      for (
        let columnIndex = 0;
        columnIndex < featureColumnCount;
        ++columnIndex
      ) {
        featureFrequencies[columnIndex].set(
          row[columnIndex],
          1 + (featureFrequencies[columnIndex].get(row[columnIndex]) ?? 0)
        );
      }
    }
  }

  predict(row) {
    let bestLabel = null;
    let bestProbability = 0;

    for (const [
      label,
      featureFrequencies,
    ] of this.featureFrequencies.entries()) {
      let probability = this.labelFrequencies.get(label) / this.populationCount;

      for (let columnIndex = 0; columnIndex < row.length; ++columnIndex) {
        probability *=
          ((featureFrequencies[columnIndex].get(row[columnIndex]) ?? 0) +
            this.smoothingFactor) /
          (featureFrequencies[columnIndex].size * this.smoothingFactor +
            this.populationCount);
      }

      if (probability > bestProbability) {
        bestLabel = label;
        bestProbability = bestProbability;
      }
    }

    return bestLabel;
  }
}
