const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n/)
    .map(elem => elem.split(" -> ").map(elem2 => elem2.split(",").map(Number)));


console.log("AoC 2021 Day 5:");

let grid1 = {}, grid2 = {};
input.forEach(elem => {
    let Xs = [elem[0][0], elem[1][0]];
    let Ys = [elem[0][1], elem[1][1]];

    // Totally readable condition ^^
    for (let x = Xs[0], y = Ys[0]; (Xs[1] - Xs[0] < 0 ? (x >= Xs[1]) : (Xs[1] - Xs[0] === 0 ? true : x <= Xs[1])) && (Ys[1] - Ys[0] < 0 ? (y >= Ys[1]) : (Ys[1] - Ys[0] === 0 ? true : y <= Ys[1]));) {
        if ((elem[0][0] === elem[1][0]) !== (elem[0][1] === elem[1][1])) {
            grid1[`${x},${y}`] ? grid1[`${x},${y}`]++ : grid1[`${x},${y}`] = 1;
        }

        grid2[`${x},${y}`] ? grid2[`${x},${y}`]++ : grid2[`${x},${y}`] = 1;

        x += Math.sign(Xs[1] - Xs[0]);
        y += Math.sign(Ys[1] - Ys[0]);
    }
});

// Part 1
console.log(`Part 1 answer: ${Object.values(grid1).filter(elem => elem > 1).length}`); // 5774


// Part 2
console.log(`Part 2 answer: ${Object.values(grid2).filter(elem => elem > 1).length}`); // 18423