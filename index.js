#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const MAX_DAYS = 25;
const DAY_REGEX = /^day_(\d{2})$/;
const TEMPLATES_DIRECTORY = path.join(__dirname, "templates");
const README_TEMPLATE = path.join(TEMPLATES_DIRECTORY, "README.template.md");
const DAY_TEMPLATE = path.join(TEMPLATES_DIRECTORY, "day.template.js");
const SOLVED_PART_REGEX = /console\.log\(`Part (?:1|2) answer:.+`\); \/\/ \S/g;

const formatDay = day => String(day).padStart(2, "0");
const dayFolder = day => `day_${formatDay(day)}`;
const dayPath = (year, day) => path.join(__dirname, year, dayFolder(day));
const inputUrl = (year, day) => `https://adventofcode.com/${year}/day/${day}/input`;

function fail(message) {
    console.error(message);
    process.exitCode = 1;
}

function showUsage() {
    console.log("Usage:");
    console.log("\t./index.js create <year> [days]\tCreate the directories for a new year of AoC");
    console.log("\t./index.js status\t\t\tUpdate README.md to show the current AoC progress");
    console.log("\t./index.js run <year> <day>\t\tRun the puzzle for a specific day of AoC");
}

function daysInYear(year) {
    return year >= 2025 ? 12 : MAX_DAYS;
}

function readTemplate(file, placeholders) {
    if (!fs.existsSync(file))
        return fail(`Template '${path.relative(__dirname, file)}' is missing!`);

    const template = fs.readFileSync(file, "utf8");
    const missing = placeholders.find(placeholder => !template.includes(placeholder));
    if (missing)
        return fail(`Template '${path.relative(__dirname, file)}' must contain a ${missing} placeholder!`);

    return template;
}

function renderDayTemplate(template, year, day) {
    return template
        .replaceAll("{{YEAR}}", String(year))
        .replaceAll("{{DAY}}", String(day));
}

function createNewYear(year, days) {
    if (!year)
        return fail("Please provide a year!");
    if (!/^\d{4}$/.test(year))
        return fail("Please provide a year with 4 digits!");

    const dayCount = days === undefined ? daysInYear(Number(year)) : Number(days);
    if (!Number.isInteger(dayCount) || dayCount < 1 || dayCount > MAX_DAYS)
        return fail(`Please provide a number of days between 1 and ${MAX_DAYS}!`);

    const yearPath = path.join(__dirname, year);
    if (fs.existsSync(yearPath))
        return fail(`Year '${year}' already exists!`);

    const template = readTemplate(DAY_TEMPLATE, ["{{YEAR}}", "{{DAY}}"]);
    if (template === undefined)
        return;

    for (let day = 1; day <= dayCount; day++) {
        const folder = dayPath(year, day);
        fs.mkdirSync(folder, { recursive: true });
        fs.writeFileSync(path.join(folder, "input.txt"), "");
        fs.writeFileSync(path.join(folder, "index.js"), renderDayTemplate(template, year, day));
    }
}

function getYears() {
    return fs.readdirSync(__dirname, { withFileTypes: true })
        .filter(entry => entry.isDirectory() && /^\d{4}$/.test(entry.name))
        .map(entry => entry.name)
        .sort((a, b) => +b - +a);
}

function getDays(year) {
    return fs.readdirSync(path.join(__dirname, year), { withFileTypes: true })
        .filter(entry => entry.isDirectory() && DAY_REGEX.test(entry.name))
        .map(entry => Number(entry.name.match(DAY_REGEX)[1]))
        .sort((a, b) => a - b);
}

function countStars(year, day) {
    const file = path.join(dayPath(year, day), "index.js");
    if (!fs.existsSync(file))
        return 0;

    const contents = fs.readFileSync(file, "utf8");
    const matches = contents.match(SOLVED_PART_REGEX)?.length ?? 0;
    return Math.min(matches, 2);
}

function starEmoji(stars) {
    return stars === 2 ? "🟢" : stars === 1 ? "🟡" : "🔴";
}

function renderTable(years) {
    const maxDays = Math.max(0, ...years.map(year => Math.max(0, ...getDays(year))));
    const dayHeaders = Array.from({ length: maxDays }, (_, i) => `Day ${formatDay(i + 1)}`);
    const header = `| ${["**`⭐{{EARNED_STARS}}/{{TOTAL_STARS}}`**", ...dayHeaders].join(" | ")} |`;
    const separator = `| ${Array.from({ length: maxDays + 1 }, () => ":---:").join(" | ")} |`;

    let earnedStars = 0;
    let totalStars = 0;
    const rows = years.map(year => {
        const days = getDays(year);
        const dayStars = days.map(day => countStars(year, day));
        const yearStars = dayStars.reduce((sum, stars) => sum + stars, 0);

        earnedStars += yearStars;
        totalStars += days.length * 2;

        const starsByDay = new Map(days.map((day, i) => [day, dayStars[i]]));

        let row = `| [${year}](https://adventofcode.com/${year} '⭐${yearStars}/${days.length * 2}') |`;
        for (let day = 1; day <= maxDays; day++) {
            if (!starsByDay.has(day)) {
                row += " — |";
                continue;
            }

            const stars = starsByDay.get(day);
            row += ` [${starEmoji(stars)}](https://adventofcode.com/${year}/day/${day} '⭐${stars}/2') |`;
        }
        return row;
    });

    return {
        table: [header, separator, ...rows].join("\n"),
        earnedStars,
        totalStars,
    };
}

function updateStatus() {
    const template = readTemplate(README_TEMPLATE, ["{{TABLE}}"]);
    if (template === undefined)
        return;

    const years = getYears();
    const { table, earnedStars, totalStars } = renderTable(years);
    const output = template
        .replaceAll("{{TABLE}}", table)
        .replaceAll("{{EARNED_STARS}}", earnedStars)
        .replaceAll("{{TOTAL_STARS}}", totalStars);

    fs.writeFileSync(path.join(__dirname, "README.md"), output);
    console.log("README.md updated!");
}

function runPuzzle(year, day) {
    if (!year || !day)
        return fail("Please provide both a year and a day!");
    if (!/^\d{4}$/.test(year))
        return fail("The year must have 4 digits!");
    if (!/^\d+$/.test(day) || Number(day) < 1 || Number(day) > MAX_DAYS)
        return fail(`The day must be a number between 1 and ${MAX_DAYS}!`);

    const dayNumber = Number(day);
    const folder = dayPath(year, dayNumber);
    if (!fs.existsSync(path.join(__dirname, year)))
        return fail(`Year '${year}' does not exist!`);
    if (!fs.existsSync(folder))
        return fail(`Day '${dayNumber}' does not exist in year '${year}'!`);

    const inputFile = path.join(folder, "input.txt");
    if (!fs.existsSync(inputFile) || fs.statSync(inputFile).size === 0) {
        const relativeInput = path.relative(__dirname, inputFile);
        return fail(`Missing input for AoC ${year} Day ${dayNumber}.\nDownload it from ${inputUrl(year, dayNumber)} and save it to ${relativeInput}.`);
    }

    const script = path.join(folder, "index.js");
    if (!fs.existsSync(script))
        return fail(`Day '${dayNumber}' of year '${year}' has no index.js!`);

    const label = `Execution time for AoC ${year} Day ${formatDay(dayNumber)}`;
    console.time(label);
    require(script);
    console.timeEnd(label);
}

function main() {
    if (process.argv.length < 3)
        return showUsage();

    switch (process.argv[2]) {
        case "create":
            createNewYear(process.argv[3], process.argv[4]);
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
