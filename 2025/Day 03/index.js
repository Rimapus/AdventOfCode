const fs = require("fs")
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8")

input = input.split(/\r?\n/).map(elem => elem.split("").map(Number));


console.log("AoC 2025 Day 3:")

function findMaxJoltageSum(batteryCount) {
    let maxJoltageSum = 0;
    for (const bank of input) {
        let selected = "";

        let left = 0;
        let right = bank.length - (batteryCount - 1);
        for (let i = 0; i < batteryCount; i++) {
            const slice = bank.slice(left, right);
            const maxIndex = slice.findIndex(battery => battery === Math.max(...slice));

            selected += slice[maxIndex];
            left += maxIndex + 1;
            right = bank.length - ((batteryCount - 1) - selected.length);
        }

        maxJoltageSum += Number(selected);
    }
    return maxJoltageSum;
}

// Part 1
console.log(`Part 1 answer: ${findMaxJoltageSum(2)}`) // 17301


// Part 2
console.log(`Part 2 answer: ${findMaxJoltageSum(12)}`) // 172162399742349