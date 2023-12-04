const fs = require("fs")
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8")

input = input.split(/\r?\n/)
    .map(elem => [
        Number(elem.split(": ")[0].split(" ")[1]),
        elem.split(": ")[1].split("; ")
            .map(elem3 => elem3.split(", ")
                .map(elem4 => [
                    Number(elem4.split(" ")[0]), elem4.split(" ")[1]
                ]
                )
            )       // Waw...
    ])


console.log("AoC 2023 Day 2:")

const maxes = {
    "red": 12,
    "green": 13,
    "blue": 14
}

let possibleGamesSum = 0, powerSum = 0

input.forEach(game => {
    let possible = true
    const maxCubes = {
        "red": 0,
        "green": 0,
        "blue": 0
    }

    game[1].flat().forEach(infos => {
        if (infos[0] > maxes[infos[1]]) possible = false
        if (infos[0] > maxCubes[infos[1]]) maxCubes[infos[1]] = infos[0]
    })

    if (possible) possibleGamesSum += game[0]
    powerSum += Object.values(maxCubes).reduce((a, b) => a * b, 1)
})

// Part 1
console.log(`Part 1 answer: ${possibleGamesSum}`) // 1853


// Part 2
console.log(`Part 2 answer: ${powerSum}`) // 72706