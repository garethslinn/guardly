# Runbook for Guardly

## Overview

This runbook provides detailed instructions for managing the build, testing, and deployment processes of the Guardly project. Guardly provides security helper methods for front-end development.

## Prerequisites

Ensure you have the following installed on your machine:
- Node.js (version 14 or higher)
- npm (version 6 or higher)

## Scripts

The following npm scripts are available for managing the Guardly project:

### `build`

Compiles the TypeScript files into JavaScript.

```sh
npm run build
```

This command uses the TypeScript compiler (`tsc`) to compile `index.ts` to `dist/index.js`.

### `watch`

Watches for changes in TypeScript files and recompiles them automatically.

```sh
npm run watch
```

This is useful during development to ensure your changes are immediately compiled.

### `start`

Runs the compiled JavaScript file.

```sh
npm start
```

This command runs the `dist/index.js` file using Node.js.

### `test`

Runs the tests using Jest.

```sh
npm test
```

This command executes the test suite to ensure all functions work as expected.

### `minify`

Minifies the compiled JavaScript file.

```sh
npm run minify
```

This command uses `uglify-js` to minify `dist/index.js` and outputs `dist/index.min.js`.

### `dist`

Combines the `build` and `minify` scripts to compile and minify the code.

```sh
npm run dist
```

## Workflow

1. **Building the Project**:
    - To compile the TypeScript files into JavaScript, run:
      ```sh
      npm run build
      ```

2. **Watching for Changes**:
    - During development, use:
      ```sh
      npm run watch
      ```

3. **Running the Project**:
    - To execute the compiled JavaScript file, run:
      ```sh
      npm start
      ```

4. **Running Tests**:
    - To run the test suite, use:
      ```sh
      npm test
      ```

5. **Minifying the Code**:
    - To minify the compiled JavaScript, run:
      ```sh
      npm run minify
      ```

6. **Building and Minifying for Distribution**:
    - To perform both build and minify steps, run:
      ```sh
      npm run dist
      ```

By following this runbook, you can efficiently manage the build, testing, and deployment processes for the Guardly project.

---