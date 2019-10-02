import React, { useEffect, useState } from "react";
import { CodeInput } from "@features/code-input";

export const HomePage = () => {
  const [value, setValue] = useState("");

  useEffect(() => {}, [value]);

  return (
    <div>
      <CodeInput
        fields={20}
        onChange={setValue}
        onLastChange={() => {
          console.log("i'm change :)");
        }}
      />
    </div>
  );
};
