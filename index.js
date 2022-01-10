import { useRef } from "react";
export function usePureCallback(deps, fn) {
    const argsRef = useRef({
        fn: (...args) => fn(argsRef.current.deps, ...args),
        deps
    });
    argsRef.current.deps = deps;
    return argsRef.current.fn;
}
