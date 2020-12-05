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
  return {
    row,
    col,
  };
}

const seats = [];
for (let i = 0; i < 128; i++) {
  seats[i] = Array(8)
    .fill()
    .map((_, idx) => idx);
}

for (let line of input) {
  const { row, col } = parseSeat(line);
  seats[row] = seats[row].filter((idx) => idx !== col);
}
for (let i = 0; i < seats.length; i++) {
  const row = seats[i];
  if (row.length === 1) {
    console.log(i * 8 + row[0]);
  }
}
