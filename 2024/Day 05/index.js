const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n\r?\n/).map(elem => elem.trim().split(/\r?\n/));
input[0] = input[0].map(elem => elem.split("|").map(Number));
input[1] = input[1].map(elem => elem.split(",").map(Number));


console.log("AoC 2024 Day 5:");

let correctlyOrderedMiddleSum = 0;
const incorrectUpdates = [];

for (const update of input[1]) {
    let correct = true;
    for (const pageIndex in update) {
        const page = update[pageIndex];
        const pageRules = input[0].filter(rule => rule.includes(page));

        for (const rule of pageRules) {
            const otherPagePosition = rule.findIndex(p => p !== page);
            const otherPageIndex = update.findIndex(p => p === rule[otherPagePosition]);

            if (otherPageIndex === -1) continue;
            if ((otherPagePosition === 0 && otherPageIndex > pageIndex)) {
                correct = false;
                break;
            }
        }
        if (!correct) break;
    }
    if (correct) correctlyOrderedMiddleSum += update[(update.length - 1) / 2];
    else incorrectUpdates.push(update);
}

// Part 1
console.log(`Part 1 answer: ${correctlyOrderedMiddleSum}`); // 5762


// Part 2
for (const update of incorrectUpdates) {
    let correct = true;
    do {
        correct = true;
        for (const pageIndex in update) {
            const page = update[pageIndex];
            const pageRules = input[0].filter(rule => rule.includes(page));

            for (const rule of pageRules) {
                const otherPagePosition = rule.findIndex(p => p !== page);
                const otherPageIndex = update.findIndex(p => p === rule[otherPagePosition]);

                if (otherPageIndex === -1) continue;
                if (otherPagePosition === 0 && otherPageIndex > pageIndex) {
                    update.splice(pageIndex, 0, rule[otherPagePosition]);
                    update.splice(otherPageIndex + 1, 1);
                    correct = false;
                }
            }
            if (!correct) break;
        }
    } while (!correct);
}

const incorrectlyOrderedMiddleSum = incorrectUpdates.reduce((a, b) => a + b[((b.length - 1) / 2)], 0);
console.log(`Part 2 answer: ${incorrectlyOrderedMiddleSum}`); // 4130