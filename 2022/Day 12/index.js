/*
    NOT WORKING
*/

const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n/).map(elem => elem.split(''));

const alphabet = ['S'].concat([...Array(26)].map((_, i) => String.fromCharCode(i + 97)).concat(['E']));

let startY = input.findIndex(row => row.includes('S'));
let startX = input[startY].indexOf('S');
let start = [startX, startY];
let endY = input.findIndex(row => row.includes('E'));
let endX = input[endY].indexOf('E');
let end = [endX, endY];

let currentCoord = end;

let spots = {};

let distanceToEnd = 0;
for (let i = 0; i < 31; i++) {
    console.log("==========");
    let currentLetter = input[currentCoord[1]][currentCoord[0]];
    let neighbors = [
        [currentCoord[0] - 1, currentCoord[1]], // Left
        [currentCoord[0] + 1, currentCoord[1]], // Right
        [currentCoord[0], currentCoord[1] - 1], // Up
        [currentCoord[0], currentCoord[1] + 1] // Down
    ].map(elem => {
        if (elem[0] < 0 ||
            elem[0] > input[0].length - 1 ||
            elem[1] < 0 ||
            elem[1] > input.length - 1) elem = [];
        return elem;
    });

    let neighborsLetter = neighbors.map(elem => input[elem[1]]?.[elem[0]]);
    console.log(neighbors, neighborsLetter);


    distanceToEnd++;
    for (let i = 0; i < neighborsLetter.length; i++) {
        let elem = neighborsLetter[i];
        // console.log(neighbors, neighborsLetter, elem, currentLetter)
        if (alphabet.indexOf(elem) === alphabet.indexOf(currentLetter) - 1 ||
            alphabet.indexOf(elem) === alphabet.indexOf(currentLetter)) {
                console.log("ok", elem, i);
            spots[neighbors[i]] = { distance: distanceToEnd };
            break;
        }
    }

    console.log(currentCoord);
    // console.log(spots)
    currentCoord = Object.keys(spots)[Object.keys(spots).length - 1].split(',').map(Number);
    console.log(currentCoord);

}

console.log(spots);

// currentCoord = start
// let step = 0

// while (currentCoord !== end) {
//     let currentLetter = input[currentCoord[1]][currentCoord[0]]
//     let neighbors = [
//         [currentCoord[0] - 1, currentCoord[1]], // Left
//         [currentCoord[0] + 1, currentCoord[1]], // Right
//         [currentCoord[0], currentCoord[1] - 1], // Up
//         [currentCoord[0], currentCoord[1] + 1] // Down
//     ].map(elem => {
//         if (elem[0] < 0 ||
//             elem[0] > input[0].length - 1 ||
//             elem[1] < 0 ||
//             elem[1] > input.length - 1) elem = undefined
//         return elem
//     })

//     let neighborsDistance = neighbors.map(elem => spots[elem.join(',')])

//     neighborsDistance.filter()

// }



// console.log(spots)

console.log("AoC 2022 Day 12:");

// Part 1
console.log(`Part 1 answer: ${""}`); // 


// Part 2
console.log(`Part 2 answer: ${""}`); // 