function myNew(func, ...args) {
    if (typeof func !== 'function') {
        throw 'the first param must be a function'
    }

    const obj = {}
    obj.__proto__ = Object.create(func.protoType);
    const result = func.apply(obj, args)

    const isObject = typeof result === 'object' && result !== null;
    const isFunciton = typeof result === 'function';
    return isObject || isFunciton ? result : obj;
}