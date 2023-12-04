const fs = require("fs")
const crypto = require('crypto')
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8")


console.log("AoC 2016 Day 5:")

let increment = 0
let password1 = ""
let password2 = []
while (password1.length < 8 || password2.join("").length < 8) {
    const hash = crypto.createHash('md5').update(`${input}${increment}`).digest("hex")
    if (hash.startsWith("00000")) {
        if (password1.length < 8) password1 += hash[5]
        if (+hash[5] < 8 && !password2[+hash[5]]) password2[+hash[5]] = hash[6]
    }
    increment++
}

// Part 1
console.log(`Part 1 answer: ${password1}`) // d4cd2ee1


// Part 2
console.log(`Part 2 answer: ${password2.join("")}`) // f2c730e5

// Very long because of MD5