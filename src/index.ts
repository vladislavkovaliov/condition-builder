class Node<T> {
  public value: T;
  public next: Node<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList<T> {
  public head: Node<T> | null;

  constructor() {
    this.head = null;
  }

  add = (value: T) => {
    const newNode = new Node(value);

    if (this.head === null) {
      this.head = newNode;
    } else {
      let cursor = this.head;

      while (cursor.next) {
        cursor = cursor.next;
      }

      cursor.next = newNode;
    }
  };

  remove = (value: T) => {
    if (this.head === null) {
      return;
    }

    if (this.head.value === value) {
      this.head = this.head.next;

      return;
    }

    let cursor = this.head;
    let prev: Node<T> | null = null;

    if (cursor !== null && cursor.value !== value && cursor.next !== null) {
      prev = cursor;
      cursor = cursor.next;
    }

    if (cursor === null) {
      return;
    }

    if (prev !== null) {
      prev.next = cursor.next;
    }
  };
}

export class ConditionBuilder<U> {
  private queue: LinkedList<{
    fn: () => boolean;
    result: U;
  }>;

  constructor() {
    this.queue = new LinkedList();
  }

  on = (fn: () => boolean, result: U): this => {
    this.queue.add({
      fn: fn,
      result: result,
    });

    return this;
  };

  build = (orElseFn: () => U): U => {
    let cursor = this.queue.head;

    while (cursor) {
      const { fn, result } = cursor.value;

      const fnResult = fn();

      if (fnResult) {
        return result;
      }

      cursor = cursor.next;
    }

    return orElseFn();
  };
}
