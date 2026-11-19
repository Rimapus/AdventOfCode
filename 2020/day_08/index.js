const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n/)
    .map(elem => [elem.split(" ")[0], +elem.split(" ")[1]]);


console.log("AoC 2020 Day 8:");

// Part 1
let line = 0;
let lineHistory = [];
let accumulator = 0;
while (!lineHistory.includes(line)) {
    lineHistory.push(line);
    switch (input[line][0]) {
        case "acc":
            accumulator += input[line][1];
            line++;
            break;

        case "jmp":
            line += input[line][1];
            break;

        case "nop":
            line++;
            break;
    }
}

console.log(`Part 1 answer: ${accumulator}`); // 1928


// Part 2
let modifiedIndex = 0;
line = 0;
lineHistory = [];
accumulator = 0;
while (line !== input.length) {
    line = 0;
    lineHistory = [];
    accumulator = 0;
    const tempInput = JSON.parse(JSON.stringify(input));

    tempInput[modifiedIndex][0] = input[modifiedIndex][0] === "jmp" ? "nop" : "jmp";

    while (!lineHistory.includes(line)) {
        lineHistory.push(line);
        switch (tempInput[line]?.[0]) {
            case "acc":
                accumulator += tempInput[line][1];
                line++;
                break;

            case "jmp":
                line += tempInput[line][1];
                break;

            case "nop":
                line++;
                break;
        }
    }

    const indexes = [input.flat().indexOf("jmp", (modifiedIndex + 1) * 2), input.flat().indexOf("nop", (modifiedIndex + 1) * 2)].filter(elem => elem !== -1).map(elem1 => elem1 / 2);
    if (indexes.length > 0) modifiedIndex = Math.min(...indexes);
    else break;
}

console.log(`Part 2 answer: ${accumulator}`); // 1319
