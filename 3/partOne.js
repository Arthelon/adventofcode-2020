const input = require("fs")
  .readFileSync(__dirname + "/input.txt", {
    encoding: "utf-8",
  })
  .split("\n");

const width = input[0].length;

let treeCount = 0;

let currX = 0;
let currY = 0;

for (let i = 0; i < input.length - 1; i++) {
  currX = currX % width;
  if (input[currY].charAt(currX) === "#") {
    treeCount++;
  }
}
console.log(treeCount);
