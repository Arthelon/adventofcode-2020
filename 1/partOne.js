const fs = require("fs");
const input = fs
  .readFileSync("./input.txt", {
    encoding: "utf-8",
  })
  .split("\n")
  .map((x) => Number(x));

const diffMap = {};

input.forEach((item) => {
  diffMap[item] = 2020 - item;
});

for (let [key, value] of Object.entries(diffMap)) {
  if (diffMap[value] !== undefined) {
    console.log(key * value);
    return;
  }
}
