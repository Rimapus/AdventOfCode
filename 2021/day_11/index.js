const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n/)
    .map(elem => elem.split("").map(Number));


console.log("AoC 2021 Day 11:");

const board = JSON.parse(JSON.stringify(input));
let flashed = [];
let flashedAfter100 = 0;
let i = 0;
while (flashed.length !== board.flat().length) {
    i++;
    flashed = [];

    // Increase all by 1
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[0].length; x++) {
            board[y][x]++;
        }
    }

    function Flash(y, x) { // Increase adjacents octopuses by 1
        const tl = [y - 1, x - 1];
        const t = [y - 1, x];
        const tr = [y - 1, x + 1];
        const ml = [y, x - 1];
        const mr = [y, x + 1];
        const bl = [y + 1, x - 1];
        const b = [y + 1, x];
        const br = [y + 1, x + 1];

        const adjacents = [tl, t, tr, ml, mr, bl, b, br].filter(e => board[e[0]]?.[e[1]]);

        adjacents.forEach(e => board[e[0]][e[1]]++);
        flashed.push([y, x]);
    }

    function getLeftToFlash() {
        return board.map((row, y) => {
            return row.map((column, x) => {
                if (column > 9 && !flashed.map(e => e.join()).includes([y, x].join())) {
                    return [y, x];
                }
            });
        }).flat().filter(e => e);
    }

    let leftToFlash = getLeftToFlash();
    while (leftToFlash.length !== 0) {
        leftToFlash.forEach(elem => Flash(...elem));
        leftToFlash = leftToFlash = getLeftToFlash();
    }

    // Set all > 9 to 0
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[0].length; x++) {
            if (board[y][x] > 9) board[y][x] = 0;
        }
    }

    if (i <= 100) flashedAfter100 += flashed.length;
}

// Part 1
console.log(`Part 1 answer: ${flashedAfter100}`); // 1637


// Part 2
console.log(`Part 2 answer: ${i}`); // 242
