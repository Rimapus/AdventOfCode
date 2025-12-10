const handleParamMode = (mode, val, memory) => {
    if (!mode || mode === "0") return memory[val];
    else return val;
};

function runComputer(computerInputs, inputMemory) {
    let memory = JSON.parse(JSON.stringify(inputMemory));
    let computerOutput, inputPointer = 0;

    let finished = false;
    let i = 0;
    while (!finished) {
        const parametersMode = memory[i].toString().split("").reverse().slice(2);
        const params = [...Array(3)].map((_, idx) => handleParamMode(parametersMode[idx], memory[i + idx + 1], memory));

        switch (+memory[i].toString().slice(-2)) {
            case 1:
                memory[memory[i + 3]] = params[0] + params[1];
                i += 4;
                break;

            case 2:
                memory[memory[i + 3]] = params[0] * params[1];
                i += 4;
                break;

            case 3:
                memory[memory[i + 1]] = computerInputs[inputPointer];
                inputPointer++;
                i += 2;
                break;

            case 4:
                computerOutput = params[0];
                i += 2;
                break;

            case 5:
                if (params[0] !== 0) {
                    i = params[1];
                } else i += 3;
                break;

            case 6:
                if (params[0] === 0) {
                    i = params[1];
                } else i += 3;
                break;

            case 7:
                if (params[0] < params[1]) {
                    memory[memory[i + 3]] = 1;
                } else memory[memory[i + 3]] = 0;
                i += 4;
                break;

            case 8:
                if (params[0] === params[1]) {
                    memory[memory[i + 3]] = 1;
                } else memory[memory[i + 3]] = 0;
                i += 4;
                break;

            case 99:
                finished = true;
                break;
        }
    }
    memory = JSON.parse(JSON.stringify(inputMemory));
    return computerOutput;
}

module.exports = { runComputer }; // For day 7 (and more ?)
