const fs = require("fs")
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8")

input = input.split(/\r?\n/)
    .map(elem => [elem.split(": ")[0].split(/[\s-]+/), elem.split(": ")[1]])


console.log("AoC 2020 Day 2:")

// Part 1
let validCount = 0
input.forEach(elem => {
    let caracterCount = (elem[1].match(new RegExp(elem[0][2], "g")) || []).length
    if (elem[0][0] <= caracterCount && caracterCount <= elem[0][1]) validCount++
});

console.log(`Part 1 answer: ${validCount}`) // 660


// Part 2
validCount = 0
input.forEach(elem => {
    // (cond1) !== (cond2) makes an XOR test (only one can be true)
    if ((elem[1].charAt(elem[0][0]-1) === elem[0][2]) !== (elem[1].charAt(elem[0][1]-1) === elem[0][2])) validCount++ 
});

console.log(`Part 2 answer: ${validCount}`) // 530