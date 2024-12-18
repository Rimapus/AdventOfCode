const fs = require("fs")
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8")

input = input.split("")


console.log("AoC 2018 Day 5:")

function reactPolymer(input) {
    let i = 0;
    while (i < input.length - 1) {
        if (input[i] == input[i].toLowerCase() && input[i + 1] == input[i].toUpperCase() ||
            input[i] == input[i].toUpperCase() && input[i + 1] == input[i].toLowerCase()) {
            input.splice(i, 2);
            if (i > 0)
                i--;
            continue;
        }
        i++;
    }
    return input;
}

// Part 1
console.log(`Part 1 answer: ${reactPolymer(input).length}`) // 9288


// Part 2
let alphabet = [...Array(26)].map((_, i) => String.fromCharCode(i + 97));
let shortestLength = Infinity;

let tempInput = [...input].join("");
alphabet.forEach(letter => {
    tempInput = tempInput.replace(new RegExp(`${letter}`, "gi"), "");
    shortestLength = Math.min(shortestLength, reactPolymer(tempInput.split("")).length);
    tempInput = [...input].join("");
})
console.log(`Part 2 answer: ${shortestLength}`) // 5844