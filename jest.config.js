const packageJson = require('./package.json');

module.exports = {
  testPathIgnorePatterns: ['/node_modules/', 'fixtures.js'],
  modulePaths: ['<rootDir>/app/'],
  globals: {
    __BASE_URL__: 'http://localhost:9000', // use the dev development URL
    __VERSION__: packageJson.version,
  },
};
