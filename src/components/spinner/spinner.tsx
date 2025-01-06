'use client'

import { Spinner as FlowbiteSpinner } from "flowbite-react";
import { createPortal } from "react-dom";

function Spinner() {
  return createPortal(
    <FlowbiteSpinner className="absolute top-1/2 left-1/2" size="xl" />,
    document.body
  );
}

export default Spinner;
