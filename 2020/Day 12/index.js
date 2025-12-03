const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n/)
    .map(elem => [elem[0], +elem.slice(1)]);


console.log("AoC 2020 Day 12:");

let shipPosition1 = [0, 0]; // x, y
let shipForward = 0; // 0 = E, 1 = S, 2 = W, 3 = N

let shipPosition2 = [0, 0]; // x, y
let waypointPosition = [10, 1]; // Relative to the ship
input.forEach(elem => {
    const turns = (elem[1] / 90);

    switch (elem[0]) {
        case "N":
            shipPosition1[1] += elem[1];
            waypointPosition[1] += elem[1];
            break;

        case "S":
            shipPosition1[1] -= elem[1];
            waypointPosition[1] -= elem[1];
            break;

        case "E":
            shipPosition1[0] += elem[1];
            waypointPosition[0] += elem[1];
            break;

        case "W":
            shipPosition1[0] -= elem[1];
            waypointPosition[0] -= elem[1];
            break;

        case "L":
            shipForward = ((shipForward - turns) + 4) % 4;
            for (let i = 0; i < turns; i++) {
                const newX = -waypointPosition[1];
                const newY = waypointPosition[0];
                waypointPosition[0] = newX;
                waypointPosition[1] = newY;
            }
            break;

        case "R":
            shipForward = (shipForward + turns) % 4;
            for (let i = 0; i < turns; i++) {
                const newX = waypointPosition[1];
                const newY = -waypointPosition[0];
                waypointPosition[0] = newX;
                waypointPosition[1] = newY;
            }
            break;

        case "F":
            shipPosition1[shipForward % 2] += [1, 2].includes(shipForward) ? -elem[1] : elem[1];
            shipPosition2.forEach((_, i, t) => t[i] += (elem[1] * waypointPosition[i]));
            break;
    }
});

// Part 1
console.log(`Part 1 answer: ${Math.abs(shipPosition1[0]) + Math.abs(shipPosition1[1])}`); // 508


// Part 2
console.log(`Part 2 answer: ${Math.abs(shipPosition2[0]) + Math.abs(shipPosition2[1])}`); // 30761