import { Maybe, Wrapper } from '@fluss/core';

declare module '@fluss/web' {
  /**
   * Select element from parent node. By default selects from **document**.
   * Safe variant of `document.querySelector` method.
   */
  export function querySelector<T extends Element = Element>(
    selector: string,
    parent?: ParentNode
  ): Maybe<T>;

  /**
   * Select elements from parent node. By default selects from **document**.
   * Functional variant of `document.querySelectorAll` method.
   */
  export function querySelectorAll<T extends Element = Element>(
    selector: string,
    parent?: ParentNode
  ): ReadonlyArray<T>;

  /**
   * Gets parent element of child element.
   * Safe variant of `child.closest` method.
   */
  export function closest<T extends Element = Element>(
    selector: string,
    child: Element
  ): Maybe<T>;

  /**
   * Creates element and wraps it in wrapper object.
   * Alternative to `document.createElement` method.
   */
  export function createElement<T extends keyof HTMLElementTagNameMap>(
    tagName: T,
    options?: ElementCreationOptions
  ): Wrapper<HTMLElementTagNameMap[T]>;

  /**
   * Create text node and wrap it in Wrapper.
   * Alternative to `document.createTextNode` method.
   */
  export function createTextNode(data: string): Wrapper<Text>;

  /** Set attribute for element. */
  export function setAttribute(
    element: Element,
    key: string,
    value: string
  ): void;

  /**
   * Get attribute value of element.
   */
  export function getAttribute(element: Element, name: string): Maybe<string>;

  /** Checks if element has attribute. */
  export function hasAttribute(element: Element, name: string): boolean;

  /** Removes attribute from element if it has one. */
  export function removeAttribute(element: Element, name: string): void;
}
