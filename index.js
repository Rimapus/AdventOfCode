#!/usr/bin/env node
const fs = require("fs");

const DAYS_PER_YEAR = 12;

function showUsage() {
    console.log("Usage:");
    console.log("\t./index.js create <year>\t\tCreate all the directories for a new year of AoC");
    console.log("\t./index.js status\t\t\tUpdate README.md to show the current AoC progress");
    console.log("\t./index.js run <year> <day>\t\tRun the puzzle for a specific day of AoC");
}

function createNewYear(year) {
    if (!year)
        return console.error("Please provide a year!");
    if (year.length !== 4)
        return console.error("Please provide a year with 4 digits!");
    if (fs.existsSync(`${__dirname}/${year}`))
        return console.error(`Year '${year}' already exists!`);

    for (let i = 1; i <= DAYS_PER_YEAR; i++) {
        const newDay = String(i).padStart(2, "0");

        fs.mkdirSync(`${__dirname}/${year}/Day ${newDay}`, { recursive: true });
        fs.writeFileSync(`${__dirname}/${year}/Day ${newDay}/input.txt`, "");
        fs.writeFileSync(`${__dirname}/${year}/Day ${newDay}/index.js`, `const fs = require("fs");\nlet input = fs.readFileSync(\`\${__dirname\}/input.txt\`, "utf8");\n\n\nconsole.log("AoC ${year} Day ${i}:");\n\n// Part 1\nconsole.log(\`Part 1 answer: \${""}\`); // \n\n\n// Part 2\nconsole.log(\`Part 2 answer: \${""}\`); // `);
    }
}

function updateStatus() {
    const years = fs.readdirSync(__dirname, { withFileTypes: true })
        .filter(d => d.isDirectory() && /^\d{4}$/.test(d.name))
        .map(d => d.name)
        .sort((a, b) => +b - +a);
    const maxDays = Math.max(...years.map(year => fs.readdirSync(`${__dirname}/${year}`, { withFileTypes: true })
        .filter(d => d.isDirectory() && /^Day \d{2}$/.test(d.name))
        .length));
    const maxDaysName = Array.from({ length: maxDays }, (_, i) => `Day ${String(i + 1).padStart(2, "0")}`);

    let output = `# [AdventOfCode](https://adventofcode.com/)\n\n${"| **`⭐{EARNED_STARS}/{TOTAL_STARS}`** | " + maxDaysName.join(" | ") + " |"}\n${"| :---: ".repeat(maxDaysName.length + 1) + "|"}`;

    let earnedStars = 0, totalStars = 0;
    years.forEach(year => {
        const yearDays = fs.readdirSync(`${__dirname}/${year}`, { withFileTypes: true })
            .filter(d => d.isDirectory() && /^Day \d{2}$/.test(d.name))
            .map(d => d.name);

        let yearOutput = `| [${year}](https://adventofcode.com/${year} '⭐{YEAR_STARS}/${yearDays.length * 2}') |`;

        let yearStars = 0;
        yearDays.forEach((day, i) => {
            const dayFile = fs.readFileSync(`${__dirname}/${year}/${day}/index.js`).toString();
            const dayStars = dayFile.match(/console\.log\(`Part (?:1|2) answer:.+`\); \/\/ .+/g)?.length ?? 0;

            yearStars += dayStars;
            yearOutput += ` [${dayStars === 2 ? "🟢" : dayStars === 1 ? "🟡" : "🔴"}](https://adventofcode.com/${year}/day/${i + 1} '⭐${dayStars}/2') |`;
        });

        earnedStars += yearStars;
        totalStars += yearDays.length * 2;
        output += `\n${yearOutput.replace("{YEAR_STARS}", yearStars)}`;
    });

    output = output.replace("{EARNED_STARS}", earnedStars);
    output = output.replace("{TOTAL_STARS}", totalStars);
    output += "\n\n*Pssst, you can click on the emojis to view the puzzles from that day*";
    fs.writeFileSync("README.md", output);
    console.log("README.md updated!");
}

function runPuzzle(year, day) {
    if (!year || !day)
        return console.error("Please provide both a year and a day!");
    if (isNaN(year) || isNaN(day))
        return console.error("Both year and day must be numbers!");

    day = String(day).padStart(2, "0");

    if (!fs.existsSync(`${__dirname}/${year}`))
        return console.error(`Year '${year}' does not exist!`);
    if (!fs.existsSync(`${__dirname}/${year}/Day ${day}`))
        return console.error(`Day '${day}' does not exist in year '${year}'!`);
    if (!fs.existsSync(`${__dirname}/${year}/Day ${day}/input.txt`))
        return console.error(`Please provide an input in '${year}/Day ${day}/input.txt'!`);

    console.time(`Execution time for AoC ${year} Day ${day}`);
    require(`${__dirname}/${year}/Day ${day}/index.js`);
    console.timeEnd(`Execution time for AoC ${year} Day ${day}`);
}

function main() {
    if (process.argv.length < 3)
        return showUsage();

    switch (process.argv[2]) {
        case "create":
            createNewYear(process.argv[3]);
            break;

        case "status":
            updateStatus();
            break;

        case "run":
            runPuzzle(process.argv[3], process.argv[4]);
            break;

        default:
            return showUsage();
    }
}

main();
