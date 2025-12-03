const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n/)
    .map(elem => elem.replace("]", "").split(/-(?:(?!.*-))|\[/));


console.log("AoC 2016 Day 4:");

// Part 1
let idsSum = 0;
input.forEach(e => {
    const letters = {};
    e[0].split("").forEach(letter => {
        (letter !== "-") ? (letters[letter] ? letters[letter] += 1 : letters[letter] = 1) : null;
    });
    const calculatedChecksum = Object.entries(letters).sort((a, b) => (b[1] - a[1]) === 0 ? (a[0].charCodeAt(0) - b[0].charCodeAt(0)) : (b[1] - a[1])).slice(0, 5).map(l => l[0]).join("");
    if (e[2] === calculatedChecksum) idsSum += +e[1];
});

console.log(`Part 1 answer: ${idsSum}`); // 158835


// Part 2
let answer2 = "";
input.forEach(e => {
    const cipherAlphabet = [...Array(26)].map((_, i) => String.fromCharCode(97 + ((i + (+e[1] % 26)) % 26)));
    let decrypted = "";
    e[0].split("").forEach(letter => {
        (letter !== "-") ? decrypted += cipherAlphabet[letter.charCodeAt(0) - 97] : decrypted += " ";
    });
    if (decrypted.includes("object")) answer2 = e[1];

});

console.log(`Part 2 answer: ${answer2}`); // 993