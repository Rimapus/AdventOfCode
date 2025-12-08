const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n/).map(elem => elem.split(",").map(Number));


console.log("AoC 2025 Day 8:");

function getDistance(point1, point2) {
    return Math.sqrt(
        Math.pow((point1[0] - point2[0]), 2) +
        Math.pow((point1[1] - point2[1]), 2) +
        Math.pow((point1[2] - point2[2]), 2)
    );
}

let connections = [];
for (let point1Index = 0; point1Index < input.length; point1Index++) {
    for (let point2Index = point1Index + 1; point2Index < input.length; point2Index++) {
        const point1 = input[point1Index];
        const point2 = input[point2Index];
        connections.push([[point1, point2], getDistance(point1, point2)]);
    }
}
connections = connections.sort((a, b) => a[1] - b[1]);

const circuits = [];
let answer1 = 0, answer2 = 0;
for (let connectionIndex = 0; true; connectionIndex++) {
    const point1 = connections[connectionIndex][0][0];
    const point2 = connections[connectionIndex][0][1];

    const point1FoundCircuitIndex = circuits.findIndex(circuit => circuit.map(JSON.stringify).includes(JSON.stringify(point1)));
    const point2FoundCircuitIndex = circuits.findIndex(circuit => circuit.map(JSON.stringify).includes(JSON.stringify(point2)));

    if (point1FoundCircuitIndex !== -1 && point1FoundCircuitIndex === point2FoundCircuitIndex) continue;

    const oldCircuitsLength = circuits.length;
    if (point1FoundCircuitIndex !== -1 && point2FoundCircuitIndex !== -1) {
        circuits[point1FoundCircuitIndex] = circuits[point1FoundCircuitIndex].concat(circuits[point2FoundCircuitIndex]);
        circuits.splice(point2FoundCircuitIndex, 1);
    } else if (point1FoundCircuitIndex !== -1 && point2FoundCircuitIndex === -1)
        circuits[point1FoundCircuitIndex].push(point2);
    else if (point1FoundCircuitIndex === -1 && point2FoundCircuitIndex !== -1)
        circuits[point2FoundCircuitIndex].push(point1);
    else
        circuits.push([point1, point2]);

    if (circuits.length < oldCircuitsLength && circuits.length === 1) {
        answer2 = point1[0] * point2[0];
        break;
    }

    if (connectionIndex === 999) {
        let allCircuits = circuits.concat(input.filter(box => !circuits.some(circuit => circuit.map(JSON.stringify).includes(JSON.stringify(box)))).map(box => [box]));
        allCircuits = allCircuits.sort((a, b) => b.length - a.length);
        answer1 = allCircuits.map(circuit => circuit.length).slice(0, 3).reduce((a, b) => a * b);
    }
}

// Part 1
console.log(`Part 1 answer: ${answer1}`); // 117000


// Part 2
console.log(`Part 2 answer: ${answer2}`); // 8368033065