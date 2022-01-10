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
export function usePureCallback(deps, fn) {
    const argsRef = useRef({
        fn: (...args) => fn(argsRef.current.deps, ...args),
        deps
    });
    argsRef.current.deps = deps;
    return argsRef.current.fn;
}
