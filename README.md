# usePureCallback

**This is not a NPM package, this is simple snipet to copy paste it.**

Just copy the code above and paste it to your project.

> You can find `.ts` / `.d.ts` / `js` version of this code in the root of [the repo](https://github.com/artalar/usePureCallback).

```ts
import { useRef } from "react";

/**
 * Return a stable link to the decorated function,
 * which accept dynamic dependencies and other needed arguments
 * @example
 * // `handleChange` will always same, even if `props.onChange` changing.
 * const handleChange = usePureCallback(
 *   [props.onChange],
 *   ([onChange], event) => onChange(event.target.value)
 * )
 */
export function usePureCallback<Deps extends any[], Args extends any[], Return>(
  deps: Deps,
  fn: (deps: Deps, ...args: Args) => Return
): (...args: Args) => Return {
  const argsRef = useRef({
    fn: (...args: Args) => fn(argsRef.current.deps, ...args),
    deps
  });
  argsRef.current.deps = deps;
  return argsRef.current.fn;
}
```

## Motivation

You could memoize any kind of data, by it strict / shallow / deep / custom comparison except of a function. If function depends of some dynamic outer data, it shoud recreating by each data changing and even if the function used rarly, it will broke all above memoization, which we could call as a **parasite immutability**.
To prevent this harmful behaviour, we should separate 'dirty' data and function logic to mutable reference and pure function, which depend only by its arguments. The funny thing - we could do it super easy, check the code below.

## Limitations

In the rare cases you need to react to the function changing (do a side effect), which looks like antipatern already, but if you still need this behaviour, use native `useCallback`.

This code could produce errors in concurent rendering and errors in the subtree rendering. I will think about right implementation in the feature, PR / issue welcome!
