class EventPubSub {
    constructor() {
        this.events = {}
    }

    on(type, callback) {
        if (!this.events[type]) {
            this.events[type] = [callback];
        } else {
            this.events[type].push(callback);
        }
    }

    off(type, callback) {
        if (!this.events[type]) {
            return;
        }
        this.events[type] = this.events[type].filter(item => {
            return item != callback;
        })
    }

    emit(type, ...args) {
        if (!this.events[type]) {
            return;
        }
        this.events[type].forEach(callback => {
            callback.apply(this, args)
        })
    }

    once(type, callback) {
        function f() {
            callback();
            this.off(type, f);
        }
        this.on(type, f);
    }
}