const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n/).map(elem => elem.split(",").map(Number));


console.log("AoC 2025 Day 9:");

let rectangles = [];
for (let point1Index = 0; point1Index < input.length; point1Index++) {
    for (let point2Index = point1Index + 1; point2Index < input.length; point2Index++) {
        const point1 = input[point1Index];
        const point2 = input[point2Index];
        const area = (Math.abs(point1[0] - point2[0]) + 1) * (Math.abs(point1[1] - point2[1]) + 1);

        rectangles.push([[point1, point2], area]);
    }
}
rectangles = rectangles.sort((a, b) => b[1] - a[1]);

// Part 1
console.log(`Part 1 answer: ${rectangles[0][1]}`); // 4745816424


// Part 2
let xs = input.map(cell => cell[0]);
let ys = input.map(cell => cell[1]);
xs = Object.fromEntries([...new Set(xs.sort((a, b) => a - b))].map((x, i) => [x, i + 1]));
ys = Object.fromEntries([...new Set(ys.sort((a, b) => a - b))].map((x, i) => [x, i + 1]));

function compressPoint(point) {
    return [xs[point[0]], ys[point[1]]];
}

const compressedInput = input.map(point => compressPoint(point));

function isPointInWall(point) {
    const walls = [...compressedInput, compressedInput[0]];

    const foundWall = walls
        .slice(0, -1)
        .find((wall, i) => {
            if (point[0] >= Math.min(wall[0], walls[i + 1][0]) && point[0] <= Math.max(wall[0], walls[i + 1][0]) &&
                point[1] >= Math.min(wall[1], walls[i + 1][1]) && point[1] <= Math.max(wall[1], walls[i + 1][1]))
                return true;
            else
                return false;
        });
    return foundWall !== undefined;
}

const outsidePoints = [];
function floodFillOutside(startPoint) {
    const stack = [startPoint];

    while (stack.length !== 0) {
        const currentPoint = stack.shift();
        if (outsidePoints.some(point => point[0] === currentPoint[0] && point[1] === currentPoint[1]))
            continue;
        if (currentPoint[0] < 0 || currentPoint[0] > Object.values(xs).length + 1 ||
            currentPoint[1] < 0 || currentPoint[1] > Object.values(ys).length + 1)
            continue;
        if (isPointInWall(currentPoint))
            continue;

        outsidePoints.push(currentPoint);

        stack.push([currentPoint[0] - 1, currentPoint[1]]);
        stack.push([currentPoint[0] + 1, currentPoint[1]]);
        stack.push([currentPoint[0], currentPoint[1] - 1]);
        stack.push([currentPoint[0], currentPoint[1] + 1]);
    }
}
floodFillOutside([0, 0]);

function isValidPoint(point) {
    return !outsidePoints.some(p => p[0] === point[0] && p[1] === point[1]);
}

function isValidRectangle(point1, point2) {
    const startX = Math.min(point1[0], point2[0]);
    const endX = Math.max(point1[0], point2[0]);
    const startY = Math.min(point1[1], point2[1]);
    const endY = Math.max(point1[1], point2[1]);

    for (let currentX = startX; currentX <= endX; currentX++) {
        if (!isValidPoint([currentX, startY]) || !isValidPoint([currentX, endY]))
            return false;
    }

    for (let currentY = startY + 1; currentY < endY; currentY++) {
        if (!isValidPoint([startX, currentY]) || !isValidPoint([endX, currentY]))
            return false;
    }

    return true;
}

let maxRectangleArea2 = 0;
for (const rectangle of rectangles) {
    if (!isValidRectangle(compressPoint(rectangle[0][0]), compressPoint(rectangle[0][1])))
        continue;
    maxRectangleArea2 = rectangle[1];
    break;
}
console.log(`Part 2 answer: ${maxRectangleArea2}`); // 1351617690