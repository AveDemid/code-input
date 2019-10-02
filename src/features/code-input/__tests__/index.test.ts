import { mergeArraysWithOffset as m } from "./../utils";

describe("Test merging two arrays", () => {
  test("two void-filled arrays", () => {
    const arr1 = ["", "", "", "", ""];
    const arr2 = ["", "", "", "", ""];
    const successfulResult = ["", "", "", "", ""];

    expect(m(arr1, arr2)).toStrictEqual(successfulResult);
    expect(m(arr1, arr2, 0)).toStrictEqual(successfulResult);
    expect(m(arr1, arr2, 3)).toStrictEqual(successfulResult);
    expect(m(arr1, arr2, -3)).toStrictEqual(successfulResult);
    expect(m(arr1, arr2, 999)).toStrictEqual(successfulResult);
    expect(m(arr1, arr2, -999)).toStrictEqual(successfulResult);
  });

  test("void-filled array and value-filled arrays", () => {
    const arr1 = ["", "", "", "", ""];
    const arr2 = ["h", "e", "l", "l", "o"];

    expect(m(arr1, arr2)).toStrictEqual(["h", "e", "l", "l", "o"]);
    expect(m(arr1, arr2, 0)).toStrictEqual(["h", "e", "l", "l", "o"]);
    expect(m(arr1, arr2, 3)).toStrictEqual(["", "", "", "h", "e"]);
    expect(m(arr1, arr2, -3)).toStrictEqual(["l", "o", "", "", ""]);
    expect(m(arr1, arr2, 999)).toStrictEqual(["", "", "", "", ""]);
    expect(m(arr1, arr2, -999)).toStrictEqual(["", "", "", "", ""]);
  });

  test("value-filled array and void-felled arrays", () => {
    const arr1 = ["h", "e", "l", "l", "o"];
    const arr2 = ["", "", "", "", ""];

    expect(m(arr1, arr2)).toStrictEqual(["", "", "", "", ""]);
    expect(m(arr1, arr2, 0)).toStrictEqual(["", "", "", "", ""]);
    expect(m(arr1, arr2, 3)).toStrictEqual(["h", "e", "l", "", ""]);
    expect(m(arr1, arr2, -3)).toStrictEqual(["", "", "l", "l", "o"]);
    expect(m(arr1, arr2, 999)).toStrictEqual(["h", "e", "l", "l", "o"]);
    expect(m(arr1, arr2, -999)).toStrictEqual(["h", "e", "l", "l", "o"]);
  });

  test("partially-filled and partially-filled", () => {
    const arr1 = ["", "", "", "l", "o"];
    const arr2 = ["h", "e", "l", "", ""];

    expect(m(arr1, arr2)).toStrictEqual(["h", "e", "l", "", ""]);
    expect(m(arr1, arr2, 0)).toStrictEqual(["h", "e", "l", "", ""]);
    expect(m(arr1, arr2, 3)).toStrictEqual(["", "", "", "h", "e"]);
    expect(m(arr1, arr2, -3)).toStrictEqual(["", "", "", "l", "o"]);
    expect(m(arr1, arr2, 999)).toStrictEqual(["", "", "", "l", "o"]);
    expect(m(arr1, arr2, -999)).toStrictEqual(["", "", "", "l", "o"]);
  });
});
