module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jest/globals": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2022,
        "sourceType": "module"
    },
    "plugins": [
        "react", "jest", "import"
    ],
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "warn",
            "always"
        ],
        "eqeqeq": "error",
        "no-trailing-spaces": "error",
        "object-curly-spacing": [
            "error", "always"
        ],
        "arrow-spacing": [
            "error", { "before": true, "after": true }
        ],
        "no-console": 0,
        "react/prop-types": 0,
        "import/no-unresolved": "error",
        "import/named": "error",
        "import/default": "error",
        "import/namespace": "error"
    },
    "settings": {
      "react": {
        "version": "detect"
      }
    }
}