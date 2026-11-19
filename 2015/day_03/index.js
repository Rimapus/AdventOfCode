const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split("");


console.log("AoC 2015 Day 3:");

// Part 1
const currentLocation = [0, 0];
let visitedLocations = [];
visitedLocations.push("0,0");
input.forEach(elem => {
    if (elem === "^") currentLocation[1]++;
    else if (elem === "v") currentLocation[1]--;
    else if (elem === ">") currentLocation[0]++;
    else if (elem === "<") currentLocation[0]--;
    visitedLocations.push(currentLocation.join(","));
});
console.log(`Part 1 answer: ${new Set(visitedLocations).size}`); // 2565


// Part 2
const currentLocation1 = [0, 0];
const currentLocation2 = [0, 0];
visitedLocations = [];
visitedLocations.push("0,0");

input.forEach((elem, i) => {
    if ((i + 1) % 2 !== 0) {
        if (elem === "^") currentLocation1[1]++;
        else if (elem === "v") currentLocation1[1]--;
        else if (elem === ">") currentLocation1[0]++;
        else if (elem === "<") currentLocation1[0]--;
        visitedLocations.push(currentLocation1.join(","));
    } else {
        if (elem === "^") currentLocation2[1]++;
        else if (elem === "v") currentLocation2[1]--;
        else if (elem === ">") currentLocation2[0]++;
        else if (elem === "<") currentLocation2[0]--;
        visitedLocations.push(currentLocation2.join(","));
    }
});
console.log(`Part 2 answer: ${new Set(visitedLocations).size}`); // 2639
