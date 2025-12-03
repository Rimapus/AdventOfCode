const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n/).map(elem => elem.split(" "));


console.log("AoC 2017 Day 4:");

let validCount1 = 0;
let validCount2 = 0;
input.forEach(password => {
    let valid2 = true;
    for (let i = 0; i < password.length; i++) {
        for (let j = i + 1; j < password.length; j++) {
            if (password[i].split("").sort().join("") == password[j].split("").sort().join(""))
                valid2 = false;
            if (password[i] == password[j])
                return;
        }
    }
    validCount1++;
    if (valid2)
        validCount2++;
});

// Part 1
console.log(`Part 1 answer: ${validCount1}`); // 466


// Part 2
console.log(`Part 2 answer: ${validCount2}`); // 251