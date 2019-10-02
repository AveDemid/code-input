export const mergeArraysWithOffset = (
  arr1: string[],
  arr2: string[],
  offset = 0
): string[] =>
  arr1.map((value, idx) => {
    const hasNewValue = idx >= offset && typeof arr2[idx - offset] === "string";

    return hasNewValue ? arr2[idx - offset] : value;
  });
