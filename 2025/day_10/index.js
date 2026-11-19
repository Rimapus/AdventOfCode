const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n/).map(elem => {
    const split = elem.split(" ");

    const pattern = split[0].slice(1, -1).split("").map(light => light === "#");
    const buttons = split.slice(1, -1).map(button => button.slice(1, -1).split(",").map(Number));
    const joltage = split.at(-1).slice(1, -1).split(",").map(Number);

    return [pattern, buttons, joltage];
});


console.log("AoC 2025 Day 10:");

// Part 1
function checkSequence(buttonSequence, targetPattern) {
    const currentPattern = Array(targetPattern.length).fill(false);

    for (const button of buttonSequence) {
        button.forEach(light => {
            currentPattern[light] = !currentPattern[light];
        });
    }

    return currentPattern.every((light, i) => light === targetPattern[i]);
}

function isButtonInSequence(button, buttonSequence) {
    return buttonSequence.some(sequenceButton => {
        return sequenceButton.every((light, i) => light === button[i]);
    });
}

let answer1 = 0;
for (const machine of input) {
    let buttonSequences = machine[1].map(button => [button]);

    while (true) {
        if (buttonSequences.some(sequence => checkSequence(sequence, machine[0]))) {
            answer1 += buttonSequences[0].length;
            break;
        }

        const newButtonSequences = [];
        buttonSequences.forEach(sequence => {
            machine[1].forEach(newButton => {
                if (!isButtonInSequence(newButton, sequence))
                    newButtonSequences.push(sequence.concat([newButton]));
            });
        });
        buttonSequences = newButtonSequences;
    }
}
console.log(`Part 1 answer: ${answer1}`); // 550


// Part 2
const { init } = require("z3-solver"); // Please forgive me ^^

(async () => {
    const { Context } = await init();
    const Z3 = Context("main");

    let answer2 = 0;
    for (const machine of input) {
        const opt = new Z3.Optimize();

        const variables = machine[1].map((_, i) => {
            const variable = Z3.Int.const(`${i}`);
            opt.add(Z3.GE(variable, Z3.Int.val(0)));
            return variable;
        });

        machine[2].forEach((joltage, joltageIndex) => {
            const impactingButtonsIndex = machine[1]
                .map((button, i) => [button, i])
                .filter(button => button[0].includes(joltageIndex))
                .map(button => button[1]);
            const impactingButtonsVariable = variables.filter((_, i) => impactingButtonsIndex.includes(i));

            const variableSum = impactingButtonsVariable.reduce((a, b) => a.add(b));
            opt.add(variableSum.eq(joltage));
        });

        const variableSum = variables.reduce((a, b) => a.add(b));
        opt.minimize(variableSum);

        await opt.check();
        const model = opt.model();

        const buttonPresses = variables.reduce((a, b) => a + Number(model.get(b).value()), 0);
        answer2 += buttonPresses;
    }

    console.log(`Part 2 answer: ${answer2}`); // 20042
})();
