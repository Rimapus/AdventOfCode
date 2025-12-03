const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n/);


console.log("AoC 2016 Day 6:");

let verticalInput = [];
for (let col = 0; col < input[0].length; col++) {
    verticalInput.push(input.map(e => e[col]));
}
let answer1 = "";
let answer2 = "";
verticalInput.forEach(e => {
    const letters = {};
    e.forEach(l => letters[l] ? letters[l] += 1 : letters[l] = 1);
    answer1 += Object.entries(letters).sort((a, b) => b[1] - a[1])[0][0];
    answer2 += Object.entries(letters).sort((a, b) => b[1] - a[1]).at(-1)[0];
});

// Part 1
console.log(`Part 1 answer: ${answer1}`); // kjxfwkdh


// Part 2
console.log(`Part 2 answer: ${answer2}`); // xrwcsnps