module.exports = {
    testEnvironment: "jsdom",
    roots: ["<rootDir>"],
    testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
};
