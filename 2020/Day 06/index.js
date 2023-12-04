const fs = require("fs")
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8")

input = input.split(/\r?\n\r?\n/)
    .map(elem => elem.split(/\r?\n/))


console.log("AoC 2020 Day 6:")

// Part 1
let sum = 0
input.forEach(elem => {
    sum += new Set(elem.join("").split("")).size
});

console.log(`Part 1 answer: ${sum}`) // 6799


// Part 2
sum = 0
let alphabet = [...Array(26)].map((_, i) => String.fromCharCode(i + 97))
input.forEach(elem => {
    let commonCount = 0
    for (let i = 0; i < alphabet.length; i++) {
        if (elem.every(elem1 => elem1.includes(alphabet[i]))) commonCount++
    }
    sum += commonCount
});

console.log(`Part 2 answer: ${sum}`) // 3354