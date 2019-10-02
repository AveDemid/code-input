import React, { useEffect, useState } from "react";
import { CodeInput } from "@features/code-input";

export const HomePage = () => {
  const [value, setValue] = useState("");

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <div>
      <CodeInput fields={20} />
    </div>
  );
};
