const fs = require("fs")
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8")

input = input.split(/\r?\n/).map(elem => elem.split(" ").map(Number))


console.log("AoC 2023 Day 9:")

let extrapolatedSum1 = 0, extrapolatedSum2 = 0
input.forEach(line => {
    const lineSequences = [line]

    while (!lineSequences.at(-1).every(e => e === 0)) {
        const newSequence = []
        lineSequences.at(-1).forEach((e, i, arr) => {
            if (arr[i + 1] !== undefined) newSequence.push(arr[i + 1] - e)
        })
        lineSequences.push(newSequence)
    }

    lineSequences.reverse()
    lineSequences[0].push(0)
    lineSequences[0].unshift(0)
    for (let j = 1; j < lineSequences.length; j++) {
        lineSequences[j].push(lineSequences[j].at(-1) + lineSequences[j - 1].at(-1))
        lineSequences[j].unshift(lineSequences[j][0] - lineSequences[j - 1][0])
    }

    extrapolatedSum1 += lineSequences.at(-1).at(-1)
    extrapolatedSum2 += lineSequences.at(-1)[0]

})

// Part 1
console.log(`Part 1 answer: ${extrapolatedSum1}`) // 2174807968


// Part 2
console.log(`Part 2 answer: ${extrapolatedSum2}`) // 1208