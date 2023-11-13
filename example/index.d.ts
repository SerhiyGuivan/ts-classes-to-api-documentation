/**
 * Represents a node in a linked list.
 * @template V - Type of the value held by the node.
 * @template N - Type of the reference to the next node.
 */
declare abstract class LLNode<V, N> {
    abstract val: V;
    abstract next: N | null;
}
/**
 * Represents a base linked list.
 * @template V - Type of the value held by the list.
 * @template N - Type of the reference to the nodes in the list.
 */
declare abstract class BaseLinkedList<V, N> {
    protected _head: N | null;
    protected _tail: N | null;
    protected _length: number;
    protected constructor();
    /**
     * Get the reference to the head node of the list.
     * @returns {N | null} - Reference to the head node.
     */
    get head(): N | null;
    /**
     * Get the reference to the tail node of the list.
     * @returns {N | null} - Reference to the tail node.
     */
    get tail(): N | null;
    /**
     * Get the size of the list.
     * @returns {number} - The size of the list.
     */
    get size(): number;
    /**
     * Check if the list is empty.
     * @returns {boolean} - Indicates whether the list is empty or not.
     */
    get isEmpty(): boolean;
    /**
     * Add a new node with the provided value to the end of the list.
     * @param {V} val - Value to be added to the list.
     * @returns {BaseLinkedList<V, N>} - Updated list.
     */
    abstract push(val: V): BaseLinkedList<V, N>;
    /**
     * Remove and return the value from the end of the list.
     * @returns {V | undefined} - Removed value.
     */
    abstract pop(): V | undefined;
    /**
     * Remove and return the value from the beginning of the list.
     * @returns {V | undefined} - Removed value.
     */
    abstract shift(): V | undefined;
    /**
     * Add a new node with the provided value to the beginning of the list.
     * @param {V} val - Value to be added to the beginning of the list.
     * @returns {BaseLinkedList<V, N>} - Updated list.
     */
    abstract unshift(val: V): BaseLinkedList<V, N>;
    /**
     * Get the value at the specified index.
     * @param {number} index - Index of the value to retrieve.
     * @returns {V | undefined} - Retrieved value.
     */
    abstract at(index: number): V | undefined;
    /**
     * Get the node at the specified index.
     * @param {number} index - Index of the node to retrieve.
     * @returns {N | null} - Retrieved node.
     */
    abstract nodeAt(index: number): N | null;
    /**
     * Set the value at the specified index.
     * @param {number} index - Index where the value needs to be set.
     * @param {V} val - Value to be set.
     * @returns {boolean} - Indicates if the value was successfully set or not.
     */
    abstract setAt(index: number, val: V): boolean;
    /**
     * Insert a value at the specified index.
     * @param {number} index - Index where the value needs to be inserted.
     * @param {V} val - Value to be inserted.
     * @returns {boolean} - Indicates if the value was successfully inserted or not.
     */
    abstract insertAt(index: number, val: V): boolean;
    /**
     * Delete the value at the specified index.
     * @param {number} index - Index where the value needs to be deleted.
     * @returns {V | undefined} - Deleted value.
     */
    abstract deleteAt(index: number): V | undefined;
    /**
     * Reverse the order of the nodes in the list.
     * @returns {BaseLinkedList<V, N>} - Reversed list.
     */
    abstract reverse(): BaseLinkedList<V, N>;
    /**
     * Clears the linked list by resetting its properties.
     * @returns {void}
     * @timecomplexity O(1) - Constant time as it directly resets the properties.
     * @spacecomplexity O(1) - Constant space is used regardless of the list size.
     */
    clear(): void;
    /**
     * Checks if the provided index is a valid index within the list.
     * @param {number} index - Index to be checked.
     * @returns {boolean} - Indicates if the index is valid.
     */
    protected isValidIndex(index: number): boolean;
}

/**
 * Represents a node in a singly linked list.
 * @template T - Type of the value held by the node.
 */
