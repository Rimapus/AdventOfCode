const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n/)
    .map(elem => Array.from(elem.match(/#([0-9]+) @ ([0-9]+),([0-9]+): ([0-9]+)x([0-9]+)/).slice(1))
        .map(Number));


console.log("AoC 2018 Day 3:");

// Part 1
let maxWidth = 0;
let maxHeight = 0;
input.forEach(claim => {
    maxWidth = Math.max(maxWidth, claim[1] + claim[3]);
    maxHeight = Math.max(maxHeight, claim[2] + claim[4]);
});

const grid = JSON.parse(JSON.stringify(new Array(maxHeight).fill(new Array(maxWidth).fill(0))));
input.forEach(claim => {
    for (let i = claim[2]; i < claim[2] + claim[4]; i++) {
        for (let j = claim[1]; j < claim[1] + claim[3]; j++) {
            grid[i][j] += 1;
            
        }
    }
});

let overlapCount = 0;
grid.forEach(line => {
    overlapCount += line.filter(elem => elem > 1).length;
});
console.log(`Part 1 answer: ${overlapCount}`); // 111485


// Part 2
let answer2;
input.forEach(claim => {
    let hasOverlap = false;
    for (let i = claim[2]; i < claim[2] + claim[4]; i++) {
        for (let j = claim[1]; j < claim[1] + claim[3]; j++) {
            if (grid[i][j] > 1) {
                hasOverlap = true;
                return;
            }
        }
    }
    if (!hasOverlap)
        answer2 = claim[0];
});
console.log(`Part 2 answer: ${answer2}`); // 113
