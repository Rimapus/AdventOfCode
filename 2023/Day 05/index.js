const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n\r?\n/);
const seeds = input[0].split(/  */)
    .slice(1)
    .map(Number);

const maps = input.slice(1)
    .map(elem => [
        elem.split(" map:")[0]
            .split("-to-")[1],
        elem.split(" map:")[1]
            .trim()
            .split(/\r?\n/)
            .map(elem2 => elem2.split(/  */)
                .map(Number)
            )
    ]);


console.log("AoC 2023 Day 5:");

// Part 1
const locations = [];
seeds.forEach(seed => {
    let source = seed;
    maps.forEach(map => {
        const seedRange = map[1].filter(m => source >= m[1] && source <= (m[1] + (m[2] - 1)))[0];
        if (seedRange) source = source + (seedRange[0] - seedRange[1]);
    });
    locations.push(source);
});

console.log(`Part 1 answer: ${Math.min(...locations)}`); // 111627841


// Part 2
function processRange(rangeStart, rangeEnd, categoryIndex) {
    const map = maps[categoryIndex];

    if (!map) return rangeStart; // If reached end (after "location" category) we return rangeStart (because it's the lowest value of range)


    const includingRange = map[1].filter(m => {
        const mapRangeEnd = m[1] + m[2] - 1;

        return rangeStart >= m[1] &&
            rangeStart <= mapRangeEnd &&
            rangeEnd <= mapRangeEnd &&
            rangeEnd >= m[1];
    })[0];

    if (includingRange) { // If input range is contained inside map's range
        const includingRangeOffset = includingRange[0] - includingRange[1];

        return processRange(rangeStart + includingRangeOffset, rangeEnd + includingRangeOffset, categoryIndex + 1);

    } else {

        const priorOvrlpRange = map[1].filter(m => {
            const mapRangeEnd = m[1] + m[2] - 1;

            return rangeStart < m[1] &&
                rangeEnd >= m[1] &&
                rangeEnd <= mapRangeEnd;
        })[0];


        const afterOvrlpRange = map[1].filter(m => {
            const mapRangeEnd = m[1] + m[2] - 1;

            return rangeStart >= m[1] &&
                rangeStart <= mapRangeEnd &&
                rangeEnd >= mapRangeEnd;
        })[0];

        if (priorOvrlpRange) { // If input range start before map's range
            const priorOvrlpRangeOffset = priorOvrlpRange[0] - priorOvrlpRange[1];

            return [
                processRange(rangeStart, priorOvrlpRange[1] - 1, categoryIndex), // Not affected range (before map's range)
                processRange(priorOvrlpRange[0], rangeEnd + priorOvrlpRangeOffset, categoryIndex + 1) // Affected range (inside map's range)
            ];

        } else if (afterOvrlpRange) { // If input range finish after map's range
            const afterOvrlpRangeOffset = afterOvrlpRange[0] - afterOvrlpRange[1];

            return [
                processRange(rangeStart + afterOvrlpRangeOffset, (afterOvrlpRange[1] + afterOvrlpRange[2] - 1) + afterOvrlpRangeOffset, categoryIndex + 1), // Affected range (inside map's range)
                processRange(afterOvrlpRange[1] + afterOvrlpRange[2], rangeEnd, categoryIndex) // Not affected range (after map's range)
            ];

        } else {
            return processRange(rangeStart, rangeEnd, categoryIndex + 1);
        }
    }
}

const locations2 = [];
for (let i = 0; i < seeds.length / 2; i++) {
    locations2.push(processRange(seeds[i * 2], seeds[i * 2] + seeds[i * 2 + 1] - 1, 0));
}

console.log(`Part 2 answer: ${Math.min(...locations2.flat(10))}`); // 69323688
