const fs = require("fs")
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8")

input = input.split(/\r?\n/)
    .map(elem => elem.split(""))


console.log("AoC 2021 Day 10:")

let syntaxErrorScore = 0
let autocompleteScores = []
input.forEach(elem => {
    let cache = []
    let autocompleteScore = 0

    for (let elemIndex in elem) {
        let elem1 = elem[elemIndex]

        if (["(", "[", "{", "<"].includes(elem1)) {
            cache.push(elem1)
        } else {

            let openingIndex = ["(", "[", "{", "<"].indexOf(cache[cache.length - 1])
            let closingIndex = [")", "]", "}", ">"].indexOf(elem1)

            if (openingIndex === closingIndex) {
                // Valid chunk
                cache.pop()
            } else {
                // Invalid chunk so corrupted line
                syntaxErrorScore += [3, 57, 1197, 25137][closingIndex]
                return
            }
        }

        if (elemIndex == elem.length - 1) {
            // Incomplete line
            cache.reverse().forEach(e => {
                autocompleteScore *= 5
                autocompleteScore += ["(", "[", "{", "<"].indexOf(e) + 1
            })
        }
    }
    autocompleteScores.push(autocompleteScore)
})

// Part 1
console.log(`Part 1 answer: ${syntaxErrorScore}`) // 323613


// Part 2
console.log(`Part 2 answer: ${autocompleteScores.sort((a, b) => b - a)[(autocompleteScores.length - 1) / 2]}`) // 3103006161