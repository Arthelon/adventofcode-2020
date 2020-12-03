const fs = require("fs");
const input = fs
  .readFileSync("./input.txt", {
    encoding: "utf-8",
  })
  .split("\n")
  .map((x) => Number(x));

function findProduct(arr, target) {
  const diffMap = {};
  input.forEach((item) => {
    diffMap[item] = target - item;
  });
  for (let [key, value] of Object.entries(diffMap)) {
    if (diffMap[value] !== undefined) {
      return key * value;
    }
  }
  return null;
}

const outerDiffMap = {};
input.forEach((item) => {
  outerDiffMap[item] = 2020 - item;
});
for (let [key, value] of Object.entries(outerDiffMap)) {
  const result = findProduct(input, value);
  if (result !== null) {
    console.log(result * key);
    return;
  }
}
