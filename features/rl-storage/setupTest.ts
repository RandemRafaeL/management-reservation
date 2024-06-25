const localStorageMock = (() => {
    let store = {};
    return {
        getItem(key: string) {
            return store[key] || null;
        },
        setItem(key: string, value: unknown) {
            store[key] = value.toString();
        },
        removeItem(key: string) {
            delete store[key];
        },
        clear() {
            store = {};
        },
    };
})();

Object.defineProperty(global, 'localStorage', {
    value: localStorageMock,
});
