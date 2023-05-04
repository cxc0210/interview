Function.prototype.myCall = function (context, ...args) {
    context = context || window;
    args = args || [];

    const key = Symbol();
    context[key] = this;
    const result = context[key](...args);
    delete context[key];

    return result;
}

Function.prototype.myApply = function (context, args) {
    context = context | window
    args = args | [];

    const key = Symbol();
    context[key] = this;
    const result = context[key](...args);
    delete context[key];

    return result;
}

Function.prototype.myBind = function (context, ...args) {
    const fn = this;
    return function newFn(...newArgs) {
        if (fn instanceof newFn) {
            return new fn(...args, ...newArgs)
        }
        return fn.apply(context, [...args, ...newArgs])
    }
}