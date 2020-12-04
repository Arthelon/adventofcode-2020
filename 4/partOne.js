const input = require("fs")
  .readFileSync(__dirname + "/input.txt", {
    encoding: "utf-8",
  })
  .split("\n");

function parsePassport(passportLines) {
  const passport = {};
  for (const line of passportLines) {
    line.split(" ").forEach((item) => {
      const pair = item.split(":");
      passport[pair[0]] = pair[1];
    });
  }
  return passport;
}

function validatePassport(passport) {
  const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
  for (const field of requiredFields) {
    if (passport[field] === undefined) {
      return false;
    }
  }
  return true;
}

let validPassports = 0;
let accedLines = [];
input.push(""); // empty terminator
for (const line of input) {
  if (line === "") {
    const passport = parsePassport(accedLines);
    if (validatePassport(passport)) {
      validPassports++;
    }
    accedLines = [];
  } else {
    accedLines.push(line);
  }
}
console.log(validPassports);
