const fs = require("fs")
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8")

input = input.split(/\r?\n/).map(elem => [elem.split(" ")[0], Number(elem.split(" ")[1])])


console.log("AoC 2023 Day 7:")

const cardsLabel1 = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"]
const cardsLabel2 = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"]

const rankHand = (hand, part2 = false) => {
    let occurences =
        hand[0].split("").reduce(function (acc, curr) {
            return acc[curr] ? acc[curr]++ : acc[curr] = 1, acc
        }, {})

    if (part2) {
        const jokerCount = occurences["J"]

        if (jokerCount && jokerCount !== 5) {
            delete occurences["J"]

            const maxOccurence = Object.entries(occurences).sort((a, b) => {
                return b[1] - a[1]
            })[0][0]

            occurences[maxOccurence] += jokerCount
        }
    }

    occurences = Object.values(occurences)

    if (occurences.includes(5)) return 6 // Five of a kind
    if (occurences.includes(4)) return 5 // Four of a kind
    if (occurences.includes(3) && occurences.includes(2)) return 4 // Full house
    if (occurences.includes(3)) return 3 // Three of a kind

    const handPairCount = occurences.filter((count) => count === 2).length
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
            return (part2 ? cardsLabel2 : cardsLabel1).indexOf(hand1[0][i]) > (part2 ? cardsLabel2 : cardsLabel1).indexOf(hand2[0][i]) ? -1 : 1
        }
    }

}

// Part 1
console.log(`Part 1 answer: ${input.sort(sortHands).map((hand, i) => hand[1] * (i + 1)).reduce((a, b) => a + b)}`) // 253313241


// Part 2
// Thx https://www.reddit.com/r/adventofcode/comments/18cnzbm/comment/kcf5pe0/ for the part 2
console.log(`Part 2 answer: ${input.sort((a, b) => sortHands(a, b, true)).map((hand, i) => hand[1] * (i + 1)).reduce((a, b) => a + b)}`) // 253362743
