const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n\r?\n/)
    .map(elem => elem.replace(/\r?\n/g, " ").split(" "));


console.log("AoC 2020 Day 4:");

// Part 1
const fields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
let validCount = 0;
input.forEach(elem => {
    if (fields.every(field => elem.filter(elem1 => elem1.includes(field)).length >= 1)) validCount++;
});

console.log(`Part 1 answer: ${validCount}`); // 230


// Part 2
validCount = 0;
input.forEach(elem => {
    if (fields.every(field => elem.filter(elem1 => elem1.includes(field)).length >= 1)) {
        let valid = true;
        elem.forEach(elem1 => {
            const field = elem1.split(":");
            switch (field[0]) {     // Very ugly code but can be condensed with regex I think ?...
                case "byr":
                    valid = valid && (1920 <= +field[1] && +field[1] <= 2002);
                    break;

                case "iyr":
                    valid = valid && (2010 <= +field[1] && +field[1] <= 2020);
                    break;

                case "eyr":
                    valid = valid && (2020 <= +field[1] && +field[1] <= 2030);
                    break;

                case "hgt":
                    if (field[1].includes("cm")) valid = valid && (150 <= +field[1].replace("cm", "") && +field[1].replace("cm", "") <= 193);
                    else valid = valid && (59 <= +field[1].replace("in", "") && +field[1].replace("in", "") <= 76);
                    break;

                case "hcl":
                    valid = valid && /#([a-f0-9]{6})/.test(field[1]);
                    break;

                case "ecl":
                    valid = valid && /(amb|blu|brn|gry|grn|hzl|oth)/.test(field[1]);
                    break;

                case "pid":
                    valid = valid && /^([0-9]{9})$/.test(field[1]);
                    break;
            }
        });
        if (valid) validCount++;
    }
});

console.log(`Part 2 answer: ${validCount}`); // 156
