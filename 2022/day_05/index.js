const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n/);
const startingStacksCount = +input[input.indexOf("") - 1].charAt(input[input.indexOf("") - 1].length - 2);
const procedure = input.filter(elem => elem.startsWith("move"));

const stacks = new Array(startingStacksCount).fill([]);
for (let i = 0; i < startingStacksCount; i++) {
    input.slice(0, input.indexOf("") - 1).forEach(elem => {
        if (elem[i * 4 + 1].trim() !== "") {
            stacks[i] = stacks[i].concat(elem[i * 4 + 1].trim());
        }
    });
}

const stacks1 = JSON.parse(JSON.stringify(stacks));
const stacks2 = JSON.parse(JSON.stringify(stacks));
procedure.forEach(elem => {
    elem = elem.split(" ");
    const [movingStacksCount, from, to] = [+elem[1], +elem[3], +elem[5]];
    
    const movingStacks1 = stacks1[from-1].splice(0, movingStacksCount).reverse();
    stacks1[to-1].unshift(...movingStacks1);
    const movingStacks2 = stacks2[from-1].splice(0, movingStacksCount);
    stacks2[to-1].unshift(...movingStacks2);
});


console.log("AoC 2022 Day 5:");

// Part 1
console.log(`Part 1 answer: ${stacks1.reduce((a, b) => a+b[0], "")}`); // JCMHLVGMG


// Part 2
console.log(`Part 2 answer: ${stacks2.reduce((a, b) => a+b[0], "")}`); // LVMRWSSPZ
