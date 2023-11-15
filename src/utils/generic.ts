export const compose = <T>(...functions: ((arg: T) => T)[]) => (input: T): T =>
  functions.reduce((acc, fn) => fn(acc), input)

export const isEqual = <T>(objA: T, objB: T): boolean => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stack: [any, any][] = [[objA, objB]]
  let result = true

  while (stack.length) {
    const [a, b] = stack.pop()!

    // Null and undefined comparations
    if (a === null || a === undefined || b === null || b === undefined) {
      if (a !== b) {
        result = false
        break
      }
    // Array comparations
    } else if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) {
        result = false
        break
      } else {
        for (let i = 0; i < a.length; i++) {
          stack.push([a[i], b[i]])
        }
      }
    // Object comparations
    } else if (typeof(a) === 'object' && typeof(b) === 'object') {
      const keysA = Object.keys(a)
      const keysB = Object.keys(b)

      if (keysA.length !== keysB.length) {
        result = false
        break
      } else {
        for (const key of keysA) {
          if (!keysB.includes(key)) {
            result = false
            break
          } else {
            stack.push([a[key]!, b[key]!])
          }
        }
      }
    // Primitive comparations
    } else {
      if (a !== b) {
        result = false
        break
      }
    }
  }

  return result

}
