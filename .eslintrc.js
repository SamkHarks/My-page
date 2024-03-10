module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jest/globals": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
        "plugin:prettier/recommended"
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
        "react", "jest", "import","@typescript-eslint", "prettier"
    ],
    "rules": {
        "indent": [
            "warn",
            2,
            { "SwitchCase": 1 }
        ],
        "linebreak-style": "off",
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
        "import/namespace": "error",
        "prettier/prettier": "error"
    },
    "settings": {
      "import/resolver": {
        "node": {
            "extensions": [".js", ".jsx", ".ts", ".tsx"],
            "moduleDirectory": ["src", "node_modules"]
          },
          "typescript": {
            "alwaysTryTypes": true,
            "project": "./tsconfig.json"
          }
      },
      "react": {
        "version": "detect"
      }
    }
}

