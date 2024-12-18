const fs = require("fs")
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8")

input = input.split(/\r?\n/).map(Number)


console.log("AoC 2017 Day 5:")

// Part 1
let tmpInput = [...input];
let step = 0;
let instruction = 0;
while (instruction < tmpInput.length) {
    let tmpOffset = tmpInput[instruction];
    tmpInput[instruction] += 1;
    instruction += tmpOffset;
    step++;
}
console.log(`Part 1 answer: ${step}`) // 375042


// Part 2
tmpInput = [...input];
step = 0;
instruction = 0;
while (instruction < tmpInput.length) {
    let tmpOffset = tmpInput[instruction];
    if (tmpOffset >= 3)
        tmpInput[instruction] -= 1;
    else
        tmpInput[instruction] += 1;
    instruction += tmpOffset;
    step++;
}
console.log(`Part 2 answer: ${step}`) // 28707598