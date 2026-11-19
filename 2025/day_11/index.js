const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n/).map(elem => {
    const split = elem.split(": ");
    return [split[0], split[1].split(" ")];
});
input = Object.fromEntries(input);


console.log("AoC 2025 Day 11:");

function getPathCountRec(startDevice, endDevice, devices, usedDevices) {
    if (usedDevices[startDevice])
        return usedDevices[startDevice];

    if (startDevice === endDevice)
        return 1;

    const pathsCount = devices[startDevice]?.reduce((a, b) => a + getPathCountRec(b, endDevice, devices, usedDevices), 0);

    usedDevices[startDevice] = pathsCount;
    return pathsCount;
}

// Part 1
console.log(`Part 1 answer: ${getPathCountRec("you", "out", input, {})}`); // 508


// Part 2
function getPathsReversed(startDevice, endDevice, devices) {
    const pathStack = [[endDevice]];
    const finishedPaths = [];

    while (pathStack.length > 0) {
        const currentPath = pathStack.shift();
        const firstPathDevice = currentPath[0];

        if (firstPathDevice === startDevice) {
            finishedPaths.push(currentPath);
            continue;
        }

        const possibleNewDevices = Object.entries(devices)
            .filter(device => device[1].includes(firstPathDevice))
            .map(device => device[0])
            .filter(newDevice => !currentPath.includes(newDevice));

        const newPaths = [];
        possibleNewDevices?.forEach(newDevice => {
            newPaths.push([newDevice].concat(currentPath));
        });

        pathStack.push(...newPaths);
    }
    return finishedPaths;
}

const svrFftPaths = getPathsReversed("svr", "fft", input);
const dacOutUsedDevices = {};
const dacOutPathCount = getPathCountRec("dac", "out", input, dacOutUsedDevices);

const usedDevices = Array.from(new Set(svrFftPaths.concat(Object.keys(dacOutUsedDevices)).flat()));
const unusedInput = Object.fromEntries(Object.entries(input)
    .filter(device => device[0] === "fft" || !usedDevices.includes(device[0]))
    .map(device => [device[0], device[1].filter(connectedDevice => connectedDevice === "dac" || !usedDevices.includes(connectedDevice))]));

const fftDacPathsCount = getPathCountRec("fft", "dac", unusedInput, {});

console.log(`Part 2 answer: ${svrFftPaths.length * fftDacPathsCount * dacOutPathCount}`); // 315116216513280
