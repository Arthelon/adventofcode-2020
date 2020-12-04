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

const requiredFields = [
  {
    key: "byr",
    validator: function (value) {
      const parsedYear = Number(value);
      if (isNaN(parsedYear)) {
        return false;
      }
      return parsedYear >= 1920 && parsedYear <= 2002;
    },
  },
  {
    key: "iyr",
    validator: function (value) {
      const parsedYear = Number(value);
      if (isNaN(parsedYear)) {
        return false;
      }
      return parsedYear >= 2010 && parsedYear <= 2020;
    },
  },
  {
    key: "eyr",
    validator: function (value) {
      const parsedYear = Number(value);
      if (isNaN(parsedYear)) {
        return false;
      }
      return parsedYear >= 2020 && parsedYear <= 2030;
    },
  },
  {
    key: "hgt",
    validator: function (value) {
      const match = /^(\d+)((?:cm)|(?:in))$/.exec(value);
      if (!match) return false;
      const parsedHeight = Number(match[1]);
      if (match[2] === "cm") {
        return parsedHeight >= 150 && parsedHeight <= 193;
      } else {
        return parsedHeight >= 59 && parsedHeight <= 76;
      }
    },
  },
  {
    key: "hcl",
    validator: function (value) {
      return /^#[0-9a-f]{6}$/.test(value);
    },
  },
  {
    key: "ecl",
    validator: function (value) {
      const validColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
      return validColors.indexOf(value) !== -1;
    },
  },
  {
    key: "pid",
    validator: function (value) {
      return value.length === 9 && !isNaN(Number(value));
    },
  },
];

function validatePassport(passport) {
  for (const { key, validator } of requiredFields) {
    if (passport[key] === undefined || !validator(passport[key])) {
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