declare class SLLNode<T> extends LLNode<T, SLLNode<T>> {
    val: T;
    next: SLLNode<T>;
    constructor(val: T);
}
/**
 * Represents a singly linked list.
 * @template T - Type of the value held by the list.
 */
declare class SinglyLinkedList<T> extends BaseLinkedList<T, SLLNode<T>> {
    /**
     * Create a new instance of SinglyLinkedList
     * @param {str} str
     */
    constructor(str: string);
    /**
     * Create a singly linked list from an array.
     * @param {T[]} data - Array to create the list from.
     * @returns {SinglyLinkedList<T>} - Singly linked list created from the array.
     * @timecomplexity O(n) - Where 'n' is the length of the input array.
     * @spacecomplexity O(n) - Additional space used is linearly proportional to the length of the input array.
     */
    static fromArray<T>(data: T[]): SinglyLinkedList<T>;
    /**
     * Adds a new node with the provided value to the end of the list.
     * @param {T} val - Value to be added to the list.
     * @returns {SinglyLinkedList<T>} - Updated list.
     * @timecomplexity O(1) - Constant time complexity as it only adds to the end of the list.
     * @spacecomplexity O(1) - Constant space is used regardless of the list size.
     */
    push(val: T): SinglyLinkedList<T>;
    /**
     * Removes and returns the value from the end of the list.
     * @returns {T | undefined} - Removed value.
     * @timecomplexity O(n) - Linear time as it may traverse the list to find the last element.
     * @spacecomplexity O(1) - Constant space is used regardless of the list size.
     */
    pop(): T | undefined;
    /**
     * Removes and returns the value from the beginning of the list.
     * @returns {T | undefined} - Removed value.
     * @timecomplexity O(1) - Constant time complexity as it only removes from the beginning of the list.
     * @spacecomplexity O(1) - Constant space is used regardless of the list size.
     */
    shift(): T | undefined;
    /**
     * Adds a new node with the provided value to the beginning of the list.
     * @param {T} val - Value to be added to the beginning of the list.
     * @returns {SinglyLinkedList<T>} - Updated list.
     * @timecomplexity O(1) - Constant time complexity as it only adds to the beginning of the list.
     * @spacecomplexity O(1) - Constant space is used regardless of the list size.
     */
    unshift(val: T): SinglyLinkedList<T>;
    /**
     * Get the value at the specified index.
     * @param {number} index - Index of the value to retrieve.
     * @returns {T | undefined} - Retrieved value.
     * @timecomplexity O(n) - Linear time as it may traverse the list to find the node at the specified index.
     * @spacecomplexity O(1) - Constant space is used regardless of the list size.
     */
    at(index: number): T | undefined;
    /**
     * Get the node at the specified index.
     * @param {number} index - Index of the node to retrieve.
     * @returns {SLLNode<T> | null} - Retrieved node or null if index is invalid.
     * @timecomplexity O(n) - Linear time as it may traverse the list to find the node at the specified index.
     * @spacecomplexity O(1) - Constant space is used regardless of the list size.
     */
    nodeAt(index: number): SLLNode<T> | null;
    /**
     * Set the value at the specified index.
     * @param {number} index - Index where the value needs to be set.
     * @param {T} val - Value to be set.
     * @returns {boolean} - Indicates if the value was successfully set or not.
     * @timecomplexity O(n) - Linear time as it may traverse the list to find the node at the specified index.
     * @spacecomplexity O(1) - Constant space is used regardless of the list size.
     */
    setAt(index: number, val: T): boolean;
    /**
     * Insert a value at the specified index.
     * @param {number} index - Index where the value needs to be inserted.
     * @param {T} val - Value to be inserted.
     * @returns {boolean} - Indicates if the value was successfully inserted or not.
     * @timecomplexity O(n) - Linear time as it may traverse the list to find the node before the specified index.
     * @spacecomplexity O(1) - Constant space is used regardless of the list size.
     */
    insertAt(index: number, val: T): boolean;
    /**
     * Delete the value at the specified index.
     * @param {number} index - Index where the value needs to be deleted.
     * @returns {T | undefined} - Deleted value or undefined if index is invalid.
     * @timecomplexity O(n) - Linear time as it may traverse the list to find the node before the specified index.
     * @spacecomplexity O(1) - Constant space is used regardless of the list size.
     */
    deleteAt(index: number): T | undefined;
    /**
     * Reverse the order of the nodes in the list.
     * @returns {SinglyLinkedList<T>} - The reversed list.
     * @timecomplexity O(n) - Linear time as it traverses through the entire list to reverse it.
     * @spacecomplexity O(1) - Constant space is used regardless of the list size.
     */
    reverse(): SinglyLinkedList<T>;
    /**
     * Rotate the list by the specified number of positions.
     * @param {number} n - Number of positions to rotate the list.
     * @returns {SinglyLinkedList<T>} - The rotated list.
     * @timecomplexity O(n) - Linear time as it may traverse through the list to perform rotations.
     * @spacecomplexity O(1) - Constant space is used regardless of the list size.
     */
    rotateByN(n: number): SinglyLinkedList<T>;
    /**
     * Convert the list to an array.
     * @returns {T[]} - An array containing the elements of the list in order.
     * @timecomplexity O(n) - Linear time as it traverses through the entire list to build the array.
     * @spacecomplexity O(n) - Additional space used is linearly proportional to the list's length.
     */
    toArray(): T[];
}

