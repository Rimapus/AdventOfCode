const fs = require("fs")
const { runComputer } = require("../Day 05/computer.js")
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8")

input = input.split(",")
    .map(Number)


console.log("AoC 2019 Day 5:")

// Part 1
console.log(`Part 1 answer: ${runComputer([1], input)}`) // 7265618


// Part 2
console.log(`Part 2 answer: ${runComputer([5], input)}`) // 7731427