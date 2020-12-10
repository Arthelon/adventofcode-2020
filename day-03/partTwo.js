const { count } = require("console");

const input = require("fs")
  .readFileSync(__dirname + "/input.txt", {
    encoding: "utf-8",
  })
  .split("\n");

function countTreesOnSlope(map, right, down) {
  let currX = right;
  let currY = down;
  let treeCount = 0;
  const width = map[0].length;

  while (currY < map.length) {
    if (map[currY].charAt(currX) === "#") {
      treeCount++;
    }
    currX += right;
    currY += down;
    currX = currX % width;
  }
  return treeCount;
}

const treeCounts = [
  countTreesOnSlope(input, 1, 1),
  countTreesOnSlope(input, 3, 1),
  countTreesOnSlope(input, 5, 1),
  countTreesOnSlope(input, 7, 1),
  countTreesOnSlope(input, 1, 2),
];
console.log(treeCounts.reduce((prev, curr) => prev * curr, 1));
