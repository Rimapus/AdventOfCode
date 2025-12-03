const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split("-")
    .map(Number);


console.log("AoC 2019 Day 4:");

const checkPassword = (pw, part2 = false) => {
    const splitPW = pw.toString().split("").map(Number);

    if (!splitPW.slice(0, splitPW.length - 1).every((num, i) => splitPW[i + 1] - num >= 0)) return false;

    if (part2) {
        let currDigit = splitPW[0];
        let digitCount = 1;
        for (let i = 1; i < splitPW.length; i++) {
            if (splitPW[i] === currDigit) {
                digitCount++;
            } else {
                if (digitCount === 2) return true;
                currDigit = splitPW[i];
                digitCount = 1;
            }
        }
        if (digitCount === 2) return true;
        return false;

    } else return new RegExp(/(\d)\1/g).test(pw.toString());
};


let validPWCount1 = 0, validPWCount2 = 0;
for (let i = input[0]; i < input[1] + 1; i++) {
    if (checkPassword(i)) validPWCount1++;
    if (checkPassword(i, true)) validPWCount2++;
}

// Part 1
console.log(`Part 1 answer: ${validPWCount1}`); // 460


// Part 2
console.log(`Part 2 answer: ${validPWCount2}`); // 290