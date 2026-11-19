const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n/)
    .map(elem => elem.split("").map(Number));


console.log("AoC 2021 Day 9:");

// Part 1
let riskLevels = 0;
const lowPoints = [];
for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
        // Up, down, left, right
        const adjacents = [input[y - 1]?.[x], input[y + 1]?.[x], input[y][x - 1], input[y][x + 1]].filter(e => !isNaN(e));
        if (adjacents.every(e => input[y][x] < e)) {
            riskLevels += input[y][x] + 1;
            lowPoints.push([y, x]);
        }
    }
}

console.log(`Part 1 answer: ${riskLevels}`); // 468


// Part 2
const basins = {};
const basinLocations = {};

lowPoints.forEach(elem => {
    basins[[elem[0], elem[1]]] = [[elem[0] - 1, elem[1]], [elem[0] + 1, elem[1]], [elem[0], elem[1] - 1], [elem[0], elem[1] + 1]];
    basinLocations[[elem[0], elem[1]]] = [`${elem[0]},${elem[1]}`];
});

while (!Object.values(basins).every(elem => elem.every(elem1 => elem1 === undefined))) {

    Object.entries(basins).forEach(elem => {
        elem[1].forEach((elem1, i) => {
            if (!isNaN(input[elem1[0]]?.[elem1[1]]) && input[elem1[0]][elem1[1]] !== 9) {
                // Actual spot confirmed
                if (!basinLocations[elem[0]].includes(`${elem1[0]},${elem1[1]}`)) basinLocations[elem[0]].push(`${elem1[0]},${elem1[1]}`);

                const adjacents = [[elem1[0] - 1, elem1[1]], [elem1[0] + 1, elem1[1]], [elem1[0], elem1[1] - 1], [elem1[0], elem1[1] + 1]];
                basins[elem[0]].push(...adjacents.filter(e => input[e[0]]?.[e[1]] > input[elem1[0]][elem1[1]]));

            }
            delete basins[elem[0]][i];
        });
    });
}

console.log(`Part 2 answer: ${Object.values(basinLocations).map(e => e.length).sort((a, b) => b - a).slice(0, 3).reduce((a, b) => a * b)}`); // 1280496
