"use client";

import { Spinner as FlowbiteSpinner } from "flowbite-react";
import { createPortal } from "react-dom";

function Spinner() {
  if (typeof document !== "undefined") {
    return createPortal(
      <FlowbiteSpinner className="absolute top-1/2 left-1/2" size="xl" />,
      window.document.body
    );
  }
  return <FlowbiteSpinner className="absolute top-1/2 left-1/2" size="xl" />;
}

export default Spinner;
