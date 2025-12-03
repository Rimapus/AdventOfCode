const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n/)
    .map(elem => elem.split(",")
        .map(elem2 => [elem2[0], +elem2.slice(1)]));


console.log("AoC 2019 Day 3:");

const manhattanDistance = (pt1, pt2) => {
    return Math.abs(pt1[0] - pt2[0]) + Math.abs(pt1[1] - pt2[1]);
};

const directions = { "L": [-1, 0], "R": [1, 0], "U": [0, 1], "D": [0, -1] };
const parseWire = (inpt) => {
    let x = 0, y = 0;
    let wire = [];
    for (let i = 0; i < inpt.length; i++) {
        let segment = { from: [x, y] };
        x += directions[inpt[i][0]][0] * inpt[i][1], y += directions[inpt[i][0]][1] * inpt[i][1];
        segment.to = [x, y];
        segment.distance = manhattanDistance(segment.from, segment.to);
        wire.push(segment);
    }
    return wire;
};

const wire1 = parseWire(input[0]);
const wire2 = parseWire(input[1]);


// Thx https://www.reddit.com/r/adventofcode/comments/e5bz2w/comment/faecknr
let intersections = [];
wire1.forEach((segment1, i1) => {
    wire2.forEach((segment2, i2) => {
        if ((segment1.from[0] === segment1.to[0]) ^ (segment2.from[0] === segment2.to[0])) {
            const vertical = segment1.from[0] === segment1.to[0] ? segment1 : segment2;
            const horizontal = segment1.from[0] === segment1.to[0] ? segment2 : segment1;

            const minX = Math.min(horizontal.from[0], horizontal.to[0]);
            const maxX = Math.max(horizontal.from[0], horizontal.to[0]);

            const minY = Math.min(vertical.from[1], vertical.to[1]);
            const maxY = Math.max(vertical.from[1], vertical.to[1]);

            if (vertical.from[0] >= minX && vertical.from[0] <= maxX
                && horizontal.from[1] >= minY && horizontal.from[1] <= maxY) {

                if (vertical.from[0] !== 0 && horizontal.from[1] !== 0) {
                    const wire1Steps = wire1.slice(0, i1).reduce((a, b) => a + b.distance, 0) + manhattanDistance(segment1.from, [vertical.from[0], horizontal.from[1]]);
                    const wire2Steps = wire2.slice(0, i2).reduce((a, b) => a + b.distance, 0) + manhattanDistance(segment2.from, [vertical.from[0], horizontal.from[1]]);

                    intersections.push({
                        distance: Math.abs(vertical.from[0]) + Math.abs(horizontal.from[1]),
                        steps: wire1Steps + wire2Steps
                    });
                }
            }
        }
    });
});

// Part 1
console.log(`Part 1 answer: ${Math.min(...intersections.map(int => int.distance))}`); // 1064


// Part 2
console.log(`Part 2 answer: ${Math.min(...intersections.map(int => int.steps))}`); // 25676