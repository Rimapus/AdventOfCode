const fs = require("fs")
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8")

input = input.split(/\r?\n/)


console.log("AoC 2018 Day 2:")

// Part 1
let pairCount = 0;
let trioCount = 0;
input.forEach(boxId => {
    let visitedLetters = [];
    let containsPair = false;
    let containsTrio = false;
    for (let i = 0; i < boxId.length; i++) {
        if (visitedLetters.includes(boxId[i]))
            continue;
        let letterCount = 1;
        for (let j = i + 1; j < boxId.length; j++) {
            if (boxId[i] === boxId[j])
                letterCount++;
        }
        switch (letterCount) {
            case 2:
                containsPair = true;
                break;
            case 3:
                containsTrio = true;
                break;
        }
        visitedLetters.push(boxId[i]);
    }
    if (containsPair)
        pairCount++;
    if (containsTrio)
        trioCount++;
});
console.log(`Part 1 answer: ${pairCount * trioCount}`) // 7163


// Part 2
let answer2 = [];
for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
        let diffLettersCount = 0;
        for (let k = 0; k < input[i].length; k++) {
            if (input[i][k] !== input[j][k])
                diffLettersCount++;
        }
        if (diffLettersCount === 1) {
            for (let k = 0; k < input[i].length; k++) {
                if (input[i][k] === input[j][k])
                    answer2.push(input[i][k]);
            }
            break;
        }
    }
}
console.log(`Part 2 answer: ${answer2.join("")}`) // ighfbyijnoumxjlxevacpwqtr