const input = require("fs")
  .readFileSync(__dirname + "/input.txt", {
    encoding: "utf-8",
  })
  .split("\n");

function parseSeat(line) {
  const row = parseInt(
    line.substring(0, 7).replace(/F/g, "0").replace(/B/g, "1"),
    2
  );
  const col = parseInt(
    line.substring(7).replace(/L/g, "0").replace(/R/g, "1"),
    2
  );
  return row * 8 + col;
}

let maxId = 0;
for (let line of input) {
  const currId = parseSeat(line);
  if (currId > maxId) {
    maxId = currId;
  }
}
console.log(maxId);
