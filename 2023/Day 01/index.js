const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n/);


console.log("AoC 2023 Day 1:");

// Part 1
const input1 = input.map(elem => elem.split("").filter(c => Number(c)));
let sum1 = 0;
input1.forEach(elem => {
    sum1 += Number(`${elem[0]}${elem[elem.length-1]}`);
});
console.log(`Part 1 answer: ${sum1}`); // 54940


// Part 2
let digitWords = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
};

let input2 = [];

for (let i in input) {
    input2[i] = new Array(input[i].length).fill(null);
    for (let j in input[i]) {
        if (Number(input[i][j])) { input2[i][j] = Number(input[i][j]); }
    }

    const regExMatches = Array.from(input[i].matchAll(/(?=(one|two|three|four|five|six|seven|eight|nine))/g));
    regExMatches.forEach(match => {
        input2[i][match.index] = digitWords[match[1]];
    });
}

input2 = input2.map(elem => elem.filter(Number));

let sum2 = 0;
input2.forEach(elem => {
    console.log(Number(`${elem[0]}${elem[elem.length-1]}`));
    sum2 += Number(`${elem[0]}${elem[elem.length-1]}`);
});
console.log(`Part 2 answer: ${sum2}`); // 54208