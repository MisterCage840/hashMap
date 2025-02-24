const hashMap = (capacity = 3, loadFactor = 0.75) => {
  this.capacity = capacity;
  this.loadFactor = loadFactor;

  const getLoadFactor = () => loadFactor;
  const getCapacity = () => capacity;
  this.size = 0;

  this.buckets = new Array(this.capacity).fill(null).map(() => []);

  const hash = (key) => {
    let hashCode = 0;
    key = String(key);
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * (hashCode + key.charCodeAt(i))) % this.capacity;
    }

    return hashCode;
  };

  const set = (key, value) => {
    const index = hash(key);
    const bucket = this.buckets[index];

    for (let pair of bucket) {
      if (pair[0] === key) {
        pair[1] = value;
        return;
      }
    }

    bucket.push([key, value]);
    this.size++;

    if (this.size / this.capacity > this.loadFactor) {
      console.log("upgrading capacity");
      resize();
    }
  };

  const get = (key) => {
    const index = hash(key);
    const bucket = this.buckets[index];

    for (let pair of bucket) if (pair[0] === key) return pair[1];
    return false;
  };

  const has = (key) => {
    const index = hash(key);
    const bucket = this.buckets[index];

    for (let pair of bucket) if (pair[0] == key) return true;
    return false;
  };

  const remove = (key) => {
    const index = hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (pair[i][0] === key) {
        bucket.slice(i, 1);
        this.size--;
        return true;
      }
    }
    return false;
  };

  const length = () => {
    let storedKeys = 0;
    for (let bucket of this.buckets)
      for (let i = 0; i < bucket.length; i++) storedKeys++;
    return storedKeys;
  };

  const clear = () => {
    for (let bucket of this.buckets)
      for (let i = 0; i < bucket.length; i++) bucket.pop();
  };

  const keys = () => {
    let keysArray;
    for (let bucket of this.buckets)
      for (let pair of bucket) keysArray.push(pair[0]);
    return keysArray;
  };

  const values = () => {
    let valuesArray;
    for (let bucket of this.buckets)
      for (let pair of bucket) valuesArray.push(pair[1]);
    return valuesArray;
  };

  const toString = () => {
    let bucketsArray = [];

    for (let bucket of this.buckets)
      if (bucket)
        for (let i = 0; i < bucket.length; i++) {
          const string = "[" + bucket[i][0] + " , " + bucket[i][1] + "] , ";
          bucketsArray.push(string);
        }
    return bucketsArray;
  };

  const resize = () => {
    const newCapacity = this.capacity * 2;
    const newBuckets = new Array(newCapacity).fill(null).map(() => []);

    for (bucket of this.buckets) {
      for (const [key, value] of bucket) {
        const newIndex = hash(key) % newCapacity;
        newBuckets[newIndex].push([key, value]);
      }
    }
    this.capacity = newCapacity;
    this.buckets = newBuckets;
  };

  return {
    getLoadFactor,
    getCapacity,
    hash,
    set,
    get,
    has,
    remove,
    length,
    clear,
    keys,
    values,
    toString,
    resize,
  };
};

const h1 = hashMap();

h1.set("md", "supervisor");
console.log(h1.getCapacity());
h1.set("mahesh", "assorter");
console.log(h1.getCapacity());
h1.set("tejas", "assorter");
console.log(h1.getCapacity());

h1.set("mahesh", "manager");
h1.set("mahesh", "food Chef");

console.log(h1.toString());
