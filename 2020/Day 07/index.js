const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n/)
    .map(elem => [
        elem.split("bags contain")[0].trim(),
        elem.split("bags contain")[1]
            .split(",")
            .map(elem1 => {
                elem1 = elem1.trim();
                return [+elem1.slice(0, elem1.indexOf(' ') + 1), elem1.slice(elem1.indexOf(' ') + 1).split(" ", 2).join(" ")];
            })
    ]);


console.log("AoC 2020 Day 7:");

// Part 1
let validBags = [];
let toExplore = ["shiny gold"];
while (toExplore.length !== 0) {
    toExplore.forEach(elem => {
        input.forEach(elem1 => {
            if (elem1[1].find(elem2 => elem2[1] === elem)) {
                validBags.push(elem1[0]);
                toExplore.push(elem1[0]);
            }
        });
        toExplore = toExplore.slice(1, toExplore.length);
    });
}

console.log(`Part 1 answer: ${new Set(validBags).size}`); // 222


// Part 2
let numberOfBag = 0;
toExplore = [[1, "shiny gold"]];
while (toExplore.length !== 0) {
    toExplore.forEach(elem => {
        input.find(elem1 => elem1[0] === elem[1])[1].forEach(elem2 => {
            for (let i = 0; i < elem2[0]; i++) {
                toExplore.push(elem2);
            }
        });
        
        let newNumberOfBag = input.find(elem1 => elem1[0] === elem[1])[1].reduce((a, b) => a + b[0], 0);
        if (!isNaN(newNumberOfBag)) numberOfBag += newNumberOfBag;
        toExplore = toExplore.slice(1, toExplore.length);
    });
}
console.log(`Part 2 answer: ${numberOfBag}`); // 13264