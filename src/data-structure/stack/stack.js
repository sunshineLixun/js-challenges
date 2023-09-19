class Stack {
  constructor() {
    this.dataSource = [];
  }

  push(element) {
    this.dataSource.push(element);
  }

  pop() {
    return this.dataSource.pop();
  }

  peek() {
    return this.dataSource[this.length() - 1];
  }

  clear() {
    this.dataSource = [];
  }

  length() {
    return this.dataSource.length;
  }

  isEmpty() {
    return this.dataSource.length == 0;
  }
}

// 进制转换 只针对2-9进制转换
function mulBase(num, base) {
  const stack = new Stack();
  do {
    stack.push(num % base);
    num = Math.floor((num /= base));
  } while (num > 0);
  let total = "";
  while (stack.length() > 0) {
    total += stack.pop().toString();
  }
  return total;
}

function decimalToBinary(decNumber) {
  const stack = new Stack();
  let rem; // 余数
  let number = decNumber;
  let binaryString = "";

  while (number > 0) {
    rem = Math.floor(number % 2);
    stack.push(rem);
    number = Math.floor(number / 2);
  }

  while (!stack.isEmpty()) {
    const pop = stack.pop();
    binaryString += pop.toString();
  }
  return binaryString;
}

// 验证一个字符串 是否是回文数
function isPalindrome(word) {
  const stack = new Stack();
  for (let index = 0, length = word.length; index < length; index++) {
    const str = word[index];
    stack.push(str);
  }
  let rWord = "";
  while (stack.length() > 0) {
    rWord += stack.pop().toString();
  }
  return word === rWord;
}

// n的阶乘
function fact(n) {
  const s = new Stack();
  while (n > 1) {
    s.push(n--);
  }
  let total = 1;
  while (s.length() > 0) {
    total *= s.pop();
  }
  return total;
}
