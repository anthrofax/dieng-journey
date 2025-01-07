"use client";

import { useFormStatus } from "react-dom";

interface RenderParameterType {
  pending: boolean;
  type: 'submit'
}

function FormSubmitButton({
  render,
}: {
  // eslint-disable-next-line no-unused-vars
  render: (params: RenderParameterType) => React.ReactNode;
}) {
  const { pending } = useFormStatus();
  const type = "submit";

  return render({ pending, type });
}

export default FormSubmitButton;
