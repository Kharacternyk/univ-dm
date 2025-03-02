export class KnnModel {
  constructor(data, k) {
    this.data = data;
    this.k = k;
  }

  predict(row) {
    const featureColumnCount = this.data[0].length - 1;
    const squaredDistances = this.data.map((neighbour) => {
      let squaredDistance = 0;

      for (
        let columnIndex = 0;
        columnIndex < featureColumnCount;
        ++columnIndex
      ) {
        squaredDistance += Math.pow(
          row[columnIndex] - neighbour[columnIndex],
          2
        );
      }

      return squaredDistance;
    });
    const sortedData = this.data
      .map((element, index) => [element, index])
      .toSorted(
        ([_, firstIndex], [__, secondIndex]) =>
          squaredDistances[firstIndex] - squaredDistances[secondIndex]
      )
      .map(([element, _]) => element);

    const votes = new Map();

    for (let neighbourIndex = 0; neighbourIndex < this.k; ++neighbourIndex) {
      const neighbour = sortedData[neighbourIndex];
      const label = neighbour[neighbour.length - 1];

      votes.set(label, 1 + (votes.get(label) ?? 0));
    }

    let mostVotes = 0;
    let bestLabel = null;

    for (const [label, voteCount] of votes.entries()) {
      if (voteCount > mostVotes) {
        bestLabel = label;
        mostVotes = voteCount;
      }
    }

    return bestLabel;
  }
}
