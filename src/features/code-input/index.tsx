import React, { useEffect, useRef, useState } from "react";

const BACKSPACE_KEY = 8;
const LEFT_ARROW_KEY = 37;
const RIGHT_ARROW_KEY = 39;
const UP_ARROW_KEY = 38;
const DOWN_ARROW_KEY = 40;
const SPACE_KEY = 32;
const TAB_KEY = 9;

const mergeArraysWithOffset = (
  arr1: string[],
  arr2: string[],
  offset: number
): string[] => {
  return arr1.map((value, idx) => {
    const hasNewValue = idx >= offset && typeof arr2[idx - offset] === "string";

    return hasNewValue ? arr2[idx - offset] : value;
  });
};

interface CodeInputProps {
  fields: number;
  onChange?(value: string): void;
  onLastChange?(): void;
}

export const CodeInput = ({
  fields,
  onChange,
  onLastChange
}: CodeInputProps) => {
  const [values, setValue] = useState<string[]>([...Array(fields).fill("")]);

  const [idxToFocus, setIdxToFocus] = useState<number>(0);

  const refsOnInput = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: {
        value,
        dataset: { idx }
      }
    } = event;

    const nextState = mergeArraysWithOffset(
      values,
      value.replace(/\s+/g, "").split(""),
      Number(idx)
    );

    // eslint-disable-next-line
    // prettier-ignore
    const idxToFocus = value.length + Number(idx) > fields - 1
                          ? fields - 1 
                          : value.length + Number(idx);

    setValue(nextState);
    setIdxToFocus(idxToFocus);
  };

  const handleRef = (ref: null | HTMLInputElement, idx: number) => {
    refsOnInput.current[idx] = ref;
  };

  const handleMouseDown = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    event.preventDefault();
    const { currentTarget } = event;

    currentTarget && currentTarget.select();
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    const { target } = event;
    target && target.select();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const {
      keyCode,
      key,
      currentTarget: {
        value,
        dataset: { idx }
      }
    } = event;

    switch (keyCode) {
      case BACKSPACE_KEY:
        event.preventDefault();
        if (value) {
          setValue(mergeArraysWithOffset(values, [""], Number(idx)));
        } else {
          setIdxToFocus(Number(idx) - 1);
        }
        break;
      case LEFT_ARROW_KEY:
        event.preventDefault();
        setIdxToFocus(Number(idx) - 1);
        break;
      case RIGHT_ARROW_KEY:
        event.preventDefault();
        setIdxToFocus(Number(idx) + 1);
        break;
      case UP_ARROW_KEY:
        event.preventDefault();
        break;
      case DOWN_ARROW_KEY:
        event.preventDefault();
        break;
      case SPACE_KEY:
        event.preventDefault();
        break;
      case TAB_KEY:
        event.preventDefault();
        if (event.shiftKey) {
          setIdxToFocus(Number(idx) - 1);
        } else {
          setIdxToFocus(Number(idx) + 1);
        }
        break;
      default:
        if (key === value) {
          setIdxToFocus(Number(idx) + 1);
        }
    }
  };

  // Focus control
  useEffect(() => {
    const inputToFocus = refsOnInput.current[idxToFocus];

    if (inputToFocus) {
      inputToFocus.focus();
    }
  }, [idxToFocus, refsOnInput]);

  // Raising value
  useEffect(() => {
    if (onChange) {
      onChange(values.join(""));
    }
  }, [values, onChange]);

  // Capture of changes of the last input
  useEffect(() => {
    const lastInput = refsOnInput.current[fields - 1];

    if (
      lastInput &&
      lastInput.value &&
      idxToFocus === Number(lastInput.dataset.idx) &&
      onLastChange
    ) {
      onLastChange();
    }
  }, [fields, onLastChange, idxToFocus]);

  return (
    <div>
      {values.map((value, idx) => (
        <input
          type="text"
          key={idx}
          data-idx={idx}
          value={value}
          onChange={handleChange}
          onMouseDown={handleMouseDown}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          ref={ref => handleRef(ref, idx)}
          style={{
            width: "30px",
            height: "30px",
            fontSize: "30px",
            lineHeight: "30px"
          }}
        />
      ))}
    </div>
  );
};
