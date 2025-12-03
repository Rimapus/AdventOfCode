const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n/).map(elem => elem.split(""));


console.log("AoC 2024 Day 4:");

// Part 1
function countXMAS(input, j, i) { // Ugly af but it works
    let counter = 0;
    if (j >= 3 && input[j][i] + input[j - 1][i] + input[j - 2][i] + input[j - 3][i] === "XMAS")
        counter++; // UP
    if (i <= input[0].length - 4 && j >= 3 && input[j][i] + input[j - 1][i + 1] + input[j - 2][i + 2] + input[j - 3][i + 3] === "XMAS")
        counter++; // UP-RIGHT
    if (i <= input[0].length - 4 && input[j][i] + input[j][i + 1] + input[j][i + 2] + input[j][i + 3] === "XMAS")
        counter++; // RIGHT
    if (i <= input[0].length - 4 && j <= input.length - 4 && input[j][i] + input[j + 1][i + 1] + input[j + 2][i + 2] + input[j + 3][i + 3] === "XMAS")
        counter++; // DOWN-RIGHT
    if (j <= input.length - 4 && input[j][i] + input[j + 1][i] + input[j + 2][i] + input[j + 3][i] === "XMAS")
        counter++; // DOWN
    if (i >= 3 && j <= input.length - 4 && input[j][i] + input[j + 1][i - 1] + input[j + 2][i - 2] + input[j + 3][i - 3] === "XMAS")
        counter++; // DOWN-LEFT
    if (i >= 3 && input[j][i] + input[j][i - 1] + input[j][i - 2] + input[j][i - 3] === "XMAS")
        counter++; // LEFT
    if (i >= 3 && j >= 3 && input[j][i] + input[j - 1][i - 1] + input[j - 2][i - 2] + input[j - 3][i - 3] === "XMAS")
        counter++; // UP-LEFT
    return counter;
}

let XMASCounter = 0;
for (let j = 0; j < input.length; j++) {
    for (let i = 0; i < input[0].length; i++) {
        if (input[j][i] === "X")
            XMASCounter += countXMAS(input, j, i);
    }
}
console.log(`Part 1 answer: ${XMASCounter}`); // 2500


// Part 2
function countX_MAS(input, j, i) { // Less ugly but still...
    let counter = 0;
    if (i > input[0].length - 3 || j > input.length - 3)
        return 0;

    switch (input[j][i]) {
        case "M":
            if (input[j][i + 2] === "S" && input[j + 1][i + 1] === "A" && input[j + 2][i] === "M" && input[j + 2][i + 2] === "S")
                counter++;
            if (input[j][i + 2] === "M" && input[j + 1][i + 1] === "A" && input[j + 2][i] === "S" && input[j + 2][i + 2] === "S")
                counter++;
            break;
        case "S":
            if (input[j][i + 2] === "S" && input[j + 1][i + 1] === "A" && input[j + 2][i] === "M" && input[j + 2][i + 2] === "M")
                counter++;
            if (input[j][i + 2] === "M" && input[j + 1][i + 1] === "A" && input[j + 2][i] === "S" && input[j + 2][i + 2] === "M")
                counter++;
            break;
    }
    return counter;
}
let X_MASCounter = 0;
for (let j = 0; j < input.length; j++) {
    for (let i = 0; i < input[0].length; i++) {
        if (input[j][i] === "M" || input[j][i] === "S")
            X_MASCounter += countX_MAS(input, j, i);
    }
}
console.log(`Part 2 answer: ${X_MASCounter}`); // 1933