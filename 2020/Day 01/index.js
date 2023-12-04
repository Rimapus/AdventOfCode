const fs = require("fs")
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8")

input = input.split(/\r?\n/)
    .map(Number)


console.log("AoC 2020 Day 1:")

let answer1 = 0
let answer2 = 0
for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++) {
        for (let k = 0; k < input.length; k++) {
            if (input[i] + input[j] + input[k] === 2020) answer2 = input[i] * input[j] * input[k]
        }
        if (input[i] + input[j] === 2020) answer1 = input[i] * input[j]
    }
}

// Part 1
console.log(`Part 1 answer: ${answer1}`) // 567171


// Part 2
console.log(`Part 2 answer: ${answer2}`) // 212428694