const fs = require("fs")
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8")

input = input.split(/\r?\n/).map(elem => [elem.split(" ")[0], Number(elem.split(" ")[1])])


console.log("AoC 2023 Day 7:")

const cardsLabel1 = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"]
const cardsLabel2 = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"]

const rankHand = (hand, part2 = false) => {

    let handOccurences
    if (part2) {
        // const jokerCount = hand[0].split("").filter(card => card === "J").length

        handOccurences = Object.values(
            hand[0].split("").filter(card => card !== "J").reduce(function (acc, curr) {
                return acc[curr] ? ++acc[curr] : acc[curr] = 3, acc
            }, {})
        )
        console.log(hand, handOccurences)

    } else {
        handOccurences = Object.values(
            hand[0].split("").reduce(function (acc, curr) {
                return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
            }, {})
        )
    }

    

    if (handOccurences.includes(5)) return 6 // Five of a kind
    if (handOccurences.includes(4)) return 5 // Four of a kind
    if (handOccurences.includes(3) && handOccurences.includes(2)) return 4 // Full house
    if (handOccurences.includes(3)) return 3 // Three of a kind

    const handPairCount = handOccurences.filter((count) => count === 2).length
    if (handPairCount === 2) return 2 // Two pair
    if (handPairCount === 1) return 1 // One pair

    return 0 // High card
}

const sortHands = (hand1, hand2, part2 = false) => {
    const hand1Rank = rankHand(hand1, part2)
    const hand2Rank = rankHand(hand2, part2)

    if (hand1Rank !== hand2Rank) return (hand1Rank < hand2Rank ? -1 : 1)

    for (let i = 0; i < 5; i++) {
        if (hand1[0][i] !== hand2[0][i]) {
            return cardsLabel1.indexOf(hand1[0][i]) > cardsLabel1.indexOf(hand2[0][i]) ? -1 : 1
        }
    }
}

// Part 1
console.log(`Part 1 answer: ${input.sort(sortHands).map((hand, i) => hand[1] * (i + 1)).reduce((a, b) => a + b)}`) // 253313241


// Part 2
console.log(input.sort((a, b) => sortHands(a, b, true)))
console.log(`Part 2 answer: ${""}`) // 