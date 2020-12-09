const input = require("fs")
  .readFileSync(__dirname + "/input.txt", {
    encoding: "utf-8",
  })
  .split("\n");

const preambleLength = 25;
const preambleArr = [];
for (let i = 0; i < preambleLength; i++) {
  const parsedNum = Number(input[i]);
  preambleArr.push(parsedNum);
}

function validateProperty(target, nums) {
  for (const num of nums) {
    const diffNum = target - num;
    // console.log(diffNum);
    if (nums.indexOf(diffNum) !== -1 && diffNum != num) {
      return true;
    }
  }
  return false;
}

for (let i = preambleLength; i < input.length; i++) {
  const parsedNum = Number(input[i]);
  if (!validateProperty(parsedNum, preambleArr)) {
    console.log(parsedNum);
    return;
  }
  preambleArr.shift();
  preambleArr.push(parsedNum);
}
