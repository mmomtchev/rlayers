module.exports = {
    createSQLiteHTTPPool: () =>
        Promise.resolve({
            open: () => Promise.resolve({}),
            exec: () => Promise.resolve([{row: ['minZoom', '12']}, {row: ['format', 'png']}]),
            close: () => Promise.resolve(undefined)
        })
};
