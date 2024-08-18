import Image from "next/image";
import Link from "next/link";

function PackageBox() {
  return (
    <div className="flex flex-col items-center justify-center shadow-md rounded-lg bg-white py-5 px-7">
      <div className="space-y-2 text-center flex flex-col items-center">
        <div className="relative w-fit">
          <Image
            id="package-badge"
            src="/asset/badge.svg"
            alt="Package Order Requirements Badge"
            width={0}
            height={0}
            className="absolute -right-20 -top-10 rotate-[30deg] duration-1000 w-[80px] aspect-square"
          />
          <h3 className="tracking-widest font-semibold uppercase text-2xl">
            Paket Hemat
          </h3>
        </div>
        <p className="text-sm">
          Kami menyediakan Paket Hemat yang dapat kamu pilih, dengan paket ini,
          kamu dapat mengujungi ke berbagai destinasi sekaligus dengan harga
          yang lebih murah.
        </p>
      </div>

      <div className="flex justify-center gap-10">
        <Link href="/#package-section" scroll>
          <div className="aspect-square w-[150px] shadow-lg rounded-full flex flex-col items-center justify-center text-center duration-1000 hover:shadow-primary relative overflow-hidden group">
            <h4 className="font-medium">Paket Healing</h4>
            <p className="">499k/Orang</p>

            <div className="text-white absolute bottom-0 min-h-fit px-3 py-3 text-xs bg-primary/50 w-full duration-1000">
              Detail Banefit
            </div>
          </div>
        </Link>
        <Link href="/#package-section" scroll>
          <div className="aspect-square w-[150px] shadow-lg rounded-full p-2 flex flex-col items-center justify-center text-center duration-1000 hover:shadow-primary relative overflow-hidden group">
            <h4 className="font-medium">Paket Travelling</h4>
            <p className="">1.2jt/Orang</p>

            <div className="text-white absolute bottom-0 min-h-fit px-3 py-3 text-xs bg-primary/50 w-full duration-1000">
              Detail Banefit
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default PackageBox;
