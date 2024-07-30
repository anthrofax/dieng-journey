import React from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ModalLayout = ({
  isCreating = false,
  document,
  description = '',
  children,
}: {
  isCreating?: boolean;
  document: any;
  description: string;
  children: React.ReactNode;
}) => {
  return (
    <DialogContent className="sm:max-w-[600px] h-fit h-min-[600px]">
      <DialogHeader >
        <DialogTitle>
          {isCreating ? "Tambah Data " : "Perbarui Data "}
          {document}
        </DialogTitle>
        <DialogDescription className="mt-10">{description}</DialogDescription>
      </DialogHeader>
      {children}
    </DialogContent>
  );
};

export default ModalLayout;
