const fs = require("fs")
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8")

input = input.split(/\r?\n/)
    .map(Number)


console.log("AoC 2019 Day 1:")

let fuelSum1 = 0
let fuelSum2 = 0
for (let x of input) {
    fuelSum1 += Math.floor(x / 3) - 2

    let fuelRequired = Math.floor(x / 3) - 2
    let sum = 0

    while (fuelRequired > 0) {
        sum += fuelRequired
        fuelRequired = Math.floor(fuelRequired / 3) - 2
    }

    fuelSum2 += sum
}

// Part 1
console.log(`Part 1 answer: ${fuelSum1}`) // 3456641


// Part 2
console.log(`Part 2 answer: ${fuelSum2}`) // 5182078