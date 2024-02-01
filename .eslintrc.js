module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jest/globals": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": '@typescript-eslint/parser',
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2022,
        "sourceType": "module"
    },
    "plugins": [
        "react", "jest", "import","@typescript-eslint"
    ],
    "rules": {
        "indent": [
            "warn",
            4
        ],
        "linebreak-style": [
            "warn",
            "windows"
        ],
        "semi": [
            "warn",
            "always"
        ],
        "eqeqeq": "error",
        "no-trailing-spaces": "warn",
        "object-curly-spacing": [
            "warn", "always"
        ],
        "arrow-spacing": [
            "warn", { "before": true, "after": true }
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