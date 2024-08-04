'use client'

type Props = {
  onClose: () => void;
  icon: any;
  judul: string;
  pesan: string;
  onClickIya: any;
  labelIya?: string;
  labelTidak?: string;
  onClickTidak?: () => void;
};

function ConfirmationBox({
  onClose,
  icon,
  judul,
  pesan,
  labelIya,
  labelTidak,
  onClickIya,
  onClickTidak,
}: Props) {
  return (
    <div
      className="bg-white/20 backdrop-blur-lg rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-[999] mb-4 mx-4 md:relative shadow-lg"
      onClick={onClose}
    >
      <div className="md:flex items-center">
        <div className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto text-xl">
          {icon}
        </div>
        <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
          <p className="font-bold">{judul}</p>
          <p className="text-sm text-gray-700 mt-1">{pesan}</p>
        </div>
      </div>
      <div className="text-center md:text-right mt-4 md:flex md:justify-end">
        <button
          id="confirm-delete-btn"
          className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
          onClick={onClickIya}
        >
          {labelIya || "Iya"}
        </button>
        <button
          id="confirm-cancel-btn"
          className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4 md:mt-0 md:order-1"
          onClick={onClickTidak || onClose}
        >
          {labelTidak || "Tidak"}
        </button>
      </div>
    </div>
  );
}

export default ConfirmationBox;