/**
 * Represents a node in a doubly linked list.
 * @template T - Type of the value held by the node.
 */
declare class DLLNode<T> extends LLNode<T, DLLNode<T>> {
    val: T;
    prev: DLLNode<T> | null;
    next: DLLNode<T> | null;
    constructor(val: T);
}
/**
 * Represents a doubly linked list.
 * @template T - Type of the value held by the list.
 */
declare class DoublyLinkedList<T> extends BaseLinkedList<T, DLLNode<T>> {
    /**
     * Create a new instance of DoublyLinkedList
     */
    constructor();
    /**
     * Creates a doubly linked list from an array.
     * @param {T[]} data - Array to create the list from.
     * @returns {DoublyLinkedList<T>} - Doubly linked list created from the array.
     * @timecomplexity O(n) - Linear time as it iterates through each element in the input array to create the list.
     * @spacecomplexity O(n) - Additional space used is directly proportional to the number of elements in the input array and the resulting list.
     */
    static fromArray<T>(data: T[]): DoublyLinkedList<T>;
    /**
     * Adds a new node with the provided value to the end of the list.
     * @param {T} val - Value to be added to the list.
     * @returns {DoublyLinkedList<T>} - Updated list.
     * @timecomplexity O(1) - Constant time as it adds an element at the end of the list.
     * @spacecomplexity O(1) - Constant space is used regardless of the list size.
     */
    push(val: T): DoublyLinkedList<T>;
    /**
     * Removes and returns the value from the end of the list.
     * @returns {T | undefined} - Removed value or undefined if the list is empty.
     * @timecomplexity O(1) - Constant time as it removes an element from the end of the list.
     * @spacecomplexity O(1) - Constant space is used regardless of the list size.
     */
    pop(): T | undefined;
    /**
     * Removes and returns the value from the beginning of the list.
     * @returns {T | undefined} - Removed value or undefined if the list is empty.
     * @timecomplexity O(1) - Constant time as it removes an element from the beginning of the list.
     * @spacecomplexity O(1) - Constant space is used regardless of the list size.
     */
    shift(): T | undefined;
    /**
     * Adds a new node with the provided value to the beginning of the list.
     * @param {T} val - Value to be added to the beginning of the list.
     * @returns {DoublyLinkedList<T>} - Updated list.
     * @timecomplexity O(1) - Constant time as it adds an element at the beginning of the list.
     * @spacecomplexity O(1) - Constant space is used regardless of the list size.
     */
    unshift(val: T): DoublyLinkedList<T>;
    /**
     * Returns the value at the specified index in the list.
     * @param {number} index - Index to retrieve the value from.
     * @returns {T | undefined} - Value at the index or undefined if the index is out of range.
     * @timecomplexity O(n) - Linear time in the worst case, as it traverses the list to reach the desired index.
     * @spacecomplexity O(1) - Constant space is used regardless of the list size.
     */
    at(index: number): T | undefined;
    /**
     * Retrieves the node at the specified index in the list.
     * @param {number} index - Index to retrieve the node from.
     * @returns {DLLNode<T> | null} - Node at the index or null if the index is out of range.
     * @timecomplexity O(n) - Linear time in the worst case, as it traverses the list to reach the desired index.
     * @spacecomplexity O(1) - Constant space is used regardless of the list size.
     */
    nodeAt(index: number): DLLNode<T> | null;
    /**
     * Sets the value at the specified index in the list.
     * @param {number} index - Index where the value should be set.
     * @param {T} val - Value to set at the index.
     * @returns {boolean} - True if the value is successfully set, false if the index is out of range.
     * @timecomplexity O(n) - Linear time in the worst case, as it traverses the list to reach the desired index.
     * @spacecomplexity O(1) - Constant space is used regardless of the list size.
     */
    setAt(index: number, val: T): boolean;
    /**
     * Inserts a new node with the provided value at the specified index in the list.
     * @param {number} index - Index where the value should be inserted.
     * @param {T} val - Value to insert at the index.
     * @returns {boolean} - True if the value is successfully inserted, false if the index is out of range.
     * @timecomplexity O(n) - Linear time in the worst case, as it might traverse the list to reach the desired index.
     * @spacecomplexity O(1) - Constant space is used regardless of the list size.
     */
    insertAt(index: number, val: T): boolean;
    /**
     * Deletes the node at the specified index in the list.
     * @param {number} index - Index of the node to be deleted.
     * @returns {T | undefined} - Value of the deleted node or undefined if the index is out of range.
     * @timecomplexity O(n) - Linear time in the worst case, as it might traverse the list to reach the desired index.
     * @spacecomplexity O(1) - Constant space is used regardless of the list size.
     */
    deleteAt(index: number): T | undefined;
    /**
     * Reverses the order of nodes in the list.
     * @returns {DoublyLinkedList<T>} - The reversed list.
     * @timecomplexity O(n) - Linear time, as it traverses the list to reverse the order of nodes.
     * @spacecomplexity O(1) - Constant space is used regardless of the list size.
     */
    reverse(): DoublyLinkedList<T>;
    /**
     * Converts the list into an array of its values.
     * @returns {T[]} - Array containing the values of the list.
     * @timecomplexity O(n) - Linear time, as it traverses the list to create the array of values.
     * @spacecomplexity O(n) - Additional space is directly proportional to the number of elements in the list.
     */
    toArray(): T[];
}

