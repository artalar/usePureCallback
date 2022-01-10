export declare function usePureCallback<Deps extends any[], Args extends any[], Return>(deps: Deps, fn: (deps: Deps, ...args: Args) => Return): (...args: Args) => Return;
