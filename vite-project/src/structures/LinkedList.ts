export interface Song {
  id: number;
  title: string;
  artist: string;
  duration: string;
}

class Node<T> {
  data: T;
  next: Node<T> | null = null;

  constructor(data: T) {
    this.data = data;
  }
}

export class LinkedList<T> {
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;
  private size = 0;

  append(data: T): void {
    const newNode = new Node(data);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      if (this.tail) {
        this.tail.next = newNode;
      }
      this.tail = newNode;
    }
    this.size++;
  }

  getAll(): T[] {
    const items: T[] = [];
    let current = this.head;

    while (current !== null) {
      items.push(current.data);
      current = current.next;
    }

    return items;
  }

  getAt(index: number): T | null {
    if (index < 0 || index >= this.size) {
      return null;
    }

    let current = this.head;
    let count = 0;

    while (current !== null) {
      if (count === index) {
        return current.data;
      }
      current = current.next;
      count++;
    }

    return null;
  }

  getSize(): number {
    return this.size;
  }

  clear(): void {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  print(): void {
    let current = this.head;
    let result = '';

    while (current !== null) {
      result += JSON.stringify(current.data) + ' -> ';
      current = current.next;
    }

    result += 'null';
    console.log(result);
  }
}
