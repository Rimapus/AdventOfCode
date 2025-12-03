const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n/)
    .map(elem => [
        Number(elem.split(":")[0].split(/  */)[1]),
        elem.split(":")[1].split("|")
            .map(elem2 => elem2.trim()
                .split(/  */)
                .map(Number)
            )
    ]);


console.log("AoC 2023 Day 4:");

let pointsSum = 0;
const cardsPile = Object.fromEntries(input.map(card => [card[0], 1]));

input.forEach(card => {
    let matchingCount = 0;

    card[1][0].forEach(winningNumber => {
        if (card[1][1].indexOf(winningNumber) !== -1) matchingCount++;
    });

    pointsSum += matchingCount ? 2 ** (matchingCount - 1) : 0;

    for (let i = 1; i <= matchingCount; i++) {
        cardsPile[card[0] + i] += cardsPile[card[0]];
    }
});

// Part 1
console.log(`Part 1 answer: ${pointsSum}`); // 23028


// Part 2
console.log(`Part 2 answer: ${Object.values(cardsPile).reduce((a, b) => a + b)}`); // 9236992