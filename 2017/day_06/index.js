const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\t/).map(Number);


console.log("AoC 2017 Day 6:");

function getIndexOfHighest(input) {
    let maxValue = 0;
    let maxIndex = 0;

    input.forEach((bank, i) => {
        if (bank > maxValue) {
            maxValue = bank;
            maxIndex = i;
        }
    });
    return maxIndex;
}

const seenStates = {};
let cycle = 0;
while (!Object.keys(seenStates).includes(input.join(" "))) {
    seenStates[input.join(" ")] = cycle;
    let currIndex = getIndexOfHighest(input);
    let toDistribute = input[currIndex];

    input[currIndex] = 0;
    while (toDistribute > 0) {
        currIndex++;
        currIndex %= input.length;
        input[currIndex] += 1;
        toDistribute--;
    }
    cycle++;
}

// Part 1
console.log(`Part 1 answer: ${cycle}`); // 3156


// Part 2
console.log(`Part 2 answer: ${cycle - seenStates[input.join(" ")]}`); // 1610
