const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n/).map(elem => [elem.split(" ")[0], +elem.split(" ")[1] ? +elem.split(" ")[1] : null]);

let currentCycle = 0;
let register = 1;
let addxCounter = 0;
let signalStrengthsSum = 0;
const CRT = [...Array(6)].map(() => [...Array(40)].map(() => " "));
for (let i = 0; i < input.length;) {
    if (addxCounter === 0) register += input[i-1] ? input[i-1][1] : 0;
    if (input[i][0] === "noop") {
        currentCycle++;
        i++;
    }
    else if (input[i][0] === "addx") {
        currentCycle++;
        addxCounter++;
        if (addxCounter === 2) {
            addxCounter = 0;
            i++;
        }
    }
    if (currentCycle % 40 === 20) signalStrengthsSum += currentCycle * register;

    if ([register-1, register, register+1].includes((currentCycle-1)%40)) 
        CRT[Math.floor((currentCycle-1)/40)][(currentCycle-1)%40] = "█";
}


console.log("AoC 2022 Day 10:");

// Part 1
console.log(`Part 1 answer: ${signalStrengthsSum}`); // 12740


// Part 2
// TODO - Parse ascii art
console.log(`Part 2 answer: \n${CRT.map(elem => elem.join("")).join("\n")}`); // RBPARAGF
