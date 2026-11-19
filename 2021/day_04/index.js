const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n\r?\n/);
const numbers = input.shift().split(",").map(Number);
const boards = input.map(elem => elem.split(/\r?\n/).map(elem1 => elem1.trim().split(/ +/g).map(Number)));


console.log("AoC 2021 Day 4:");

let answer1, answer2;
for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < boards.length; j++) {
        if (!boards[j]) continue;

        for (let k = 0; k < boards[j].length; k++) {
            if (boards[j][k].indexOf(numbers[i]) !== -1) {
                const numberIndex = boards[j][k].indexOf(numbers[i]);
                boards[j][k][boards[j][k].indexOf(numbers[i])] = -1;

                if (
                    boards[j][k].every(elem => elem === -1) || // Horizontal
                    boards[j].map(elem => elem[numberIndex]).every(elem => elem === -1) // Vertical
                ) {
                    const score = boards[j].flat().filter(elem => elem !== -1).reduce((a, b) => a + b, 0) * numbers[i];

                    if (boards.filter(elem => elem).length === 1) answer2 = score;
                    else if (boards.filter(elem => elem).length === boards.length) answer1 = score;

                    delete boards[j];
                }
                break;
            }
        }
    }
}

// Part 1
console.log(`Part 1 answer: ${answer1}`); // 50008


// Part 2
console.log(`Part 2 answer: ${answer2}`); // 17408
