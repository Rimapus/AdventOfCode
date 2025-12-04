const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n/).map(elem => elem.split(""));


console.log("AoC 2025 Day 4:");

// Part 1
function countNeighbors(input, x, y) {
    let neighbors = 0;
    neighbors += input[y - 1]?.[x - 1] === "@";
    neighbors += input[y - 1]?.[x] === "@";
    neighbors += input[y - 1]?.[x + 1] === "@";
    neighbors += input[y]?.[x - 1] === "@";
    neighbors += input[y]?.[x + 1] === "@";
    neighbors += input[y + 1]?.[x - 1] === "@";
    neighbors += input[y + 1]?.[x] === "@";
    neighbors += input[y + 1]?.[x + 1] === "@";
    return neighbors;
}

let accessibleRolls = 0;
for (let i = 0; i < input[0].length; i++) {
    for (let j = 0; j < input.length; j++) {
        if (input[j][i] !== "@" || countNeighbors(input, i, j) >= 4) continue;
        accessibleRolls++;
    }
}
console.log(`Part 1 answer: ${accessibleRolls}`); // 1480


// Part 2
let removedRolls = 0;
let canContinue = true;
while (canContinue) {
    canContinue = false;
    for (let i = 0; i < input[0].length; i++) {
        for (let j = 0; j < input.length; j++) {
            if (input[j][i] !== "@" || countNeighbors(input, i, j) >= 4) continue;
            removedRolls++;
            input[j][i] = ".";
            canContinue = true;
        }
    }
}

console.log(`Part 2 answer: ${removedRolls}`); // 8899