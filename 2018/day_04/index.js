const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n/)
    .map(elem => Array.from(elem.match(/\[([0-9]{4})-([0-9]{2})-([0-9]{2}) ([0-9]{2}):([0-9]{2})\] (.+)/).slice(1)))
    .sort((a, b) => +a[0] - +b[0] || +a[1] - +b[1] || +a[2] - +b[2] || +a[3] - +b[3] || +a[4] - +b[4]);


console.log("AoC 2018 Day 4:");

const guards = {};
let currentGuard;
let asleepMinute;
for (let i = 0; i < input.length; i++) {
    const record = input[i][5];
    const regexOut = record.match(/Guard #([0-9]+) begins shift/);
    if (regexOut !== null) {
        if (!guards[regexOut[1]]) {
            guards[regexOut[1]] = { asleep: false, asleepHours: {} };
        }
        currentGuard = regexOut[1];
        continue;
    }
    if (record === "falls asleep") {
        guards[currentGuard].asleep = true;
        asleepMinute = +input[i][4];
    }
    if (record === "wakes up") {
        guards[currentGuard].asleep = false;
        for (let j = asleepMinute; j < asleepMinute + (+input[i][4] - asleepMinute); j++) {
            if (!guards[currentGuard].asleepHours[j]) {
                guards[currentGuard].asleepHours[j] = 1;
            } else {
                guards[currentGuard].asleepHours[j] += 1;
            }
        }
    }
};

// Part 1
const mostAsleepGuard1 = Object.entries(guards)
    .map(guard => [
        guard[0],
        Object.values(guard[1].asleepHours)?.reduce((a, b) => a + b, 0)
    ])
    .sort((a, b) => b[1] - a[1])[0][0];

const mostAsleepMinute1 = Object.entries(guards[mostAsleepGuard1].asleepHours)
    .sort((a, b) => b[1] - a[1])[0][0];
console.log(`Part 1 answer: ${+mostAsleepGuard1 * +mostAsleepMinute1}`); // 101194


// Part 2
const mostAsleepGuard2 = Object.entries(guards)
    .map(guard => [
        guard[0],
        Object.entries(guard[1].asleepHours).sort((a, b) => b[1] - a[1])[0] ?? ["0", 0]
    ])
    .sort((a, b) => b[1][1] - a[1][1])[0];
console.log(`Part 2 answer: ${+mostAsleepGuard2[0] * +mostAsleepGuard2[1][0]}`); // 102095
