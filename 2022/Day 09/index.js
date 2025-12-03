const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n/).map(elem => [elem.split(' ')[0], +elem.split(' ')[1]]);
let ropes = [[...Array(2)].map(() => [0, 0]), [...Array(10)].map(() => [0, 0])];
let tailsVisitedPositions = [[], []];

for (const line of input) {
    let directions = { 'L': 0, 'R': 0, 'U': 0, 'D': 0 };
    directions[line[0]] += line[1];
    let movements = [directions['R'] - directions['L'], directions['U'] - directions['D']]; // x, y
    let activeMovementIdx = movements.findIndex((elem) => elem !== 0);
    let activeMovement = movements[activeMovementIdx];

    for (let i = 0; i < Math.abs(activeMovement); i++) {
        ropes.map(elem => elem[0][activeMovementIdx] += activeMovement / Math.abs(activeMovement));

        for (const ropeIndex in ropes) {
            let rope = ropes[ropeIndex];
            for (const knotIndex in rope) {
                let knot = rope[+knotIndex];
                if (+knotIndex === 0) continue;
                let distanceToPrevious = [rope[+knotIndex - 1][0] - knot[0], rope[+knotIndex - 1][1] - knot[1]];

                if (Math.abs(distanceToPrevious[0]) > 1 && Math.abs(distanceToPrevious[1]) >= 1)
                    knot.forEach((elem, i, arr) => arr[i] += +((distanceToPrevious[i] < 0 ? "-" : "") + 1));
                else if (Math.abs(distanceToPrevious[1]) > 1 && Math.abs(distanceToPrevious[0]) >= 1)
                    knot.forEach((elem, i, arr) => arr[i] += +((distanceToPrevious[i] < 0 ? "-" : "") + 1));
                else if (Math.abs(distanceToPrevious[0]) > 1)
                    knot[0] += +((distanceToPrevious[0] < 0 ? "-" : "") + 1);
                else if (Math.abs(distanceToPrevious[1]) > 1)
                    knot[1] += +((distanceToPrevious[1] < 0 ? "-" : "") + 1);

                if (+knotIndex === rope.length - 1)
                    tailsVisitedPositions[ropeIndex].push(knot.join(","));
            }
        }
    }
}


console.log("AoC 2022 Day 9:");

// Part 1
console.log(`Part 1 answer: ${new Set(tailsVisitedPositions[0]).size}`); // 5513


// Part 2
console.log(`Part 2 answer: ${new Set(tailsVisitedPositions[1]).size}`); // 2427