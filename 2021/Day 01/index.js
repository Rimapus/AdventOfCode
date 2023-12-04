const fs = require("fs")
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8")

input = input.split(/\r?\n/)
    .map(Number)


console.log("AoC 2021 Day 1:")

// Part 1
console.log(`Part 1 answer: ${input.filter((elem, i, arr) => elem < arr[i + 1]).length}`) // 1451


// Part 2
console.log(`Part 2 answer: ${input.filter((elem, i, arr) => arr.slice(i, i + 3).reduce((a, b) => a + b, 0) < arr.slice(i + 1, i + 4).reduce((a, b) => a + b, 0)).length}`) // 1395
