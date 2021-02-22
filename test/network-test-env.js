const JSDOMEnvironment = require('jest-environment-jsdom');
const {ResourceLoader} = require('jsdom');

class CustomResourceLoader extends ResourceLoader {}

module.exports = class JSDOMEnvironmentWithResources extends JSDOMEnvironment {
    constructor(config, options) {
        super(
            {
                ...config,
                testEnvironmentOptions: {
                    ...config.testEnvironmentOptions,
                    resources: new CustomResourceLoader()
                }
            },
            options
        );
    }
};