/**
 * Queue class represents a basic queue data structure that follows the First-In-First-Out (FIFO) principle.
 * It uses a singly linked list internally for efficient enqueue and dequeue operations.
 * @template T - The type of elements stored in the queue.
 */
declare class Queue<T> {
    list: SinglyLinkedList<T>;
    /**
     * Creates an instance of the Queue class.
     * The underlying data structure is a singly linked list.
     */
    constructor();
    /**
     * Retrieves the value at the front of the queue.
     * @returns {T | undefined} The value at the front of the queue, or undefined if the queue is empty.
     * @timecomplexity O(1) - Constant time complexity as accessing the head of a linked list is a constant time operation.
     * @spacecomplexity O(1) - Constant space complexity as no additional data structures are used.
     */
    get front(): T | undefined;
    /**
     * Retrieves the value at the rear of the queue.
     * @returns {T | undefined} The value at the rear of the queue, or undefined if the queue is empty.
     * @timecomplexity O(1) - Constant time complexity as accessing the tail of a linked list is a constant time operation.
     * @spacecomplexity O(1) - Constant space complexity as no additional data structures are used.
     */
    get rear(): T | undefined;
    /**
     * Returns the number of elements in the queue.
     * @returns {number} - The size of the queue.
     * @timecomplexity O(1)
     * @spacecomplexity O(1)
     */
    get size(): number;
    /**
     * Checks if the queue is empty.
     * @returns {boolean} - True if the queue is empty, false otherwise.
     * @timecomplexity O(1)
     * @spacecomplexity O(1)
     */
    get isEmpty(): boolean;
    /**
     * Adds an element to the rear of the queue and returns the new size of the queue.
     * @param {T} val - The value to enqueue.
     * @returns {number} - The updated size of the queue.
     * @timecomplexity O(1)
     * @spacecomplexity O(1)
     */
    enqueue(val: T): number;
    /**
     * Removes and returns the element from the front of the queue.
     * @returns {T | undefined} - The value dequeued from the front of the queue.
     * @timecomplexity O(1)
     * @spacecomplexity O(1)
     */
    dequeue(): T | undefined;
    /**
     * Retrieves the value at the front of the queue without removing it.
     * @returns {T | undefined} - The value at the front of the queue.
     * @timecomplexity O(1)
     * @spacecomplexity O(1)
     */
    peek(): T | undefined;
    /**
     * Retrieves the value at the rear of the queue without removing it.
     * @returns {T | undefined} - The value at the rear of the queue.
     * @timecomplexity O(1)
     * @spacecomplexity O(1)
     */
    peekRear(): T | undefined;
    /**
     * Removes all elements from the queue
     * @timecomplexity O(1)
     * @spacecomplexity O(1)
     */
    clear(): void;
    /**
     * Returns an array representation of the queue.
     * @returns {T[]} - An array containing all elements in the queue.
     * @timecomplexity O(n)
     * @spacecomplexity O(n)
     */
    toArray(): T[];
}

