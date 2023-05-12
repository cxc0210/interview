class MyPromise {
    static PENDING = 'pending';
    static FULFILLED = 'fulfilled';
    static REJECTED = 'rejected';

    constructor(func) {
        this.state = MyPromise.PENDING;
        this.result = null;
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];
        try {
            func(this.resolve.bind(this), this.reject.bind(this));
        } catch (error) {
            this.reject(error);
        }
    }

    resolve(result) {
        if (this.state === MyPromise.PENDING) {
            this.state = MyPromise.FULFILLED;
            this.result = result;
            this.onFulfilledCallbacks.forEach(callback => {
                callback(result);
            })
        }
    }

    reject(reason) {
        if (this.state === MyPromise.PENDING) {
            this.state = MyPromise.REJECTED;
            this.result = reason;
            this.onRejectedCallbacks.forEach(callback => {
                callback(reason)
            })
        }
    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : reason => {
            throw reason;
        }

        const promise2 = new MyPromise((resolve, reject) => {
            if (this.state === MyPromise.FULFILLED) {
                setTimeout(() => {
                    const x = onFulfilled(this.result);
                    resolvePromise(promise2, x, resolve, reject);
                })
            }

            if (this.state === MyPromise.REJECTED) {
                setTimeout(() => {
                    const x = onRejected(this.result);
                    resolvePromise(promise2, x, resolve, reject);
                })
            }

            if (this.state === MyPromise.PENDING) {
                this.onFulfilledCallbacks.push(() => {
                    setTimeout(() => {
                        const x = onFulfilled(this.result);
                        resolvePromise(promise2, x, resolve, reject);
                    })
                })
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        const x = onRejected(this.result);
                        resolvePromise(promise2, x, resolve, reject);
                    })
                })
            }
        })

        return promise2;
    }

    catch(onRejected) {
        return this.then(undefined, onRejected)
    }

    finally(callback) {
        return this.then((data) => {
            return MyPromise.resolve(callback()).then(() => data);
        }, (err) => {
            return MyPromise.resolve(callback().then(() => { throw err }))
        })
    }

    all()


}

function resolvePromise(promise, x, resolve, reject) {
    if (promise === x) {
        return reject(new TypeError('Chaining cycle detected for the promise.'));
    }

    if (x instanceof MyPromise) {
        x.then(resolve, reject);
    } else {
        resolve(x)
    }
}


Promise.myAll = function (promises) {
    let arr = [], count = 0;
    return new Promise((resolve, reject) => {
        promises.forEach((item, i) => {
            Promise.resolve(item).then((res) => {
                arr[i] = res;
                count++;
                if (count === promises.length) resolve(arr);
            }, reject)
        })
    })
}

Promise.myRace = function (promises) {
    return new Promise((resolve, reject) => {
        for (const item of promises) {
            Promise.resolve(item).then(resolve, reject)
        }
    })
}

Promise.myAny = function (promises) {
    let arr = [], count = 0;
    return new Promise((resolve, reject)=>{
        promises.forEach((item,i)=>{
            Promise.resolve(item).then(resolve,err =>{
                arr[i] = { status: 'rejected', val: err};
            })
            count++;
            if(count === promises.length) reject('no promise resolved.')
        })
    })
}