const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n/)
    .map(elem => elem.split(" | ").map(elem1 => elem1.split(" ")));


console.log("AoC 2021 Day 8:");

// Part 1
let easyDigits = 0;
input.forEach(elem => {
    elem[1].forEach(elem1 => {
        if ([2, 4, 3, 7].includes(elem1.length)) {
            easyDigits++;
        }
    });
});
console.log(`Part 1 answer: ${easyDigits}`); // 278


// Part 2
let sum = 0;
input.forEach(elem => {
    let value = "";
    // Thx to https://github.com/luskan/adventofcode2021JS/blob/master/day8/solution.js for the walkthrough

    const mapping = { a: "", b: "", c: "", d: "", e: "", f: "", g: "" };

    const one = elem[0].filter(e => e.length === 2)[0].split("");
    const four = elem[0].filter(e => e.length === 4)[0].split("");
    const seven = elem[0].filter(e => e.length === 3)[0].split("");
    const eight = elem[0].filter(e => e.length === 7)[0].split("");

    // segA is present in 7 but not in 1
    mapping["a"] = seven.filter(e => !one.includes(e))[0];

    // digit6 has a length of 6 and has no segC from digit1
    const six = elem[0].filter(e => e.length === 6 && e.split("").filter(e1 => one.includes(e1)).length === 1)[0].split("");

    // segC is present in 1 but not in 6
    mapping["c"] = one.filter(e => !six.includes(e))[0];

    // segF is present in 1 but not in 6
    mapping["f"] = one.filter(e => e !== mapping["c"])[0];

    // digit3 has a length of 5 and has a length of 2 after removing segA, segC and segF
    const three = elem[0].filter(e => e.length === 5 && e.split("").filter(e1 => ![mapping["a"], mapping["c"], mapping["f"]].includes(e1)).length === 2)[0].split("");

    // segD is common to digit3 and digit4 after removing segA, segC and segF
    mapping["d"] = three.filter(e => ![mapping["a"], mapping["c"], mapping["f"]].includes(e) && four.includes(e))[0];

    // segG is the only one left in digit3 after removing all known segments
    mapping["g"] = three.filter(e => !Object.values(mapping).includes(e))[0];

    // segB is the only one left in digit4 after removing all known segments
    mapping["b"] = four.filter(e => !Object.values(mapping).includes(e))[0];

    // segB is the only one left in digit4 after removing all known segments
    mapping["e"] = eight.filter(e => !Object.values(mapping).includes(e))[0];

    // Its easy to build all left digits
    const two = [mapping["a"], mapping["c"], mapping["d"], mapping["e"], mapping["g"]];
    const five = [mapping["a"], mapping["b"], mapping["d"], mapping["f"], mapping["g"]];
    const nine = [mapping["a"], mapping["b"], mapping["c"], mapping["d"], mapping["f"], mapping["g"]];
    const zero = [mapping["a"], mapping["b"], mapping["c"], mapping["e"], mapping["f"], mapping["g"]];

    const digits = [zero, one, two, three, four, five, six, seven, eight, nine].map(e => e.sort().join(""));

    elem[1].forEach(elem => {
        value += digits.findIndex(e => e === elem.split("").sort().join(""));
    });

    sum += +value;
});
console.log(`Part 2 answer: ${sum}`); // 986179
