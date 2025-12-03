const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n/)
    .map(elem => Array.from(elem.match(/(\w+) \((\d+)\)(?: -> ([\w, ]+))?/).slice(1)));
input.forEach(elem => {
    elem[1] = +elem[1];
    elem[2] = elem[2]?.split(", ");
});
input = input.sort((a, b) => (a[2]?.length || 0) - (b[2]?.length || 0));


console.log("AoC 2017 Day 7:");

let programs = {};
input.forEach(program => {
    programs[program[0]] = [program[1], program[2]];
});
let bottomProgram = Object.keys(programs)
    .find(program =>
        !Object.values(programs)
            .map(elem => elem[1])
            .some(elem2 => elem2?.includes(program)));

// Part 1
console.log(`Part 1 answer: ${bottomProgram}`); // cqmvs

// Part 2
function getTowerWeight(discName) {
    const tower = programs[discName];
    let towerWeight = tower[0];
    if (!tower[1]) return towerWeight;

    towerWeight += tower[1].reduce((a, b) => a + getTowerWeight(b), 0);
    return towerWeight;
}

let correctWeight = 0;
for (const program of Object.values(programs)) {
    if (!program[1]) continue;
    const towersWeight = program[1].map(disc => [disc, getTowerWeight(disc)]);
    let weightOccurences = Object.entries(towersWeight.reduce((a, b) => (a[b[1]] = (a[b[1]] || 0) + 1, a), {}));
    weightOccurences = weightOccurences.sort((a, b) => a[1] - b[1]);

    if (weightOccurences.length === 1) continue;
    const incorrectWeight = Number(weightOccurences[0][0]);
    let incorrectDisc = towersWeight.find(disc => disc[1] === incorrectWeight);
    incorrectDisc = programs[incorrectDisc[0]];

    correctWeight = incorrectDisc[0] + (weightOccurences[1][0] - incorrectWeight);
    break;
}
console.log(`Part 2 answer: ${correctWeight}`); // 2310