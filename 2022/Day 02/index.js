const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n/)
    .map(elem => elem.split(" "));


console.log("AoC 2022 Day 2:");

// Part 1
let roundsScore = 0;
input.forEach(elem => {
    let outcomeScore = 0;
    let enemyShape = elem[0].charCodeAt(0) - "A".charCodeAt(0);
    let myShape = elem[1].charCodeAt(0) - "X".charCodeAt(0);

    if (enemyShape - myShape === 0) {
        // Draw
        outcomeScore = 3;
    } else if (enemyShape - myShape === -1 || (enemyShape === 2 && myShape === 0)) {
        // Win
        outcomeScore = 6;
    }
    roundsScore += outcomeScore + (elem[1].charCodeAt(0) - "X".charCodeAt(0)) + 1;
});

console.log(`Part 1 answer: ${roundsScore}`); // 15337


// Part 2
roundsScore = 0;
input.forEach(elem => {
    let playedShape = "";
    switch (elem[1]) {
        case "X": // Want lose
            playedShape = ((elem[0].charCodeAt(0) - "A".charCodeAt(0)) + 2) % 3;
            break;
        case "Y": // Want draw
            playedShape = elem[0].charCodeAt(0) - "A".charCodeAt(0);
            break;
        case "Z": // Want win
            playedShape = ((elem[0].charCodeAt(0) - "A".charCodeAt(0)) + 1) % 3;
            break;
    }

    let outcomeScore = 0;
    let enemyShape = elem[0].charCodeAt(0) - "A".charCodeAt(0);

    if (enemyShape - playedShape === 0) {
        // Draw
        outcomeScore = 3;
    } else if (enemyShape - playedShape === -1 || (enemyShape === 2 && playedShape === 0)) {
        // Win
        outcomeScore = 6;
    }
    roundsScore += outcomeScore + playedShape + 1;
});

console.log(`Part 2 answer: ${roundsScore}`); // 11696