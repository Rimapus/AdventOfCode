const fs = require("fs")
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8")

input = input.split(/\r?\n/)
    .map(elem => [elem.split(" ")[0], +elem.split(" ")[1]])


console.log("AoC 2021 Day 2:")

// Part 1
let horPosition = 0
let depth = 0
input.forEach(elem => {
    switch (elem[0]) {
        case "forward":
            horPosition += elem[1]
            break;

        case "down":
            depth += elem[1]
            break;

        case "up":
            depth -= elem[1]
            break;
    }
});
console.log(`Part 1 answer: ${horPosition * depth}`) // 1746616


// Part 2
horPosition = 0
depth = 0
aim = 0
input.forEach(elem => {
    switch (elem[0]) {
        case "forward":
            horPosition += elem[1]
            depth += aim * elem[1]
            break;

        case "down":
            aim += elem[1]
            break;

        case "up":
            aim -= elem[1]
            break;
    }
});

console.log(`Part 2 answer: ${horPosition * depth}`) // 1741971043