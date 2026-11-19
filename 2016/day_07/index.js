const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n/)
    .map(elem => {
        const hypernet = elem.match(/\[(.*?)\]/g);
        const supernet = elem.split(new RegExp(hypernet.join("|").replaceAll("[", "\\[").replaceAll("]", "\\]"), "g"));
        return { hypernet: hypernet.map(e => e.replace("[", "").replace("]", "")), supernet: supernet };
    });


console.log("AoC 2016 Day 7:");

let TLSSupport = 0;
let SSLSupport = 0;
input.forEach(e => {

    const hasABBA = (net) => {
        return net.some(e2 => e2.split("").some((_, i, t) => (t[i] === t[i + 3]) && (t[i + 1] === t[i + 2]) && (t[i] !== t[i + 1])));
    };

    if (!hasABBA(e.hypernet) && hasABBA(e.supernet)) TLSSupport++;

    const findABAs = (net) => {
        return net.map(e2 => {
            const regEx = /([a-z])(?!\1)([a-z])\1/g;

            const ABAs = [];
            let match;
            while (match = regEx.exec(e2)) {
                ABAs.push(match[0]);
                regEx.lastIndex -= match[0].length - 1;
            }

            return ABAs;
        }).flat();
    };

    const supernetABAs = findABAs(e.supernet);
    const hypernetABAs = findABAs(e.hypernet);

    if (supernetABAs.some(aba => hypernetABAs.includes(`${aba[1]}${aba[0]}${aba[1]}`))) SSLSupport++;
});

// Part 1
console.log(`Part 1 answer: ${TLSSupport}`); // 105


// Part 2
console.log(`Part 2 answer: ${SSLSupport}`); // 258
