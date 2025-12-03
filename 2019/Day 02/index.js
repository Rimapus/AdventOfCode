const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(",")
    .map(Number);


console.log("AoC 2019 Day 2:");

let answer1, answer2;
let memory = JSON.parse(JSON.stringify(input));

for (let noun = 0; noun < 99; noun++) {
    for (let verb = 0; verb < 99; verb++) {
        memory[1] = noun;
        memory[2] = verb;

        let finished = false;
        let i = 0;
        while (!finished) {
            switch (memory[i]) {
                case 1:
                    memory[memory[i + 3]] = memory[memory[i + 1]] + memory[memory[i + 2]];
                    break;

                case 2:
                    memory[memory[i + 3]] = memory[memory[i + 1]] * memory[memory[i + 2]];
                    break;

                case 99:
                    finished = true;
                    break;
            }
            i += 4;
        }

        if (noun === 12 && verb === 2) answer1 = memory[0];
        if (memory[0] === 19690720) answer2 = 100 * noun + verb;
        else memory = JSON.parse(JSON.stringify(input));
    }
    if (answer2) break;
}

// Part 1
console.log(`Part 1 answer: ${answer1}`); // 4576384


// Part 2
console.log(`Part 2 answer: ${answer2}`); // 5398