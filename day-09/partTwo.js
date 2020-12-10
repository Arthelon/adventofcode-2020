const input = require("fs")
  .readFileSync(__dirname + "/input.txt", {
    encoding: "utf-8",
  })
  .split("\n");

const targetNum = 1639024365;

let startIdx = 0;
let sum = 0;
let i = 0;

for (; i < input.length; i++) {
  const parsedNum = Number(input[i]);
  sum += parsedNum;
  while (sum > targetNum) {
    sum -= Number(input[startIdx]);
    startIdx++;
  }
  if (sum === targetNum) {
    break;
  }
}

const range = input.slice(startIdx, i);
let max = Number.MIN_VALUE;
let min = Number.MAX_VALUE;
for (const num of range) {
  const parsedNum = Number(num);
  if (max < parsedNum) {
    max = parsedNum;
  }
  if (min > parsedNum) {
    min = parsedNum;
  }
}
console.log(min + max);
