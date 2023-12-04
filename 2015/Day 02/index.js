const fs = require("fs")
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8")

input = input.split(/\r?\n/).map(elem => elem.split('x').map(Number))


console.log("AoC 2015 Day 2:")

// Part 1
let neededSurface = 0
input.forEach(elem => {
    let sides = [2*elem[0]*elem[1], 2*elem[1]*elem[2], 2*elem[2]*elem[0]]
    neededSurface += Math.min(...sides)/2 + sides.reduce((a, b) => a+b, 0)
});

console.log(`Part 1 answer: ${neededSurface}`) // 1588178


// Part 2
let neededLength = 0
input.forEach(elem => {
    elem.sort((a, b) => a-b)
    neededLength += (2*elem[0]+2*elem[1]) + elem.reduce((a, b) => a*b, 1)
})

console.log(`Part 2 answer: ${neededLength}`) // 3783758