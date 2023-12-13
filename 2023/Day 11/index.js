const fs = require("fs")
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8")

input = input.split(/\r?\n/).map(elem => elem.split(""))


console.log("AoC 2023 Day 11:")


function getAnswer(expansionLevel, input) {

    const emptyRowsIndex = input.map((line, i) => line.every(e => e === ".") ? i : null).filter(e => e)

    const verticalOffsets = {}
    let rowOffset = 0
    for (let i = 0; i < emptyRowsIndex.length; i++) {
        const index = emptyRowsIndex[i]
        verticalOffsets[index] = (Object.values(verticalOffsets).at(-1) || 0) + expansionLevel - 1
        rowOffset++
    }


    const columns = []
    for (let col = 0; col < input[0].length; col++) {
        columns.push(input.map(e => e[col]))
    }
    const emptyColumnsIndex = columns.map((column, i) => column.every(e => e === ".") ? i : null).filter(e => e)

    const horizontalOffsets = {}
    let columnOffset = 0
    for (let i = 0; i < emptyColumnsIndex.length; i++) {
        const index = emptyColumnsIndex[i]
        horizontalOffsets[index] = (Object.values(horizontalOffsets).at(-1) || 0) + expansionLevel - 1
        columnOffset++
    }


    const galaxies = []
    input.forEach((line, j) => {
        line.forEach((cell, i) => {
            if (cell === "#") galaxies.push([i, j])
        })
    })


    let distanceSum = 0
    galaxies.forEach((galaxy1, i) => {
        galaxies.slice(i + 1).forEach(galaxy2 => {
            if (galaxy1.join(", ") !== galaxy2.join(", ")) {

                const glx1XOffset = Object.entries(horizontalOffsets).reverse().find(e => galaxy1[0] > +e[0])?.[1] || 0
                const glx2XOffset = Object.entries(horizontalOffsets).reverse().find(e => galaxy2[0] > +e[0])?.[1] || 0

                const glx1YOffset = Object.entries(verticalOffsets).reverse().find(e => galaxy1[1] > +e[0])?.[1] || 0
                const glx2YOffset = Object.entries(verticalOffsets).reverse().find(e => galaxy2[1] > +e[0])?.[1] || 0

                const realGlx1 = [galaxy1[0] + glx1XOffset, galaxy1[1] + glx1YOffset]
                const realGlx2 = [galaxy2[0] + glx2XOffset, galaxy2[1] + glx2YOffset]

                distanceSum += Math.abs(realGlx2[0] - realGlx1[0]) + Math.abs(realGlx2[1] - realGlx1[1])
            }
        })
    })

    return distanceSum
}

// Part 1
console.log(`Part 1 answer: ${getAnswer(2, input)}`) // 9591768


// Part 2
console.log(`Part 2 answer: ${getAnswer(1000000, input)}`) // 746962097860