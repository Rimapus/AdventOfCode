const fs = require("fs")
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8")

input = input.split(/\r?\n\r?\n/)
const instructions = input[0]
const network = input[1].replaceAll(")", "").split(/\r?\n/).map(elem => [
    elem.split(" = (")[0],
    elem.split(" = (")[1].split(", ")
])


console.log("AoC 2023 Day 8:")

// Part 1
let currentNode = "AAA"
let stepCount1 = 0
while (currentNode !== "ZZZ") {
    const stepInstruction = instructions[stepCount1 % instructions.length]

    if (stepInstruction === "L") currentNode = network.find(node => node[0] === currentNode)[1][0]
    else currentNode = network.find(node => node[0] === currentNode)[1][1]
    stepCount1++
}

console.log(`Part 1 answer: ${stepCount1}`) // 14257


// Part 2
let startingNodes = network.filter(node => node[0].endsWith("A"))
let stepCount2 = []
for (let i = 0; i < startingNodes.length; i++) {

    let stepCount = 0

    while (!startingNodes[i][0].endsWith("Z")) {

        const stepInstruction = instructions[stepCount % instructions.length]

        if (stepInstruction === "L") startingNodes[i] = network.find(nd => nd[0] === startingNodes[i][1][0])
        else startingNodes[i] = network.find(nd => nd[0] === startingNodes[i][1][1])

        stepCount++
    }

    stepCount2.push(stepCount)
}

// From https://www.reddit.com/r/adventofcode/comments/18df7px/comment/kcgyf7a
// Black magic lol
const gcd = (a, b) => {
    if (b === 0) return a
    return gcd(b, a % b)
}

const lcm = (a, b) => {
    return (a * b) / gcd(a, b)
}

console.log(`Part 2 answer: ${stepCount2.reduce((acc, curr) => lcm(acc, curr), 1)}`) // 16187743689077