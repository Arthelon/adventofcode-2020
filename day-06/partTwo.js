const input = require("fs")
  .readFileSync(__dirname + "/input.txt", {
    encoding: "utf-8",
  })
  .split("\n");

let sumCounts = 0;
let groupCount = 0;
let groupChars = Array(26).fill(0);
for (let i = 0; i < input.length; i++) {
  const currLine = input[i];
  if (currLine.length > 0) {
    for (let j = 0; j < currLine.length; j++) {
      const currChar = currLine.charAt(j);
      groupChars[currChar.charCodeAt(0) - 97]++;
    }
    groupCount++;
  }
  if (currLine.length === 0 || i === input.length - 1) {
    sumCounts += groupChars.reduce((prev, curr) => {
      if (curr === groupCount) {
        return prev + 1;
      }
      return prev;
    }, 0);
    groupCount = 0;
    groupChars = Array(26).fill(0);
  }
}
console.log(sumCounts);
