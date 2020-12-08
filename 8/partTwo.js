const input = require("fs")
  .readFileSync(__dirname + "/input.txt", {
    encoding: "utf-8",
  })
  .split("\n");

function runInstructions(currIdx, instructions, acc, visited, hasMutated) {
  if (currIdx === instructions.length) {
    return acc;
  }
  if (visited.has(currIdx)) {
    return null; // loop detected
  }
  visited.add(currIdx);
  const [instr, val] = input[currIdx].split(" ");
  const parsedValue = Number(val);
  if (instr === "acc") {
    return runInstructions(
      currIdx + 1,
      instructions,
      acc + parsedValue,
      visited,
      hasMutated
    );
  }

  const oldVisited = new Set(visited);
  let unmutatedResult;
  if (instr === "jmp") {
    unmutatedResult = runInstructions(
      currIdx + parsedValue,
      instructions,
      acc,
      visited,
      hasMutated
    );
  } else {
    unmutatedResult = runInstructions(
      currIdx + 1,
      instructions,
      acc,
      visited,
      hasMutated
    );
  }
  if (hasMutated || unmutatedResult !== null) {
    return unmutatedResult;
  }

  // Mutation
  if (instr === "jmp") {
    return runInstructions(currIdx + 1, instructions, acc, oldVisited, true);
  } else {
    return runInstructions(
      currIdx + parsedValue,
      instructions,
      acc,
      oldVisited,
      true
    );
  }
}

console.log(runInstructions(0, input, 0, new Set(), false));
