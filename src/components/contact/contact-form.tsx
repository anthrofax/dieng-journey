"use client";

import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Mencegah perilaku default formulir

    // Ambil elemen formulir
    const form = event.target as HTMLFormElement;

    try {
      // Kirim formulir menggunakan Formspree
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setIsSubmitted(true);
        form.reset();
      } else {
        toast.error("Pesan anda gagal terkirim.");
        // Anda bisa menambahkan notifikasi kesalahan di sini
      }
    } catch (error) {
      toast.error("Terdapat kesalahan saat mengirimkan pesan.");
      console.log(error);
    }
  };

  return (
    <form
      method="post"
      action="https://formspree.io/f/xvgpblwl"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-4 lg:gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstname" className="sr-only">
              First Name
            </label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              className="py-3 lg:py-5 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-palewhite dark:border-gray-700 dark:text-black lg:placeholder:text-base"
              placeholder="Jhon"
              required
            />
          </div>

          <div>
            <label htmlFor="lastname" className="sr-only">
              Last Name
            </label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              className="py-3 lg:py-5 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-palewhite dark:border-gray-700 dark:text-black lg:placeholder:text-base"
              placeholder="Doe"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            className="py-3 lg:py-5 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-palewhite dark:border-gray-700 dark:text-black lg:placeholder:text-base"
            placeholder="johndoe@gmail.com"
            required
          />
        </div>

        <div>
          <label htmlFor="telepon" className="sr-only">
            Phone Number
          </label>
          <input
            type="tel"
            name="telepon"
            id="telepon"
            className="py-3 lg:py-5 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-palewhite dark:border-gray-700 dark:text-black lg:placeholder:text-base"
            placeholder="+62"
          />
        </div>

        <div>
          <label htmlFor="message" className="sr-only">
            Form Message
          </label>
          <textarea
            required
            id="message"
            name="message"
            rows={8}
            className="py-3 lg:py-5 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-palewhite dark:border-gray-700 dark:text-black lg:placeholder:text-base"
            placeholder="Sampaikan pesanmu disini."
          ></textarea>
        </div>
      </div>

      <div className="mt-4 grid">
        <button
          type="submit"
          className="inline-flex justify-center items-center gap-x-3 text-center bg-primary hover:bg-black border border-transparent text-sm lg:text-base text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4"
        >
          Kirim pesan
        </button>
      </div>

      {isSubmitted && (
        <div className="mt-3 text-center">
          <p className="text-sm text-green-500">
            Pesan berhasil terkirim, Kami akan melakukan respon terhadap pesan
            anda dalam 1-2 hari.
          </p>
        </div>
      )}
    </form>
  );
}

export default ContactForm;
