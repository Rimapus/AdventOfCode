const fs = require("fs")
const { mainModule } = require("process")
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8")

input = input.split(/\r?\n/).map(Number)


console.log("AoC 2020 Day 10:")

// Part 1
let differences = { 1: 0, 3: 0 }
let jolt = 0;
([...input].sort((a, b) => a - b)).forEach(elem => {
  if (elem - jolt === 1) differences[1]++
  else if (elem - jolt === 2) differences[2]++
  else differences[3]++

  jolt = elem
});
differences[3]++

console.log(`Part 1 answer: ${differences[1] * differences[3]}`) // 2272


// Part 2
// Obscur math property ? Had to search on the megathread for this
const tribonacci = [1, 1, 1, 2, 4, 7, 13]
let arrangementsCount = 1
let sectionLength = 0;
let sorted = ([...input].sort((a, b) => a - b))
sorted.unshift(0)

sorted.forEach((elem, i, arr) => {
    sectionLength++
    if ((arr[i+1] || (elem + 3)) - elem === 3) {
        arrangementsCount = arrangementsCount * tribonacci[sectionLength]
        sectionLength = 0
    }
});

console.log(`Part 2 answer: ${arrangementsCount}`) // 84627647627264