import { Button } from "@/components/ui/button";
import { IoIosClose } from "react-icons/io";

const Modal = ({
  onClose,
  children,
}: {
  onClose: () => void;
  children: React.ReactNode;
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
        <Button
          variant="ghost"
          className="absolute right-3 top-3 p-1 hover:bg-secondary/50 group"
          onClick={onClose}
        >
          <IoIosClose className="text-5xl group-hover:text-white" />
        </Button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
