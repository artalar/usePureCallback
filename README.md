# usePureCallback

**This is not a NPM package, this is simple snipet to copy paste it.**

[React docs reference](https://reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-usecallback).

Just copy the code below and paste it to your project.

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
 * @see {@link github.com/artalar/usePureCallback}
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

You could memoize any kind of data, by its strict / shallow / deep / custom comparison except a function. If the function depends on some dynamic outer data, it should be recreated by each data changing and even if the function is used rarely, it will break all below memoization, which we could call a **parasite immutability**.
To prevent this harmful behavior, we should separate 'dirty' data and function logic to mutable reference and pure function, which depend only on its arguments. The funny thing - we could do it super easy, check the code above.

## Limitations

In the rare cases you need to react to the function changing (do a side effect), which looks like antipattern already, but if you still need this behavior, use native `useCallback`.

This code could produce errors in concurrent rendering and failed subtree rendering. I will think about the right implementation in the feature, PR / issue welcome!
