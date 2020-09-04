import { hasAttribute } from './has_attribute';
import { Maybe, maybeOf } from '@fluss/core';
import type { AttributeNamesOf, GlobalAttributeNames } from './types';

export function removeAttribute<E extends Element>(
  element: E | Maybe<E>,
  name: AttributeNamesOf<E> | GlobalAttributeNames
): void;
export function removeAttribute<E extends Element>(
  element: E | Maybe<E>,
  name: string
): void;
export function removeAttribute<E extends Element>(
  element: E | Maybe<E>,
  name: AttributeNamesOf<E> | GlobalAttributeNames | string
): void {
  if (hasAttribute(element, name)) {
    maybeOf(element).map((el) => el.removeAttribute(name));
  }
}
