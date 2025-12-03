const fs = require("fs");
const { runComputer } = require("../Day 05/computer.js");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(",")
    .map(Number);


console.log("AoC 2019 Day 7:");

// Part 1
// https://stackoverflow.com/a/9960925
let permArr = [], usedChars = [];
function getPermutations(arr) {
    let i, ch;

    for (i = 0; i < arr.length; i++) {
        ch = arr.splice(i, 1)[0];
        usedChars.push(ch);
        if (arr.length === 0) {
            permArr.push(usedChars.slice());
        }
        getPermutations(arr);
        arr.splice(i, 0, ch);
        usedChars.pop();
    }
    return permArr;
};


// let maxOutputSignal = 0
// let phaseSettingSequences = getPermutations([0, 1, 2, 3, 4])

// phaseSettingSequences.forEach(seq => {
//     let memory = JSON.parse(JSON.stringify(input))
//     let signal = 0

//     for (let i = 0; i < 5; i++) {
//         signal = runComputer([seq[i], signal], memory)
//     }

//     maxOutputSignal = Math.max(signal, maxOutputSignal)

// })

console.log(`Part 1 answer: ${maxOutputSignal}`); // 75228


// Part 2

function runBigComputer(phaseSetSeq, input = 0) {
    let maxOutputSignal = 0;


    
}


// UNFINISHED
let phaseSettingSequences = getPermutations([0, 1, 2, 3, 4]);

phaseSettingSequences.forEach(seq => {
    let memory = JSON.parse(JSON.stringify(input));
    let signal = 0;

    for (let i = 0; i < 5; i++) {
        signal = runComputer([seq[i], signal], memory);
    }

    maxOutputSignal = Math.max(signal, maxOutputSignal);

});
console.log(`Part 2 answer: ${""}`); // 