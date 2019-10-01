import React, { useRef, useState } from "react";

import {
  LEFT_ARROW_KEY,
  RIGHT_ARROW_KEY,
  BACKSPACE_KEY,
  UP_ARROW_KEY,
  DOWN_ARROW_KEY
} from "./constants";

const useArrayValues = (length: number, fill?: any) => {
  const [values, setValues] = useState<string[]>([...Array(length).fill(fill)]);

  return [values, setValues] as [string[], (value: any) => void];
};

const mergeArraysWithOffset = (
  arr1: any[],
  arr2: any[],
  offset: number
): any[] => {
  return arr1.map((value, idx) => {
    const hasNewValue = idx >= offset && typeof arr2[idx - offset] === "string";

    return hasNewValue ? arr2[idx - offset] : value;
  });
};

export const CodeInput = ({ fields }: { fields: number }) => {
  const [values, setValue] = useArrayValues(fields, "");
  const refsOnInput = useRef<{ [key: string]: HTMLInputElement | null }>({});

  // Handlers
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const idx = Number(event.target.dataset.idx);
    const value = event.target.value;
    const chars = value.split("").filter(char => /\S/.test(char));
    const nextState = mergeArraysWithOffset(values, chars, idx);

    // prettier-ignore
    // eslint-disable-next-line
    const nextIndex = idx + chars.length < fields - 1
      ? idx + chars.length
      : fields - 1;

    const nextInput = refsOnInput.current[nextIndex];

    setValue(nextState);
    nextInput && nextInput.focus();
  };

  const handleRef = (ref: null | HTMLInputElement, idx: number) => {
    refsOnInput.current[idx] = ref;
  };

  const handleClick = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    event.currentTarget.select();
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    const key = event.key;
    const keyCode = event.keyCode;
    const idx = Number(event.currentTarget.dataset.idx);
    const nextInput = refsOnInput.current[idx + 1];
    const prevInput = refsOnInput.current[idx - 1];

    if (value === key) {
      const nextInput = refsOnInput.current[idx + 1];

      nextInput && nextInput.focus();
    }

    switch (keyCode) {
      case BACKSPACE_KEY:
        if (value.length === 0) {
          prevInput && prevInput.focus() && prevInput.select();
        } else {
          setValue(mergeArraysWithOffset(values, [""], idx));
        }
        break;
      case LEFT_ARROW_KEY:
        prevInput && prevInput.focus();
        break;
      case RIGHT_ARROW_KEY:
        nextInput && nextInput.focus();
        break;
      case UP_ARROW_KEY:
        event.preventDefault();
        break;
      case DOWN_ARROW_KEY:
        event.preventDefault();
        break;
      default:
        break;
    }
  };

  return (
    <div>
      {values.map((value, idx) => {
        return (
          <input
            type="text"
            key={idx}
            data-idx={idx}
            value={value}
            onChange={handleChange}
            onClick={handleClick}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            ref={ref => handleRef(ref, idx)}
          />
        );
      })}
    </div>
  );
};
