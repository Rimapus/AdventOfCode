const stylistic = require("@stylistic/eslint-plugin");

module.exports = [
    {
        plugins: {
            "@stylistic": stylistic
        },
        rules: {
            "@stylistic/semi": ["error", "always"],
            "@stylistic/semi-style": ["error", "last"],
            "@stylistic/indent": ["error", 4],
            "@stylistic/quotes": ["error", "double"],
            "@stylistic/linebreak-style": ["error", "unix"],
            "@stylistic/eol-last": ["error", "always"],
            "eqeqeq": ["error", "always"],
            "no-var": ["error"],
            "prefer-const": ["error"],
        }
    }
];
