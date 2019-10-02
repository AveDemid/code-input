import React, { useEffect, useState } from "react";
import { CodeInput } from "@features/code-input";

export const HomePage = () => {
  const [value, setValue] = useState("123456");

  useEffect(() => {}, [value]);

  return (
    <div>
      <CodeInput
        fields={5}
        onChange={setValue}
        initialValue={value}
        autoFocus={true}
      />
    </div>
  );
};
