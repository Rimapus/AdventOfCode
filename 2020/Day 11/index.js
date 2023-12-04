const fs = require("fs")
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8")

input = input.split(/\r?\n/)
    .map(elem => elem.split(""))


console.log("AoC 2020 Day 11:")

const directionsOffsets = [
    { x: -1, y: -1 },   // UpLeft
    { x: 0, y: -1 },    // Up
    { x: 1, y: -1 },    // UpRight
    { x: -1, y: 0 },    // Left
    { x: 1, y: 0 },     // Right
    { x: -1, y: 1 },    // DownLeft
    { x: 0, y: 1 },     // Down
    { x: 1, y: 1 }      // DownRight
]

let changesCount1, changesCount2
let grid1 = JSON.parse(JSON.stringify(input))
let grid2 = JSON.parse(JSON.stringify(input))
let tempGrid1, tempGrid2

while (changesCount1 !== 0 || changesCount2 !== 0) {
    tempGrid1 = JSON.parse(JSON.stringify(new Array(grid1.length).fill(new Array(grid1[0].length).fill(""))))
    tempGrid2 = JSON.parse(JSON.stringify(new Array(grid2.length).fill(new Array(grid2[0].length).fill(""))))
    changesCount1 = 0
    changesCount2 = 0

    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[0].length; x++) {

            let adjacentSeats = [], visibleSeats = []
            directionsOffsets.map(offset => {
                let visibleSeat, searchx = 0, searchy = 0
                do {
                    searchx += offset.x
                    searchy += offset.y
                    visibleSeat = grid2[y + searchy]?.[x + searchx]
                } while (visibleSeat && visibleSeat === ".")
                if (grid1[y + offset.y]?.[x + offset.x] === "#") adjacentSeats.push(grid1[y + offset.y]?.[x + offset.x])
                if (visibleSeat === "#") visibleSeats.push(visibleSeat)
            })

            // Part 1
            if (grid1[y][x] === ".") tempGrid1[y][x] = "."
            if (!tempGrid1[y][x]) {
                if (grid1[y][x] === "L" && adjacentSeats.length === 0) {
                    tempGrid1[y][x] = "#"
                    changesCount1++

                } else if (grid1[y][x] === "#" && adjacentSeats.length >= 4) {
                    tempGrid1[y][x] = "L"
                    changesCount1++

                } else tempGrid1[y][x] = grid1[y][x]
            }

            // Part 2
            if (grid2[y][x] === ".") tempGrid2[y][x] = "."
            if (!tempGrid2[y][x]) {
                if (grid2[y][x] === "L" && visibleSeats.length === 0) {
                    tempGrid2[y][x] = "#"
                    changesCount2++

                } else if (grid2[y][x] === "#" && visibleSeats.length >= 5) {
                    tempGrid2[y][x] = "L"
                    changesCount2++

                } else tempGrid2[y][x] = grid2[y][x]
            }
        }
    }
    grid1 = tempGrid1
    grid2 = tempGrid2
}

// Part 1
console.log(`Part 1 answer: ${grid1.flat().filter(elem => elem === "#").length}`) // 2427


// Part 2
console.log(`Part 2 answer: ${grid2.flat().filter(elem => elem === "#").length}`) // 2199

// Worst puzzle for now