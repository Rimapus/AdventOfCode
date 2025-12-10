const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n/).map(elem => elem.split(": ")[1].trim());
const input1 = input.map(elem => elem.split(/ +/).map(Number));
const input2 = input.map(elem => Number(elem.replaceAll(/ +/g, "")));


console.log("AoC 2023 Day 6:");

function returnWinPossibilities(b, c) { // Thanks math classes
    const delta = (b ** 2) - 4 * c;
    const lowerBoundary = (-b + Math.sqrt(delta)) / -2;
    const upperBoundary = (-b - Math.sqrt(delta)) / -2;

    return Math.floor(upperBoundary) - Math.ceil(lowerBoundary) + 1;
}

let answer1 = 1, answer2;
for (let raceIndex = 0; raceIndex < input1[0].length + 1; raceIndex++) {
    if (!input1[0][raceIndex]) {
        answer2 = returnWinPossibilities(input2[0], input2[1] + 1);
        continue;
    }

    answer1 *= returnWinPossibilities(input1[0][raceIndex], input1[1][raceIndex] + 1);
}

// Part 1
console.log(`Part 1 answer: ${answer1}`); // 131376


// Part 2
console.log(`Part 2 answer: ${answer2}`); // 34123437
