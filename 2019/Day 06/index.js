const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n/)
    .map(elem => elem.split(")"));


console.log("AoC 2019 Day 6:");

// Part 1
const orbits = {};
input.forEach(orbit => {
    orbits[orbit[1]] = orbit[0];
});

const countOrbits = (obj) => {
    if (orbits[obj] === "COM") return 1;
    return 1 + countOrbits(orbits[obj]);
};

const orbitSum = Object.keys(orbits).reduce((a, b) => a + countOrbits(b), 0);

console.log(`Part 1 answer: ${orbitSum}`); // 295834


// Part 2
const pathsToCOM = {};
const focussedObjects = ["YOU", "SAN"];

focussedObjects.forEach(obj => {
    pathsToCOM[obj] = [];
    let currObj = obj;

    while (currObj !== "COM") {
        currObj = orbits[currObj];
        pathsToCOM[obj].push(currObj);
    }
});

const commonObject = pathsToCOM["YOU"].find(obj => pathsToCOM["SAN"].includes(obj));
let transfersCount = 0;
for (const path of Object.values(pathsToCOM)) {
    transfersCount += path.indexOf(commonObject);
}

console.log(`Part 2 answer: ${transfersCount}`); // 361
