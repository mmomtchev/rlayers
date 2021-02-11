/* istanbul ignore next */
const debug =
    typeof process === 'undefined' || typeof process.env.DEBUG === 'undefined'
        ? () => undefined
        : console.debug.bind(window.console);
export default debug;
