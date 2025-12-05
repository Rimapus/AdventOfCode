const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n\r?\n/);
input[0] = input[0].split(/\r?\n/).map(range => range.split("-").map(Number));
input[1] = input[1].split(/\r?\n/).map(Number);


console.log("AoC 2025 Day 5:");

// Part 1
let validIds = input[1].reduce((a, b) => a + input[0].some(range => b >= range[0] && b <= range[1]), 0);
console.log(`Part 1 answer: ${validIds}`); // 640


// Part 2
function getMaxRange(start, end) {
    let newStart = start;
    let newEnd = end;
    let joinableRanges = input[0].filter(range => (range[0] < newStart && range[1] >= newStart - 1) || (range[0] <= newEnd + 1 && range[1] > newEnd));

    while (joinableRanges.length > 0) {
        joinableRanges.forEach(range => {
            newStart = Math.min(newStart, range[0]);
            newEnd = Math.max(newEnd, range[1]);
        });
        joinableRanges = input[0].filter(rng => (rng[0] < newStart && rng[1] >= newStart - 1) || (rng[0] <= newEnd + 1 && rng[1] > newEnd));
    }
    return [newStart, newEnd];
}

let newRanges = [];
input[0].forEach(range => {
    if (newRanges.filter(rng => range[0] >= rng[0] && range[1] <= rng[1]).length > 0) return;
    const newRange = getMaxRange(range[0], range[1]);
    if (newRanges.filter(rng => rng[0] === newRange[0] && rng[1] === newRange[1]).length === 0)
        newRanges.push(newRange);
});

let consideredValid = newRanges.reduce((a, b) => a + (b[1] - b[0] + 1), 0);
console.log(`Part 2 answer: ${consideredValid}`); // 365804144481581