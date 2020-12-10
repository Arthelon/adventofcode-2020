const input = require("fs")
  .readFileSync(__dirname + "/input.txt", {
    encoding: "utf-8",
  })
  .split("\n")
  .map((x) => Number(x));

const sortedAdapters = input.sort((a, b) => a - b);

const distribution = [0, 0, 0, 0];
let currJoltage = 0;
for (let adapter of sortedAdapters) {
  distribution[adapter - currJoltage]++;
  currJoltage = adapter;
}
distribution[3]++;
console.log(distribution[1] * distribution[3]);
