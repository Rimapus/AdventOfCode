const fs = require("fs")
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8")

input = input.split(/\r?\n/)
    .map(elem => [elem[0], +elem.slice(1)])


console.log("AoC 2018 Day 1:")

let frequency = 0
let answer1, answer2
const reachedFreq = []

for (const change of input) {
    if (change[0] === "+") frequency += change[1]
    else frequency -= change[1]

    if (reachedFreq.includes(frequency) && !answer2) {
        answer2 = frequency
    }
    reachedFreq.push(frequency)
}
answer1 = frequency

while (answer2 == null) {
    for (const freq of reachedFreq) {
        if (reachedFreq.includes(freq + frequency)) {
            answer2 = freq + frequency
            break
        }
    }
    frequency += reachedFreq.at(-1)
}

// Part 1
console.log(`Part 1 answer: ${answer1}`) // 454


// Part 2
console.log(`Part 2 answer: ${answer2}`) // 566