const fs = require("fs")
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8")

input = +input

console.log("AoC 2017 Day 3:")

// Part 1
let squareSize = 1;
while (Math.pow(squareSize, 2) < input)
    squareSize++;
if (squareSize % 2 != 1)
    squareSize++;

let grid = JSON.parse(JSON.stringify(new Array(squareSize).fill(new Array(squareSize).fill(0))));
let x = Math.floor(squareSize / 2);
let y = Math.floor(squareSize / 2);
let value = 1;

// Thanks https://stackoverflow.com/a/32672170 for the track
let xDiffs = [1, 0, -1, 0],  // East, north, west, south
    yDiffs = [0, -1, 0, 1];
let orientation = 0; // Starting east

while (value != input) {
    grid[y][x] = value;
    x += xDiffs[orientation];
    y += yDiffs[orientation];
    if (grid[y + yDiffs[(orientation + 1) % 4]][x + xDiffs[(orientation + 1) % 4]] == 0) {
        orientation += 1;
        orientation %= 4;
    }
    value++;
}
let distanceToStart = Math.abs(x - Math.floor(squareSize / 2)) + Math.abs(y - Math.floor(squareSize / 2));
console.log(`Part 1 answer: ${distanceToStart}`) // 326


// Part 2
function getNeighborSum(grid, x, y) {
    let sum = 0;
    sum += grid[y - 1]?.[x - 1] || 0;
    sum += grid[y - 1]?.[x] || 0;
    sum += grid[y - 1]?.[x + 1] || 0;
    sum += grid[y]?.[x - 1] || 0;
    sum += grid[y]?.[x + 1] || 0;
    sum += grid[y + 1]?.[x - 1] || 0;
    sum += grid[y + 1]?.[x] || 0;
    sum += grid[y + 1]?.[x + 1] || 0;
    if (sum == 0)
        sum = 1;
    return sum;
}

grid = JSON.parse(JSON.stringify(new Array(squareSize).fill(new Array(squareSize).fill(0))));
x = Math.floor(squareSize / 2);
y = Math.floor(squareSize / 2);
value = 1;
orientation = 0;

while (value <= input) {
    value = getNeighborSum(grid, x, y);
    grid[y][x] = value;
    x += xDiffs[orientation];
    y += yDiffs[orientation];
    if (grid[y + yDiffs[(orientation + 1) % 4]][x + xDiffs[(orientation + 1) % 4]] == 0) {
        orientation += 1;
        orientation %= 4;
    }
}
console.log(`Part 2 answer: ${value}`) // 363010