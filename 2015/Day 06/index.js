const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n/).map(elem => elem.split(" "));

// JSON.parse etc... because it keep the same reference so if we modify one column all other are affected
const lightGrid = JSON.parse(JSON.stringify(new Array(1000).fill(new Array(1000).fill([0, 0]))));

for (let i = 0; i < input.length; i++) {
    const elem = input[i];
    const startCoords = elem[elem.length - 3].split(",").map(Number);
    const endCoords = elem[elem.length - 1].split(",").map(Number);

    for (let j = startCoords[1]; j <= endCoords[1]; j++) {
        for (let k = startCoords[0]; k <= endCoords[0]; k++) {
            if (elem[0] === "toggle") {
                lightGrid[j][k][0] = lightGrid[j][k][0] === 0 ? 1 : 0;
                lightGrid[j][k][1] += 2;
            } else if (elem[1] === "on") {
                lightGrid[j][k][0] = 1;
                lightGrid[j][k][1] += 1;
            } else {
                lightGrid[j][k][0] = 0;
                lightGrid[j][k][1] -= lightGrid[j][k][1] === 0 ? 0 : 1;
            }
        }
    }
}


console.log("AoC 2015 Day 6:");

// Part 1
let lightsOn = 0;
lightGrid.forEach(elem => {
    lightsOn += elem.filter(elem1 => elem1[0] === 1).length;
});

console.log(`Part 1 answer: ${lightsOn}`); // 543903


// Part 2
let totalBrightness = 0;
lightGrid.forEach(elem => {
    totalBrightness += elem.reduce((a, b) => a + b[1], 0);
});

console.log(`Part 2 answer: ${totalBrightness}`); // 14687245
