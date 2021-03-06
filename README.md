# @fluss/web - make Web more functional and safe

`@fluss/web` - small library that contains couple functions for interacting with DOM in safe and functional way.

## Example use

```typescript
const maybeBlock /*: Maybe<Element> */ = query('.block'); // Result is wrapped in `Maybe` because `document.querySelector` may return "null" if element doesn't exist on the page.
```

## Design goals

- Manual annotation should never be required, TypeScript should infer everything by self.
- The implementation of each function should be as minimal as possible.
- All functions are immutable, and there are no side-effects.
- All functions must be safe as much as possible.
- Do not override native methods, if they are already safe.

## @fluss/web's advantages

- TypeScript included

TypeScript definitions are included in the library.

Functions that deals with attributes (`getAttribute`, `setAttribute`, `hasAttribute`, `removeAttribute` and `toggleAttribute`) do not allow to set to element attribute, that do nothing for it. Each attribute is restricted to some HTML element(s), so it is reasonable to check such restriction. [More about which attribute belongs to which element is at MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes).

- Small size

Every function is created as small as possible.

## Install

```sh
npm i @fluss/web
```

## Import

```js
import { query } from '@fluss/web';
// or
import { query } from '@fluss/web/query';
```

## API

Package is bundled as _ES module_. It doesn't support _CommonJS_. If you need it convert with any tool (`Rollup`, `Babel` etc.).

> In TypeScript examples is used [Flow](https://flow.org)'s comment notation if type is inferred.

### query

```typescript
function query<T extends Element>(
  selector: string,
  parent?: ParentNode | Maybe<ParentNode> | null
): Maybe<T>;
```

Select element on the page.

```typescript
const same /*: Maybe<Element> */ = query('.gd'); // search inside whole document
const inner /*: Maybe<HTMLElement> */ = query<HTMLElement>('.gd', same); // search inside same
```

### queryAll

```typescript
function queryAll<T extends Element>(
  selector: string,
  parent?: ParentNode | Maybe<ParentNode> | null
): ReadonlyArray<T>;
```

Select elements on the page.

```typescript
const same /*: ReadonlyArray<HTMLElement> */ = queryAll<HTMLElement>('.gd'); // search inside whole document
const inner /*: ReadonlyArray<HTMLElement> */ = queryAll<HTMLElement>(
  '.gd',
  someElement
); // search inside someElement
```

### closest

```typescript
function closest<T extends Element>(
  selector: string,
  child: Element | Maybe<Element> | null
): Maybe<T>;
```

Find closest ancestor that match selector.

```typescript
const parent /*: Maybe<Element> */ = closest('.block', childElement);
```

### setAttribute

```typescript
function setAttribute<E extends Element>(
  element: E | Maybe<E> | null,
  key: AttributeNamesOf<E> | GlobalAttributeNames,
  value: string
): void;
```

Set attribute for element.

```typescript
query('div').map((el) => setAttribute(el, 'class', 'el'));
```

### getAttribute

```typescript
function getAttribute<E extends Element>(
  element: E | Maybe<E> | null,
  name: AttributeNamesOf<E> | GlobalAttributeNames
): Maybe<string>;
```

Gets attribute value of element.

```typescript
const attributeValue /*: Maybe<string> */ = query('div').chain((el) =>
  getAttribute(el, 'class')
);
```

### hasAttribute

```typescript
function hasAttribute<E extends Element>(
  element: E | Maybe<E> | null,
  name: AttributeNamesOf<E> | GlobalAttributeNames
): boolean;
```

Checks if element has attribute.

```typescript
const hasElementAttribute /*: boolean */ = hasAttribute(query('div'), 'class');
```

### removeAttribute

```typescript
function removeAttribute<E extends Element>(
  element: E | Maybe<E> | null,
  name: AttributeNamesOf<E> | GlobalAttributeNames
): void;
```

Removes attribute from element if it has one.

```typescript
const hasElementAttribute /*: boolean */ = query('div')
  .map((el) => {
    removeAttribute(el, 'class');
    return el;
  })
  .map((el) => hasAttribute(el, 'class'))
  .extract();
```

### toggleAttribute

```typescript
function toggleAttribute<E extends Element>(
  element: E | Maybe<E> | null,
  name: BooleanAttributesOf<E>,
  force?: boolean
): boolean;
```

Toggles a `Boolean attribute` (removing it if it is present and adding it if it is not present) on the given element.

```typescript
const hasElementAttribute /*: boolean */ = toogleAttribute(
  query('input'),
  'readonly'
).extract();
```

### on

```typescript
function on<E extends EventTarget, T extends keyof EventMapOf<E>>(
  element: E | Maybe<E> | null,
  type: T,
  listener: CustomEventListenerOrEventListenerObject<E, T>,
  options: {
    add?: boolean | AddEventListenerOptions;
    remove?: boolean | EventListenerOptions;
  } = {}
): () => void;
```

Add an event listener to element.
The listener argument sets the callback that will be invoked when the event is dispatched.

`options.add` is options for native _addEventListener_ method and
`options.remove` is options for native _removeEventListener_ method.

Returns function that removes `listener` from _element_ with same `type` and options.

```typescript
const removeClickOnParagraphListener /*: () => void */ = query<HTMLParagraphElement>(
  'p'
)
  .map((p) => on(p, 'click', console.log))
  .extract();
```
