class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
    }

    get(key) {
        if(this.cache.has(key)){
            let temp = this.cache.get(key);
            this.cache.delete(key);
            this.cache.set(key, temp);
            return temp;
        }
        return -1
    }

    put(key, value) {
        if(this.cache.has(key)){
            this.cache.delete(key)
        } else if(this.cache.size >= this.capacity){
            this.cache.delete(this.cache.keys().next().value);
        }

        this.cache.set(key,value);
    }
}