class Subject {
    constructor() {
        this.observers = [];
    }

    add(observer) {
        this.observers.push(observer);
    }

    remove(observer) {
        this.observers.forEach((o, i) => {
            if (o === observer) {
                this.observers.splice(i, 1);
            }
        })
    }

    notifty() {
        this.observers.forEach(o => {
            o.update();
        })
    }
}

class Obverser {
    update() {
        // write logic
    }
}

const observer1 = new Obverser();
const observer2 = new Obverser();
const sub = new Subject();

observer1.update = function () {
    console.log('observer1 update');
}
observer2.update = function () {
    console.log('observer2 update');
}

sub.add(observer1);
sub.add(observer2);

sub.notifty();