const fs = require("fs")

if (process.argv.length < 3) return console.log('Please use this command like this:\nnode . create <year>\nnode . status\nnode . run <year> <day>')

switch (process.argv[2]) {
    case 'create':
        let newYear = process.argv[3]
        if (newYear.length !== 4) return console.log('Please provide the year with 4 digits!')
        if (fs.existsSync(`${__dirname}/${newYear}`)) return console.log(`Directory '${newYear}' already exists!`)

        for (let i = 0; i < 25; i++) {
            let newDay = "00".substring(0, 2 - (i + 1).toString().length) + (i + 1)
            fs.mkdirSync(`${__dirname}/${newYear}/Day ${newDay}`, { recursive: true })
            fs.writeFileSync(`${__dirname}/${newYear}/Day ${newDay}/input.txt`, '')
            fs.writeFileSync(`${__dirname}/${newYear}/Day ${newDay}/index.js`, `const fs = require("fs")\nlet input = fs.readFileSync(\`\${__dirname\}/input.txt\`, "utf8")\n\n\nconsole.log("AoC ${newYear} Day ${i + 1}:")\n\n// Part 1\nconsole.log(\`Part 1 answer: \${""}\`) // \n\n\n// Part 2\nconsole.log(\`Part 2 answer: \${""}\`) // `)
        }

        break;


    case 'status':
        let years = fs.readdirSync(__dirname).filter(elem => !fs.lstatSync(elem).isFile() && !isNaN(+elem))
        let days = fs.readdirSync(`${__dirname}/${years[0]}`)

        let output = `# [AdventOfCode](https://adventofcode.com/)\n\n${`| **\`⭐{EARNED_STARS}/${years.length * 50}\`** | ` + days.join(" | ") + " |"}\n${"| :---: ".repeat(days.length + 1) + "|"}`

        let totalStars = 0
        years.forEach(year => {
            let yearOutput = `| [${year}](https://adventofcode.com/${year} '⭐{YEAR_STARS}/50') |`
            let yearStars = 0

            days.forEach(day => {
                let dayFile = fs.readFileSync(`${__dirname}/${year}/${day}/index.js`).toString()
                let dayStars = dayFile.match(/console\.log\(`Part (?:1|2) answer:.+`\) \/\/ .+/g)?.length || 0

                yearStars += dayStars
                yearOutput += ` [${dayStars === 2 ? "🟢" : dayStars === 1 ? "🟡" : "🔴"}](https://adventofcode.com/${year}/day/${+day.split(" ")[1]} '⭐${dayStars}/2') |`
            })

            totalStars += yearStars
            output += `\n${yearOutput.replace("{YEAR_STARS}", yearStars)}`
        })

        output = output.replace("{EARNED_STARS}", totalStars)
        output += "\n\n*Pssst, you can click on the emojis to view the puzzles from that day*"
        fs.writeFileSync("README.md", output)

        break;


    case 'run':
        let year = process.argv[3]
        let day = "00".substring(0, 2 - process.argv[4].length) + process.argv[4]

        if (!fs.existsSync(`${__dirname}/${year}`)) return console.log(`Directory '${year}' doesn't exist!`)
        if (!fs.existsSync(`${__dirname}/${year}/Day ${day}`)) return console.log(`Directory '${year}/Day ${day}' doesn't exist!`)

        let hrstart = process.hrtime()
        require(`${__dirname}/${year}/Day ${day}`)
        let hrend = process.hrtime(hrstart)
        console.log(`Total execution time: ${hrend[0]}s ${hrend[1] / 1000000}ms`)

        break;
}