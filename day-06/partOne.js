const input = require("fs")
  .readFileSync(__dirname + "/input.txt", {
    encoding: "utf-8",
  })
  .split("\n");

let sumCounts = 0;
let localCount = 0;
let localCharMap = {};
for (let i = 0; i < input.length; i++) {
  const currLine = input[i];
  if (currLine.length > 0) {
    for (let j = 0; j < currLine.length; j++) {
      const currChar = currLine.charAt(j);
      if (localCharMap[currChar] === undefined) {
        localCount++;
        localCharMap[currChar] = true;
      }
    }
  }
  if (currLine.length === 0 || i === input.length - 1) {
    sumCounts += localCount;
    localCount = 0;
    localCharMap = {};
  }
}
console.log(sumCounts);
