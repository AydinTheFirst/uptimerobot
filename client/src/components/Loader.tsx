import { Spinner } from "flowbite-react";
import React from "react";

export const Loader = () => {
  return (
    <div
      className="absolute left-0 top-0 z-10 bg-slate-100  dark:bg-slate-900"
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <div className="flex h-full items-center justify-center">
        <Spinner aria-label="Default status example" size={"xl"} />
      </div>
    </div>
  );
};
