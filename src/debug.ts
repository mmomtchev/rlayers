/* istanbul ignore next */
const debug =
    typeof process === 'undefined' || typeof process.env.RLAYERS_DEBUG === 'undefined'
        ? () => undefined
        : // eslint-disable-next-line no-console
          console.debug.bind(window.console);
export default debug;
