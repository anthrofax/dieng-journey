import ResetPasswordForm from "@/components/reset-password/reset-password-form";
import { MdOutlineTravelExplore } from "react-icons/md";

function ResetPasswordLastStep() {
  return (
    <section
      className=" bg-no-repeat bg-cover bg-blend-darken relative"
      style={{ backgroundImage: "url('/img/brand_image_3.jpg')" }}
    >
      <div className="absolute w-full h-full bg-black/50 mix-blend-multiply" />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0 relative">
        <a
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-white"
        >
          <MdOutlineTravelExplore size={25} />
          Dieng Journey
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="space-y-2 text-center">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-secondaryBlack md:text-xl dark:text-white">
                Ganti Kata Sandi
              </h1>
              <p className="text-primaryBlack font-bold">
                Masukkan kata sandi baru anda disini
              </p>
            </div>

            <ResetPasswordForm />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResetPasswordLastStep;
