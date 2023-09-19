class Queue {
  constructor() {
    this.items = [];
  }
  enqueue(element) {
    this.items.push(element);
  }
  dequeue() {
    return this.items.shift();
  }
  peek() {
    return this.items[0];
  }
  isEmpty() {
    return this.items.length == 0;
  }
  size() {
    return this.items.length;
  }
  clear() {
    this.items = [];
  }
}

class Queue2 {
  constructor() {
    this.count = 0; // 记录增加的key
    this.lowestCount = 0; // 记录删除对应的key
    this.item = {};
  }

  enqueue(element) {
    this.item[this.count] = element;
    this.count++;
  }

  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }
    const result = this.item[this.lowestCount];
    delete this.item[this.lowestCount];
    this.lowestCount++;
    return result;
  }

  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    const result = this.item[this.lowestCount];
    return result;
  }

  isEmpty() {
    return this.size() == 0;
  }

  size() {
    return this.count - this.lowestCount;
  }

  clear() {
    this.item = {};
    this.count = 0;
    this.lowestCount = 0;
  }
}

// 双端队列

// 对象实现
class Deque {
  constructor() {
    this.count = 0; // 记录增加的key
    this.lowestCount = 0; // 记录删除对应的key
    this.item = {};
  }
  addFront(element) {
    if (this.isEmpty()) {
      this.addBack(element);
    } else if (this.lowestCount > 0) {
      this.lowestCount--;
      this.item[this.lowestCount] = element;
    } else {
      for (let i = this.count; i > 0; i--) {
        this.item[i] = this.item[i - 1];
      }
      this.count++;
      this.lowestCount = 0;
      this.item[this.lowestCount] = element;
    }
  }

  addBack(element) {
    this.item[this.count] = element;
    this.count++;
  }
  removeFront() {
    const result = this.item[this.lowestCount];
    delete this.item[this.lowestCount];
    this.lowestCount++;
    return result;
  }
  removeBack() {
    this.count--;
    const result = this.item[this.count];
    delete this.item[this.count];
    return result;
  }
  peekFront() {
    return this.item[this.lowestCount];
  }
  peekBack() {
    return this.item[this.count--];
  }
  isEmpty() {
    return this.size() == 0;
  }
  size() {
    return this.count - this.lowestCount;
  }
  clear() {
    this.item = {};
    this.count = 0;
    this.lowestCount = 0;
  }
  toString() {
    if (this.isEmpty()) {
      return "";
    }
    let total = `${this.item[this.lowestCount]}`;
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      const element = this.item[i];
      total = `${total}, ${element}`;
    }
    return total;
  }
}

// 数组实现
class Deque2 {
  constructor() {
    this.items = [];
  }
  addFront(element) {
    this.items.unshift(element);
  }

  addBack(element) {
    this.items.push(element);
  }
  removeFront() {
    return this.items.shift();
  }
  removeBack() {
    return this.items.pop();
  }
  peekFront() {
    return this.items[0];
  }
  peekBack() {
    return this.items[this.items.length - 1];
  }
  isEmpty() {
    return this.size() == 0;
  }
  size() {
    return this.items.length;
  }
  clear() {
    this.items = [];
  }

  toString() {
    return this.items.join(",");
  }
}
