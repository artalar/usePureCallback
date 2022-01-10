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
export declare function usePureCallback<Deps extends any[], Args extends any[], Return>(deps: Deps, fn: (deps: Deps, ...args: Args) => Return): (...args: Args) => Return;
