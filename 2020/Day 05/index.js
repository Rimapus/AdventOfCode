const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n/)
    .map(elem => [elem.slice(0, 7), elem.slice(7, 10)]);


console.log("AoC 2020 Day 5:");

// Part 1
let seatIDs = [];
input.forEach(elem => {
    let row = [0, 127];
    let column = [0, 7];

    elem[0].split("").forEach(elem => {
        if (elem === "F") row[1] = row[1] - (((row[1] - row[0]) + 1) / 2);
        else row[0] = row[0] + (((row[1] - row[0]) + 1) / 2);
    });

    elem[1].split("").forEach(elem => {
        if (elem === "L") column[1] = column[1] - (((column[1] - column[0]) + 1) / 2);
        else column[0] = column[0] + (((column[1] - column[0]) + 1) / 2);
    });

    seatIDs.push(row[0] * 8 + column[0]);
});

console.log(`Part 1 answer: ${Math.max(...seatIDs)}`); // 935


// Part 2
let answer = 0;
seatIDs.sort((a, b) => a - b);
for (let i = 0; i < seatIDs.length; i++) {
    if (seatIDs[i - 1] + 1 === seatIDs[i] && seatIDs[i] + 1 !== seatIDs[i + 1]) {
        answer = seatIDs[i] + 1;
        break;
    }
}

console.log(`Part 2 answer: ${answer}`); // 743