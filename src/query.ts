import { maybe, Maybe } from '@fluss/core/maybe';

/**
 * Select element from parent node. By default selects from **document**.
 * Safe variant of `document.querySelector` method.
 */
export function query<T extends keyof HTMLElementTagNameMap>(
  selector: T,
  parent?: ParentNode | Maybe<ParentNode> | null
): Maybe<HTMLElementTagNameMap[T]>;
export function query<T extends Element>(
  selector: string,
  parent?: ParentNode | Maybe<ParentNode> | null
): Maybe<T | null>;
export function query<T extends Element>(
  selector: string,
  parent?: ParentNode | Maybe<ParentNode> | null
): Maybe<T | null> {
  return maybe(parent ?? document).map((element) =>
    element.querySelector<T>(selector)
  );
}
