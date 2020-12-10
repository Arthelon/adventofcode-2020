const input = require("fs")
  .readFileSync(__dirname + "/input.txt", {
    encoding: "utf-8",
  })
  .split("\n");

const visitedSet = new Set();
let currIdx = 0;
let acc = 0;
while (!visitedSet.has(currIdx)) {
  visitedSet.add(currIdx);
  const [instr, val] = input[currIdx].split(" ");
  const parsedValue = Number(val);
  if (instr === "acc") {
    acc += parsedValue;
  } else if (instr === "jmp") {
    currIdx += parsedValue;
    continue;
  }
  currIdx++;
}
console.log(acc);
