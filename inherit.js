// 寄生组合式继承
function inherit(subType, superType) {
    let prototype = Object.create(superType.prototype);
    prototype.constructor = subType;
    subType.prototype = prototype
}