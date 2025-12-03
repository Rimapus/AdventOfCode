const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n/).map(elem => elem.split('').map(Number));


console.log("AoC 2022 Day 8:");

// Part 1
let visibleTrees = (input.length * 2) + ((input[0].length - 2) * 2);
for (let i = 1; i < input.length - 1; i++) {
    for (let j = 1; j < input[i].length - 1; j++) {
        // Probably a MUCH better way to do this...
        if (
            [...input[i].slice(0, j)].every(elem => elem < input[i][j]) || // From left
            [...input[i].slice(j + 1)].every(elem => elem < input[i][j]) || // From right
            [...input.slice(0, i).map(elem => elem[j])].every(elem => elem < input[i][j]) || // From up
            [...input.slice(i + 1).map(elem => elem[j])].every(elem => elem < input[i][j]) // From down
        ) visibleTrees++;
    }
}

console.log(`Part 1 answer: ${visibleTrees}`); // 1733


// Part 2
let viewingDistances = [];
for (let i = 1; i < input.length - 1; i++) {
    for (let j = 1; j < input[i].length - 1; j++) {
        let treeViewingDistances = [0, 0, 0, 0];

        [...input[i].slice(0, j)].reverse().every(elem => {
            treeViewingDistances[0]++;
            if (elem >= input[i][j]) return false;
            return true;
        });

        [...input[i].slice(j + 1)].every(elem => {
            treeViewingDistances[1]++;
            if (elem >= input[i][j]) return false;
            return true;
        });

        [...input.slice(0, i).map(elem => elem[j])].reverse().every(elem => {
            treeViewingDistances[2]++;
            if (elem >= input[i][j]) return false;
            return true;
        });

        [...input.slice(i + 1).map(elem => elem[j])].every(elem => {
            treeViewingDistances[3]++;
            if (elem >= input[i][j]) return false;
            return true;
        });

        viewingDistances.push(treeViewingDistances.reduce((a, b) => a * b, 1));
    }
}

console.log(`Part 2 answer: ${Math.max(...viewingDistances)}`); // 284648