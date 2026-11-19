const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n/).map(elem => elem.split(""));
const sourceX = input[0].findIndex(elem => elem === "S");


console.log("AoC 2025 Day 7:");

let beams = [[sourceX, 1]];
let splitCount = 0;
for (const line of input) {
    const newBeams = [];
    beams.forEach(beam => {
        if (line[beam[0]] !== "^")
            return newBeams.push(beam);

        splitCount++;
        newBeams.push([Number(beam[0]) - 1, beam[1]]);
        newBeams.push([Number(beam[0]) + 1, beam[1]]);
    });
    beams = Object.entries(newBeams.reduce((a, b) => (a[b[0]] = (a[b[0]] || 0) + b[1], a), {}));
}

// Part 1
console.log(`Part 1 answer: ${splitCount}`); // 1698


// Part 2
console.log(`Part 2 answer: ${beams.reduce((a, b) => a + b[1], 0)}`); // 95408386769474
