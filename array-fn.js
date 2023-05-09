Array.prototype.myPush = function (...args) {
    const length = this.length;
    for (let i = 0; i < args.length; i++) {
        this[length + i] = args[i];
    }
    return this.length;
}

Array.prototype.myFilter = function (fn) {
    const arr = [];
    for (let i = 0; i < this.length; i++) {
        if (fn(this[i], i, this)) {
            arr.push(this[i]);
        }
    }
    return arr;
}

Array.prototype.myMap = function (fn) {
    const arr = [];
    for (let i = 0; i < this.length; i++) {
        arr.push(fn(this[i], i, this))
    }
    return arr;
}

Array.prototype.mySort = function (fn) {
    for (let i = 0; i < this.length; i++) {
        for (j = 0; j < this.length - i - 1; j++) {
            if (fn(this[j], this[j + 1]) > 0) {
                let temp = this[j];
                this[j] = this[j + 1];
                this[j + 1] = temp;
            }
        }
    }
    return this;
}