const input = require("fs")
  .readFileSync(__dirname + "/input.txt", {
    encoding: "utf-8",
  })
  .split("\n");

function validatePassword(line) {
  const parseRegex = /^(\d+)-(\d+) (\w)\: (\w+)$/;
  const groups = parseRegex.exec(line);
  const minTimes = Number(groups[1]);
  const maxTimes = Number(groups[2]);
  const char = groups[3];
  const password = groups[4];

  let charCount = 0;
  for (let i = 0; i < password.length; i++) {
    if (password.charAt(i) === char) {
      charCount++;
    }
  }
  if (charCount >= minTimes && charCount <= maxTimes) {
    return true;
  }
  return false;
}

let validPasswords = 0;
for (let line of input) {
  if (validatePassword(line)) {
    validPasswords++;
  }
}
console.log(validPasswords);