/**
 * Represents a stack data structure that follows the Last-In-First-Out (LIFO) principle.
 * It uses a singly linked list internally for efficient push and pop operations.
 * @template T - The type of elements in the stack.
 */
declare class Stack<T> {
    private list;
    /**
     * Creates a new instance of the Stack class.
     * The underlying data structure is a singly linked list.
     */
    constructor();
    /**
     * Retrieves the value at the top of the stack.
     * @returns {T | undefined} The value at the front of the queue, or undefined if the queue is empty.
     * @timecomplexity O(1) - Constant time complexity as accessing the head of a linked list is a constant time operation.
     * @spacecomplexity O(1) - Constant space complexity as no additional data structures are used.
     */
    get top(): T | undefined;
    /**
     * Returns the number of elements in the stack.
     * @returns {number} - The size of the stack.
     * @timecomplexity O(1)
     * @spacecomplexity O(1)
     */
    get size(): number;
    /**
     * Checks if the stack is empty.
     * @returns {boolean} - True if the stack is empty, false otherwise.
     * @timecomplexity O(1)
     * @spacecomplexity O(1)
     */
    get isEmpty(): boolean;
    /**
     * Adds a new element to the top of the stack.
     * @param {T} val - The value to be pushed onto the stack.
     * @timecomplexity O(1)
     * @spacecomplexity O(1)
     */
    push(val: T): void;
    /**
     * Removes and returns the element from the top of the stack.
     * @returns {T | undefined} The value popped from the stack, or undefined if the stack is empty.
     * @timecomplexity O(1)
     * @spacecomplexity O(1)
     */
    pop(): T | undefined;
    /**
     * Retrieves the value at the top of the stack without removing it.
     * @returns {T | undefined} The value at the top of the stack, or undefined if the stack is empty.
     * @timecomplexity O(1)
     * @spacecomplexity O(1)
     */
    peek(): T | undefined;
    /**
     * Removes all elements from the stack.
     * @timecomplexity O(1)
     * @spacecomplexity O(1)
     */
    clear(): void;
    /**
     * Returns an array representation of the stack.
     * @returns {T[]} An array containing the elements of the stack in top-to-bottom order.
     * @timecomplexity O(n)
     * @spacecomplexity O(n)
     */
    toArray(): T[];
}
