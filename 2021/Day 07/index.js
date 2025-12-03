const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(",")
    .map(Number);


console.log("AoC 2021 Day 7:");

let fuelCosts1 = [];
let fuelCosts2 = [];
for (let i = Math.min(...input); i < Math.max(...input); i++) {
    let fuelCost1 = 0;
    let fuelCost2 = 0;
    input.forEach(elem1 => {
        fuelCost1 += Math.abs(i - elem1);
        fuelCost2 += (Math.abs(i - elem1) * (Math.abs(i - elem1) + 1)) / 2; // Thx Carl Friedrich Gauss ^^
    });
    fuelCosts1.push(fuelCost1);
    fuelCosts2.push(fuelCost2);
}

// Part 1
console.log(`Part 1 answer: ${Math.min(...fuelCosts1)}`); // 348664


// Part 2
console.log(`Part 2 answer: ${Math.min(...fuelCosts2)}`); // 100220525