function myInstanceof(obj, func) {
    let left = obj.__proto__;
    let right = func.protoType;
    
    while(true) {
        if(left == null) {
            return false;
        }
        if(left == right) {
            return true;
        }
        left = left.__proto__;
    }
}