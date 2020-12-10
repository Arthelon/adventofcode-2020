const input = require("fs")
  .readFileSync(__dirname + "/input.txt", {
    encoding: "utf-8",
  })
  .split("\n")
  .map((x) => Number(x));

const sortedAdapters = input.sort((a, b) => a - b);
const memo = {};
sortedAdapters.unshift(0);

function findNumArrangements(currIdx, adapters, memo) {
  if (currIdx === adapters.length - 1) {
    return 1;
  }
  if (memo[currIdx] !== undefined) {
    return memo[currIdx];
  }
  const currValue = adapters[currIdx];
  let arrangements = findNumArrangements(currIdx + 1, adapters, memo);

  if (
    adapters[currIdx + 2] !== undefined &&
    adapters[currIdx + 2] - currValue <= 3
  ) {
    arrangements += findNumArrangements(currIdx + 2, adapters, memo);
  }
  if (
    adapters[currIdx + 3] !== undefined &&
    adapters[currIdx + 3] - currValue === 3
  ) {
    arrangements += findNumArrangements(currIdx + 3, adapters, memo);
  }
  memo[currIdx] = arrangements;
  return arrangements;
}

console.log(findNumArrangements(0, sortedAdapters, memo));
