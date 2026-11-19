const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n/);


console.log("AoC 2021 Day 3:");

// Part 1
let gammaRate = "", epsilonRate = "";
for (let i = 0; i < input[0].length; i++) {
    const bitsList = input.map(elem => elem.charAt(i));
    gammaRate += bitsList.filter(e => e === "0").length > bitsList.length / 2 ? "0" : "1";
}
epsilonRate = gammaRate.split("").map(elem => elem === "0" ? "1" : "0").join("");

console.log(`Part 1 answer: ${parseInt(gammaRate, 2) * parseInt(epsilonRate, 2)}`); // 3374136


// Part 2
let tempInput1 = JSON.parse(JSON.stringify(input));
let tempInput2 = JSON.parse(JSON.stringify(input));
for (let i = 0; i < input[0].length; i++) {
    const mostCommon = tempInput1.filter(e => e.charAt(i) === "0").length > tempInput1.length / 2 ? "0" : "1";
    const leastCommon = tempInput2.filter(e => e.charAt(i) === "0").length <= tempInput2.length / 2 ? "0" : "1";

    tempInput1 = tempInput1.length === 1 ? tempInput1 : tempInput1.filter(elem => elem.charAt(i) === mostCommon);
    tempInput2 = tempInput2.length === 1 ? tempInput2 : tempInput2.filter(elem => elem.charAt(i) === leastCommon);
}

console.log(`Part 2 answer: ${parseInt(tempInput1[0], 2) * parseInt(tempInput2[0], 2)}`); // 4432698
