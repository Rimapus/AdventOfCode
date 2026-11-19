const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n/);


console.log("AoC 2023 Day 3:");

function addGearRatio(gearsFound, coords, ratio) {
    gearsFound[coords] ?
        gearsFound[coords].push(Number(ratio))
        : gearsFound[coords] = [Number(ratio)];
}


let partsNumberSum = 0, gearRatiosSum = 0;
const gearsFound = {};

input.forEach((line, lineIndex) => {
    const numbers = Array.from(line.matchAll(/\d+/g));

    numbers.forEach(number => {
        let isPartNumber = false;

        if (line[number.index - 1] ? line?.[number.index - 1] !== "." : false) {
            isPartNumber = true;             // Symbol directly on the left of number
            if (line?.[number.index - 1] === "*") {
                addGearRatio(gearsFound, `${number.index - 1}, ${lineIndex}`, number[0]);
            }
        }

        if (line[number.index + number[0].length] ? line[number.index + number[0].length] !== "." : false) {
            isPartNumber = true;             // Symbol directly on the right of number
            if (line[number.index + number[0].length] === "*") {
                addGearRatio(gearsFound, `${number.index + number[0].length}, ${lineIndex}`, number[0]);
            }
        }


        const aboveSymbols = input?.[lineIndex - 1]
            ?.substring(number.index - 1, number.index + number[0].length + 1)
            .split("")
            .map((e, i) => [e, i])
            .filter(e => e[0] !== ".");

        if (aboveSymbols && aboveSymbols.length !== 0) {
            isPartNumber = true;             // Symbol above the number
            if (aboveSymbols[0][0] === "*") {
                addGearRatio(gearsFound, `${aboveSymbols[0][1] + Math.max(number.index - 1, 0)}, ${lineIndex - 1}`, number[0]);
            }
        }


        const bellowSymbols = input?.[lineIndex + 1]
            ?.substring(number.index - 1, number.index + number[0].length + 1)
            .split("")
            .map((e, i) => [e, i])
            .filter(e => e[0] !== ".");

        if (bellowSymbols && bellowSymbols.length !== 0) {
            isPartNumber = true;             // Symbol bellow the number
            if (bellowSymbols[0][0] === "*") {
                addGearRatio(gearsFound, `${bellowSymbols[0][1] + Math.max(number.index - 1, 0)}, ${lineIndex + 1}`, number[0]);
            }
        }

        if (isPartNumber) partsNumberSum += Number(number[0]);
    });
});

Object.values(gearsFound).filter(e => e.length === 2).forEach(ratios => {
    gearRatiosSum += ratios.reduce((a, b) => a * b, 1);
});

// Part 1
console.log(`Part 1 answer: ${partsNumberSum}`); // 530495


// Part 2
console.log(`Part 2 answer: ${gearRatiosSum}`); // 80253814
