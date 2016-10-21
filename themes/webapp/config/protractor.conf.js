'use strict';
let path = require('path');
exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: [path.resolve('src/**/*.e2e.js')]
};