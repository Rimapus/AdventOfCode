const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n/).map(elem => elem.split(""));


console.log("AoC 2024 Day 6:");

const directions = ["0,-1", "1,0", "0,1", "-1,0"]; // up, down, left right
const mapSize = [input[0].length, input.length];
let originalGuardPosition = [0, 0];
let guardPosition = [0, 0]; // x, y
let directionVector = [0, -1]; // x, y
let possibleObstructions = 0;

input.forEach((line, index) => {
    const guardX = line.findIndex(pos => pos === "^");
    if (guardX !== -1) {
        guardPosition = [guardX, index];
        return;
    }
});
originalGuardPosition = [...guardPosition];

while (guardPosition[0] >= 0 && guardPosition[0] < mapSize[0] && 
    guardPosition[1] >= 0 && guardPosition[1] < mapSize[1]) {
        if (input[guardPosition[1]][guardPosition[0]] === (directions.findIndex(dir => dir === directionVector.join(",")) + 1) % 4)
            possibleObstructions++;

        input[guardPosition[1]][guardPosition[0]] = directions.findIndex(dir => dir === directionVector.join(","));
        const newPosition = [guardPosition[0] + directionVector[0], guardPosition[1] + directionVector[1]];

        if (newPosition[0] < 0 || newPosition[0] >= mapSize[0] || 
            newPosition[1] < 0 || newPosition[1] >= mapSize[1]) break;
        
        const newCase = input[newPosition[1]][newPosition[0]];

        if (newCase === "#") {
            directionVector = [-directionVector[1], directionVector[0]];
            continue;
        }
        guardPosition = newPosition;
}

// Part 1
const visitedCount = input.reduce((a, b) => a + b.filter(c => c !== "." && c !== "#").length, 0);
console.log(`Part 1 answer: ${visitedCount}`); // 4982


// Part 2
input.map(line => console.log(line.join("")));

console.log(`Part 2 answer: ${possibleObstructions}`); // 