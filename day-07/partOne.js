const input = require("fs")
  .readFileSync(__dirname + "/input.txt", {
    encoding: "utf-8",
  })
  .split("\n");

const bagMap = {};

function parseBags(line) {
  const lineRegex = /^([\w\s]+) bags contain (.+)\.$/;
  const parsedLine = lineRegex.exec(line);
  const sourceBag = parsedLine[1];
  let matchedBags = Array.from(
    parsedLine[2].matchAll(/\d+ ([\w\s]+) bags?/g),
    (match) => match[1]
  );
  if (matchedBags.length === 1 && matchedBags[0] === "contain no other bags") {
    matchedBags = [];
  }
  return {
    parentBag: sourceBag,
    childBags: matchedBags,
  };
}

for (line of input) {
  const { parentBag, childBags } = parseBags(line);
  for (let bag of childBags) {
    if (bagMap[bag] === undefined) {
      bagMap[bag] = [parentBag];
    } else if (bagMap[bag].indexOf(parentBag) === -1) {
      bagMap[bag].push(parentBag);
    }
  }
}

const queue = bagMap["shiny gold"].slice();
const visitedBags = new Set();

while (queue.length > 0) {
  const curr = queue.pop();
  visitedBags.add(curr);
  if (bagMap[curr] === undefined) continue;
  for (const bag of bagMap[curr]) {
    if (!visitedBags.has(bag)) {
      queue.unshift(bag);
    }
  }
}
console.log(visitedBags.size);
