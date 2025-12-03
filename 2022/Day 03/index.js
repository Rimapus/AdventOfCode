const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n/);

const alphabet = [...Array(52)].map((_, i) => String.fromCharCode(i + (i < 26 ? 97 : 39)));


console.log("AoC 2022 Day 3:");

// Part 1
let commonItems = [];
input.forEach(elem => {
    elem = [elem.substring(0, elem.length / 2), elem.substring(elem.length / 2).split("")];
    for (let elem1 of elem[0]) {
        if (elem[1].includes(elem1)) {
            commonItems.push(elem1);
            return;
        }
    }
});
commonItems.forEach((elem, i, arr) => arr[i] = alphabet.indexOf(elem) + 1);

console.log(`Part 1 answer: ${commonItems.reduce((a, b) => a + b, 0)}`); // 7917


// Part 2
let groupsBadge = [];
for (let i = 0; i < input.length; i += 3) {
    let group = Object.values(input.slice(i, i + 3).map(elem => elem.split("")));
    group.sort((a, b) => b.length - a.length);
    for (let j = 0; j < group[0].length; j++) {
        if (group[1].includes(group[0][j]) && group[2].includes(group[0][j])) {
            groupsBadge.push(group[0][j]);
            break;
        }
    }
}
groupsBadge.forEach((elem, i, arr) => arr[i] = alphabet.indexOf(elem) + 1);

console.log(`Part 2 answer: ${groupsBadge.reduce((a, b) => a + b, 0)}`); // 2585