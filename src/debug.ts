const debug =
    typeof process === 'undefined' || typeof process.env.DEBUG === 'undefined'
        ? () => undefined
        : (...arg) => console.debug(arg);
export default debug;
