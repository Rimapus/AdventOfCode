const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n\r?\n/).map(elem => elem.split(/\r?\n/).map(elem1 => elem1.trim()));

let monkeys = Array(input.length);
for (let i = 0; i < input.length; i++) {
    let monkey = input[i];
    monkeys[i] = {
        items: monkey[1].split(/, | /).slice(2).map(Number),
        operation: monkey[2].split(' ').slice(4).join(''),
        test: {
            test: +monkey[3].split(' ').at(-1),
            true: +monkey[4].split(' ').at(-1),
            false: +monkey[5].split(' ').at(-1)
        }
    };
}
let monkeysPart1 = JSON.parse(JSON.stringify(monkeys));
let monkeysPart2 = JSON.parse(JSON.stringify(monkeys));


console.log("AoC 2022 Day 11:");

// Part 1
let monkeysBusiness1 = Array(input.length).fill(0);
for (let i = 0; i < 20; i++) {
    for (let j = 0; j < monkeysPart1.length; j++) {
        let monkey = monkeysPart1[j];
        monkeysBusiness1[j] += monkey.items.length;

        for (let k = 0; k < monkey.items.length; k++) {
            let item = monkey.items[k];
            let newItem = eval(`Math.floor((${item}${monkey.operation.replace('old', item)})/3)`);
            newItem % monkey.test.test === 0 ? monkeysPart1[monkey.test.true].items.push(newItem) : monkeysPart1[monkey.test.false].items.push(newItem);
        }
        monkey.items = [];
    }
}

console.log(`Part 1 answer: ${monkeysBusiness1.sort((a, b) => b - a).slice(0, 2).reduce((a, b) => a * b, 1)}`); // 78960


// Part 2
// https://www.reddit.com/r/adventofcode/comments/zih7gf/comment/izr79go/?utm_source=share&utm_medium=web2x&context=3
let superModulo = monkeysPart2.reduce((a, b) => a * b.test.test, 1);
let monkeysBusiness2 = Array(input.length).fill(0);
for (let i = 0; i < 10000; i++) {
    for (let j = 0; j < monkeysPart2.length; j++) {
        let monkey = monkeysPart2[j];
        monkeysBusiness2[j] += monkey.items.length;

        for (let k = 0; k < monkey.items.length; k++) {
            let item = monkey.items[k] % superModulo;
            let newItem = eval(`${item}${monkey.operation.replace('old', item)}`);
            newItem % monkey.test.test === 0 ? monkeysPart2[monkey.test.true].items.push(newItem) : monkeysPart2[monkey.test.false].items.push(newItem);
        }
        monkey.items = [];
    }
}

console.log(`Part 2 answer: ${monkeysBusiness2.sort((a, b) => b - a).slice(0, 2).reduce((a, b) => a * b, 1)}`); // 14561971968