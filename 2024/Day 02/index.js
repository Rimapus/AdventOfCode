const fs = require("fs")
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8")

input = input.split(/\r?\n/).map(elem => elem.split(" ").map(Number))


console.log("AoC 2024 Day 2:")

function isSafeReport(report) {
    let diffs = [];
    for (let i = 0; i < report.length - 1; i++)
        diffs[i] = report[i + 1] - report[i];
    return diffs.every(diff => diff <= 0 && diff <= -1 && diff >= -3) ||
        diffs.every(diff => diff >= 0 && diff >= 1 && diff <= 3)
}

// Part 1
let safeReports1 = 0;
input.forEach(report => {
    if (isSafeReport(report))
        safeReports1++;
});
console.log(`Part 1 answer: ${safeReports1}`) // 663


// Part 2
let safeReports2 = 0;
input.forEach(report => {
    if (isSafeReport(report)) {
        safeReports2++;
        return;
    }
    for (let i = 0; i < report.length; i++) {
        let tempReport = [...report];
        tempReport.splice(i, 1);
        if (isSafeReport(tempReport)) {
            safeReports2++;
            return;
        }
    }
});
console.log(`Part 2 answer: ${safeReports2}`) // 692