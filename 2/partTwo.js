const input = require("fs")
  .readFileSync(__dirname + "/input.txt", {
    encoding: "utf-8",
  })
  .split("\n");

function validatePassword(line) {
  const parseRegex = /^(\d+)-(\d+) (\w)\: (\w+)$/;
  const groups = parseRegex.exec(line);
  const firstIdx = Number(groups[1]);
  const secondIdx = Number(groups[2]);
  const char = groups[3];
  const password = groups[4];

  const firstEqual = password.charAt(firstIdx - 1) === char;
  const secondEqual = password.charAt(secondIdx - 1) === char;
  if ((firstEqual && secondEqual) || (!firstEqual && !secondEqual)) {
    return false;
  }
  return true;
}

let validPasswords = 0;
for (let line of input) {
  if (validatePassword(line)) {
    validPasswords++;
  }
}
console.log(validPasswords);
