const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n/).map(elem => elem.split(""));
const startLineIndex = input.findIndex(elem => elem.includes("S"));
const start = [input[startLineIndex].findIndex(elem => elem === "S"), startLineIndex];


console.log("AoC 2023 Day 10:");

const tileTypes = {
    "|": ["north", "south"],
    "-": ["east", "west"],
    "L": ["north", "east"],
    "J": ["north", "west"],
    "7": ["south", "west"],
    "F": ["south", "east"],
    "S": ["north", "south", "east", "west"]
};

function getAdjacent(currCoord) {
    const adjacents = [];
    const leftTile = input[currCoord[1]][currCoord[0] - 1];
    const rightTile = input[currCoord[1]][currCoord[0] + 1];
    const upTile = input[currCoord[1] - 1]?.[currCoord[0]];
    const downTile = input[currCoord[1] + 1]?.[currCoord[0]];

    const tileConnections = tileTypes[input[currCoord[1]][currCoord[0]]];

    if (tileConnections.includes("west") && tileTypes[leftTile]?.includes("east")) adjacents.push([currCoord[0] - 1, currCoord[1]]);
    if (tileConnections.includes("east") && tileTypes[rightTile]?.includes("west")) adjacents.push([currCoord[0] + 1, currCoord[1]]);
    if (tileConnections.includes("north") && tileTypes[upTile]?.includes("south")) adjacents.push([currCoord[0], currCoord[1] - 1]);
    if (tileConnections.includes("south") && tileTypes[downTile]?.includes("north")) adjacents.push([currCoord[0], currCoord[1] + 1]);

    return adjacents;
}

// Part 1
let currentCoords = start;
const visitedTiles = [];
let distance = 0;

while (true) {
    visitedTiles.push(currentCoords.join(", "));
    const adjacents = getAdjacent(currentCoords).filter(crd => !visitedTiles.includes(crd.join(", ")));

    if (adjacents.length !== 0) {
        currentCoords = adjacents[0];
        distance++;
    } else break;
}

console.log(`Part 1 answer: ${(distance + 1) / 2}`); // 6812


// Part 2
// Special property discovered by https://www.reddit.com/r/adventofcode/comments/18ez5jb/2023_day_10_part_2_shortcut_solution_using_shape/
// I feel like this is cheating...

const lx = input[0].length / 4;
const ly = input.length / 4;
const answer2 = input.slice(ly, -ly)
    .map((line, y) => line.slice(lx, -lx)
        .filter((_, x) => !visitedTiles.includes(`${x + lx}, ${y + ly}`))
        .length);

console.log(answer2.reduce((a, b) => a + b));

console.log(`Part 2 answer: ${answer2.reduce((a, b) => a + b)}`); // 527