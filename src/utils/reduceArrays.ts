export function mergeArrays(...args: { path: string; component: JSX.Element; }[][]) {
    return [...args].reduce(
        (accumulator, currentValue) => accumulator.concat(currentValue),
        [] as any[]
    )
}
