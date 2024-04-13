const fs = require("fs")
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8")

input = input.split(",")
    .map(Number)


console.log("AoC 2019 Day 5:")

let memory = JSON.parse(JSON.stringify(input))

const handleParamMode = (mode, val) => {
    if (!mode || mode === "0") return memory[val]
    else return val
}

function runComputer(computerInput) {
    let computerOutput

    let finished = false
    let i = 0
    while (!finished) {
        const parametersMode = memory[i].toString().split("").reverse().slice(2)
        let params = [...Array(3)].map((_, idx) => handleParamMode(parametersMode[idx], memory[i + idx + 1]))

        switch (+memory[i].toString().slice(-2)) {
            case 1:
                memory[memory[i + 3]] = params[0] + params[1]
                i += 4
                break;

            case 2:
                memory[memory[i + 3]] = params[0] * params[1]
                i += 4
                break;

            case 3:
                memory[memory[i + 1]] = computerInput
                i += 2
                break;

            case 4:
                computerOutput = params[0]
                i += 2
                break;

            case 5:
                if (params[0] !== 0) {
                    i = params[1]
                } else i += 3
                break;

            case 6:
                if (params[0] === 0) {
                    i = params[1]
                } else i += 3
                break;

            case 7:
                if (params[0] < params[1]) {
                    memory[memory[i + 3]] = 1
                } else memory[memory[i + 3]] = 0
                i += 4
                break;

            case 8:
                if (params[0] === params[1]) {
                    memory[memory[i + 3]] = 1
                } else memory[memory[i + 3]] = 0
                i += 4
                break;

            case 99:
                finished = true
                break;
        }
    }
    memory = JSON.parse(JSON.stringify(input))
    return computerOutput
}

// Part 1
console.log(`Part 1 answer: ${runComputer(1)}`) // 7265618


// Part 2
console.log(`Part 2 answer: ${runComputer(5)}`) // 7731427