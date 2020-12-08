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
    parsedLine[2].matchAll(
      /(?:(\d+) ([\w\s]+) bags?)|(?:contain no other bags)/g
    ),
    (match) => {
      if (match[1] === undefined) {
        return null;
      }
      return {
        name: match[2],
        count: Number(match[1]),
      };
    }
  );
  if (matchedBags.length === 1 && matchedBags[0] === null) {
    matchedBags = [];
  }
  return {
    parentBag: sourceBag,
    childBags: matchedBags,
  };
}

function recursiveCountBags(bagName, bagMap) {
  if (bagMap[bagName].length === 0) {
    return 1;
  }
  let sum = 0;
  const bags = bagMap[bagName];
  for (const bag of bags) {
    const innerCount = recursiveCountBags(bag.name, bagMap);
    if (innerCount === 1) {
      sum += bag.count * innerCount;
    } else {
      sum += bag.count + bag.count * innerCount;
    }
  }
  return sum;
}

for (line of input) {
  const { parentBag, childBags } = parseBags(line);
  bagMap[parentBag] = childBags;
}

console.log(recursiveCountBags("shiny gold", bagMap));
