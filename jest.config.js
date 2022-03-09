/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ["<rootDir>/."],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  // Runs special logic, such as cleaning up components
  // when using React Testing Library and adds special
  // extended assertions to Jest
  setupFilesAfterEnv: [
    // "@testing-library/cleanup-after-each",
    // "@testing-library/jest-dom/extend-expect"
    './rtl.setup.ts'
  ],
  // Module file extensions for importing
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
};