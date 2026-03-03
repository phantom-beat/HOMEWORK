export interface Page {
  id: number;
  title: string;
  url: string;
  timestamp: string;
}

class DoublyNode<T> {
  data: T;
  next: DoublyNode<T> | null = null;
  prev: DoublyNode<T> | null = null;

  constructor(data: T) {
    this.data = data;
  }
}

export class DoublyLinkedList<T> {
  private head: DoublyNode<T> | null = null;
  private tail: DoublyNode<T> | null = null;
  private currentNode: DoublyNode<T> | null = null;
  private size = 0;

  append(data: T): void {
    const newNode = new DoublyNode(data);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
      this.currentNode = newNode;
    } else {
      if (this.tail) {
        this.tail.next = newNode;
        newNode.prev = this.tail;
      }
      this.tail = newNode;
      this.currentNode = newNode;
    }
    this.size++;
  }

  getNext(): T | null {
    if (this.currentNode && this.currentNode.next) {
      this.currentNode = this.currentNode.next;
      return this.currentNode.data;
    }
    return null;
  }

  getPrev(): T | null {
    if (this.currentNode && this.currentNode.prev) {
      this.currentNode = this.currentNode.prev;
      return this.currentNode.data;
    }
    return null;
  }

  getCurrentPage(): T | null {
    return this.currentNode ? this.currentNode.data : null;
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

  getSize(): number {
    return this.size;
  }

  clear(): void {
    this.head = null;
    this.tail = null;
    this.currentNode = null;
    this.size = 0;
  }

  canGoForward(): boolean {
    return this.currentNode !== null && this.currentNode.next !== null;
  }

  canGoBack(): boolean {
    return this.currentNode !== null && this.currentNode.prev !== null;
  }

  print(): void {
    let current = this.head;
    let result = '';

    while (current !== null) {
      result += JSON.stringify(current.data) + ' <-> ';
      current = current.next;
    }

    result += 'null';
    console.log(result);
  }
}
