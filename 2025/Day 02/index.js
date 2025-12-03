const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(",").map(elem => elem.split("-").map(Number));


console.log("AoC 2025 Day 2:");

let invalidsSum1 = 0, invalidsSum2 = 0;
for (const range of input) {
    for (let id = range[0]; id <= range[1]; id++) {
        const idString = String(id);
        const midpoint = idString.length / 2;

        if (midpoint % 1 === 0 &&
            idString.slice(0, midpoint) === idString.slice(midpoint))
            invalidsSum1 += id;

        for (let i = 1; i <= midpoint; i++) {
            if ((idString.length / i) % 1 !== 0) continue;

            const pattern = idString.slice(0, i).repeat(Math.ceil(idString.length / i));
            if (idString === pattern) {
                invalidsSum2 += id;
                break;
            }
        }
    }
}

// Part 1
console.log(`Part 1 answer: ${invalidsSum1}`); // 12599655151


// Part 2
console.log(`Part 2 answer: ${invalidsSum2}`); // 20942028255