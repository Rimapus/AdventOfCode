const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(", ")
    .map(elem => [elem[0], +elem.slice(1)]);


console.log("AoC 2016 Day 1:");

const position = [0, 0]; // x, y
let forward = 0; // 0 = N, 1 = E, 2 = S, 3 = W
const positionHistory = [];
let answer2;
input.forEach(elem => {
    switch (elem[0]) {
        case "L":
            forward = ((forward - 1) + 4) % 4;
            break;

        case "R":
            forward = (forward + 1) % 4;
            break;
    }

    for (let i = 0; i < elem[1]; i++) {
        position[forward % 2] += [1, 2].includes(forward) ? -1 : 1;

        if (!answer2 && positionHistory.includes(position.join())) {
            answer2 = Math.abs(position[0]) + Math.abs(position[1]);
        }
        positionHistory.push(position.join());
    }
});

// Part 1
console.log(`Part 1 answer: ${Math.abs(position[0]) + Math.abs(position[1])}`); // 298


// Part 2
console.log(`Part 2 answer: ${answer2}`); // 158
