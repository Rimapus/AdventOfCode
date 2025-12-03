const fs = require("fs")
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8")

input = input.split(",")


console.log("AoC 2023 Day 15:")

function hash(string) {
    let currentValue = 0;
    for (const character of string) {
        currentValue += character.charCodeAt(0);
        currentValue *= 17;
        currentValue %= 256;
    }
    return currentValue;
}

// Part 1
let hashSum = input.reduce((a, b) => a + hash(b), 0);
console.log(`Part 1 answer: ${hashSum}`) // 504449


// Part 2
const boxes = [...Array(256)].map(() => []);
for (const step of input) {
    const operation = step.includes("=") ? "=" : "-";
    const [label, focalLength] = step.split(/=|-/g);
    const boxNumber = hash(label);

    const foundIndex = boxes[boxNumber].findIndex(lens => lens[0] === label);
    if (operation === "-") {
        if (foundIndex !== -1)
            boxes[boxNumber].splice(foundIndex, 1);
    } else {
        if (foundIndex !== -1)
            boxes[boxNumber][foundIndex][1] = focalLength;
        else
            boxes[boxNumber].push([label, Number(focalLength)]);
    }
}

let focusingPower = 0;
boxes.forEach((box, boxIndex) => {
    box.forEach((lens, lensIndex) => {
        focusingPower += (boxIndex + 1) * (lensIndex + 1) * lens[1];
    });
});
console.log(`Part 2 answer: ${focusingPower}`) // 262044