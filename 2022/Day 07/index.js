const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n/).map(elem => elem.split(" "));

const currentDir = [];
const filesystem = [];
for (const lineIndex in input) {
    const line = input[lineIndex];
    if (line[0] === "$") {
        if (line[1] === "cd") {
            if (line[2] === "..") currentDir.pop();
            else {
                currentDir.push(line[2]);
                filesystem[currentDir.join("/")] = {size: 0};
            }
        }
    } else if (line[0] !== "dir") {
        const tempPath = [];
        currentDir.forEach(elem => {
            tempPath.push(elem);
            filesystem[tempPath.join("/")].size += +line[0];
        });
    }
}


console.log("AoC 2022 Day 7:");

// Part 1
let filesystemSum = 0;
for (const dir in filesystem) {
    if (filesystem[dir].size <= 100000) filesystemSum += filesystem[dir].size;
}

console.log(`Part 1 answer: ${filesystemSum}`); // 1390824


// Part 2
const spaceToFree = filesystem["/"].size-40000000;
const possibleDirs = [];
for (const dir in filesystem) {
    if (filesystem[dir].size > spaceToFree) possibleDirs.push(filesystem[dir].size);
}

console.log(`Part 2 answer: ${Math.min(...possibleDirs)}`); // 7490863


// Passé beaucoup de temps car il peut y avoir plusieurs dir du même nom
// dans plusieurs endroits différents donc il faut prendre le path complet...
