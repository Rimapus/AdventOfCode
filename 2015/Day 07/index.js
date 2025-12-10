// Code inspired by https://github.com/shahata/adventofcode-solver/blob/89d085ed8b245688c546e19ba0e43138a1b88161/src/2015/day07.js
const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n/);

const ops = {
    AND: (p1, p2) => (Math.pow(2, 16) + ((p1 || 0) & (p2 || 0))) % Math.pow(2, 16),
    OR: (p1, p2) => (Math.pow(2, 16) + ((p1 || 0) | (p2 || 0))) % Math.pow(2, 16),
    NOT: (p1, p2) => (Math.pow(2, 16) + ~(p2 || 0)) % Math.pow(2, 16),
    LSHIFT: (p1, p2) => (Math.pow(2, 16) + ((p1 || 0) << (p2 || 0))) % Math.pow(2, 16),
    RSHIFT: (p1, p2) => (Math.pow(2, 16) + ((p1 || 0) >> (p2 || 0))) % Math.pow(2, 16),
    undefined: p1 => (Math.pow(2, 16) + (p1 || 0)) % Math.pow(2, 16),
};


console.log("AoC 2015 Day 7:");

// Part 1
let wires = input
    .map(x =>
        x.match(/^(?:(\w+) )?(?:(AND|OR|NOT|LSHIFT|RSHIFT) (\w+) )?-> (\w+)$/),
    )
    .map(x => ({
        op: ops[x[2]],
        p1: x[1] && x[1].match(/^[a-z]+$/) ? circuit => circuit[x[1]]() : () => +x[1],
        p2: x[3] && x[3].match(/^[a-z]+$/) ? circuit => circuit[x[3]]() : () => +x[3],
        result: x[4],
    }))
    .reduce((circuit, gate) => {
        circuit[gate.result] = () => {
            const memo = gate.op(gate.p1(circuit), gate.p2(circuit));
            circuit[gate.result] = () => memo;
            return memo;
        };
        return circuit;
    }, {});

console.log(`Part 1 answer: ${wires.a()}`); // 3176


// Part 2
wires = input.concat(`${wires.a()} -> b`)
    .map(x =>
        x.match(/^(?:(\w+) )?(?:(AND|OR|NOT|LSHIFT|RSHIFT) (\w+) )?-> (\w+)$/),
    )
    .map(x => ({
        op: ops[x[2]],
        p1: x[1] && x[1].match(/^[a-z]+$/) ? circuit => circuit[x[1]]() : () => +x[1],
        p2: x[3] && x[3].match(/^[a-z]+$/) ? circuit => circuit[x[3]]() : () => +x[3],
        result: x[4],
    }))
    .reduce((circuit, gate) => {
        circuit[gate.result] = () => {
            const memo = gate.op(gate.p1(circuit), gate.p2(circuit));
            circuit[gate.result] = () => memo;
            return memo;
        };
        return circuit;
    }, {});

console.log(`Part 2 answer: ${wires.a()}`); // 14710
