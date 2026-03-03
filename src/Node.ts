// Node class for doubly linked circular list
export class Node {
  data: any;
  next: Node | null = null;
  prev: Node | null = null;

  constructor(data: any) {
    this.data = data;
  }
}

// Doubly Linked Circular List class
export class DoublyLinkedCircularList {
  head: Node | null = null;
  size: number = 0;

  insert(data: any) {
    const newNode = new Node(data);

    if (this.head === null) {
      this.head = newNode;
      newNode.next = newNode;
      newNode.prev = newNode;
    } else {
      const tail = this.head.prev!;
      newNode.next = this.head;
      newNode.prev = tail;
      tail.next = newNode;
      this.head.prev = newNode;
    }

    this.size++;
  }

  toArray(): any[] {
    if (this.head === null) return [];

    const result = [];
    let current: Node | null = this.head;

    for (let i = 0; i < this.size; i++) {
      result.push(current!.data);
      current = current!.next;
    }

    return result;
  }
}
