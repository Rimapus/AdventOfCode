// ==UserScript==
// @name         AoC style
// @version      1
// @description  Better AoC style
// @author       https://github.com/saidaspen
// @source       https://gist.github.com/saidaspen/cbf216aa4be971a65b55426b884aee72
// @match        https://adventofcode.com/*
// @run-at       document-start
// @grant        GM_addStyle

// ==/UserScript==

GM_addStyle(`
input ~ span:before,
.leaderboard-entry,
.privboard-row {
    font-family: "Source Code Pro", monospace;
    letter-spacing: 1px;
}

body * {
    text-shadow: none !important;
}
article em {
    font-weight: bold;
    color: #22ff68
}

main > article + p,
main > article:not(:last-of-type) {
    opacity: 0.8;
}

code {
    font-family: "Source Code Pro", monospace;
    letter-spacing: 1px;
    color: #ff6e6e
}

article code em {
    color: #ff6e6e
}
`);
