import { Link2Icon } from "lucide-react";
import Link from "next/link";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { TbCirclesRelation } from "react-icons/tb";

function Contact() {
  return (
    <section className="bg-white" id="contact-section">
      <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="max-w-2xl lg:max-w-5xl mx-auto">
          <div className="text-center">
            <h1 className="text-center font-medium text-2xl sm:text-3xl tracking-widest">
              KONTAK KAMI
            </h1>
            <p className="mt-5 text-sm sm:text-base w-[80%] leading-8 text-center mx-auto mb-10">
              Kami Siap Mendengarkan Anda.
            </p>
          </div>

          <div className="mt-12 grid items-center lg:grid-cols-2 border border-palewhite rounded-lg justify-items-center px-5">
            <div className="flex flex-col rounded-xl p-4 sm:p-6 lg:p-8 h-full w-full">
              <h2 className="mb-5 text-xl font-medium text-black1 dark:text-palewhite">
                Sampaikan pesan melalui email disini.
              </h2>

              <form method="post" action="https://formspree.io/f/mqkvlywd">
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
                    />
                  </div>

                  <div>
                    <label htmlFor="telepon" className="sr-only">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="telepon"
                      id="telepon"
                      className="py-3 lg:py-5 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-palewhite dark:border-gray-700 dark:text-black lg:placeholder:text-base"
                      placeholder="+62"
                    />
                  </div>

                  <div>
                    <label htmlFor="detail" className="sr-only">
                      Details
                    </label>
                    <textarea
                      id="detail"
                      name="detail"
                      rows={8}
                      className="py-3 lg:py-5 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-palewhite dark:border-gray-700 dark:text-black lg:placeholder:text-base"
                      placeholder="Sampaikan pesanmu disini."
                    ></textarea>
                  </div>
                </div>

                <div className="mt-4 grid">
                  <button
                    type="submit"
                    className="inline-flex justify-center items-center gap-x-3 text-center bg-primary hover:bg-secondary border border-transparent text-sm lg:text-base text-white hover:text-black font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:focus:ring-offset-gray-800"
                  >
                    Kirim pesan
                  </button>
                </div>

                <div className="mt-3 text-center">
                  <p className="text-sm text-gray-500">
                    Kami akan melakukan respon terhadap pesan anda dalam 1-2
                    hari.
                  </p>
                </div>
              </form>
            </div>

            <div className="divide-y divide-gray-200 dark:divide-palewhite py-5">
              <div className="flex gap-x-7 py-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 105.51 172.02"
                  className="flex-shrink-0 w-10 h-10 mt-1.5 text-gray-800 dark:text-palewhite"
                >
                  <title>Lokasi</title>
                  <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_1-2" data-name="Layer 1">
                      <path
                        className="cls-1"
                        d="M104.92,44.38C98.88,11.48,66-8,35.17,3.16,22.47,7.77,12.79,15.93,6.53,28a5.28,5.28,0,0,0-1.46,2.65A44,44,0,0,0,.16,54.88c.76,9,4.23,17.27,7.49,25.54,11.81,30,26.16,58.79,39.85,87.91,1.1,2.33,2.79,3.74,5.43,3.69s4.2-1.41,5.3-3.81q10.07-21.86,20.31-43.62c8.35-17.8,16.49-35.7,23-54.27C104.57,61.92,106.57,53.38,104.92,44.38ZM71.34,63.53a21.72,21.72,0,0,1-24.68,10c-8.94-2.42-15.14-11-15.14-20.87A21,21,0,0,1,47.21,32.28c8.31-2,17.79-.31,24.53,10.65.67,1.72,1.33,3.43,2,5.14C74.06,53.4,74.21,58.63,71.34,63.53Z"
                      />
                      <path d="M104.92,44.38C98.88,11.48,66-8,35.17,3.16,22.47,7.77,12.79,15.93,6.53,28c-.39.94-.16,2.22-1.46,2.65A44,44,0,0,0,.16,54.88c.76,9,4.23,17.27,7.49,25.54,11.81,30,26.16,58.79,39.85,87.91,1.1,2.33,2.79,3.74,5.43,3.69s4.2-1.41,5.3-3.81q10.07-21.86,20.31-43.62c8.35-17.8,16.49-35.7,23-54.27C104.57,61.92,106.57,53.38,104.92,44.38ZM71.34,63.53a21.72,21.72,0,0,1-24.68,10c-8.94-2.42-15.14-11-15.14-20.87A21,21,0,0,1,47.21,32.28c8.31-2,17.79-.31,24.53,10.65.67,1.72,1.33,3.43,2,5.14C74.06,53.4,74.21,58.63,71.34,63.53Z" />
                      <path
                        className="cls-2"
                        d="M5.07,30.64A5.28,5.28,0,0,1,6.53,28C6.48,29.12,7.15,30.64,5.07,30.64Z"
                      />
                      <path
                        className="cls-1"
                        d="M73.74,48.07c-.67-1.71-1.33-3.42-2-5.14A8.68,8.68,0,0,1,73.74,48.07Z"
                      />
                      <path
                        className="cls-3"
                        d="M73.74,48.07c-.67-1.71-1.33-3.42-2-5.14C73.72,44.14,74.18,45.93,73.74,48.07Z"
                      />
                    </g>
                  </g>
                </svg>

                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-palewhite">
                    Lokasi:
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Jalan Prof. Soedarto, SH, Tembalang, Semarang, Jawa Tengah,
                    Indonesia. Kotak Pos 1269
                  </p>
                </div>
              </div>

              <div className="flex gap-x-2 py-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 105.51 172.02"
                  className="w-16 h-16 text-gray-800 dark:text-palewhite"
                >
                  <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_1-2" data-name="Layer 1">
                      <path
                        className="cls-1"
                        d="M83.1,65.75A24.51,24.51,0,0,1,81.15,74a8.61,8.61,0,0,1-3,3.36c-4.77,3.59-10,5.9-16.1,5.66a30.76,30.76,0,0,1-9.39-2.2c-5-1.83-10-3.49-14.54-6.24A86.4,86.4,0,0,1,21.78,61.45C16.53,56.2,11.65,50.64,8,44.12A82.23,82.23,0,0,1,.38,24,16.74,16.74,0,0,1,0,20,25.34,25.34,0,0,1,7,3.45c1.73-1.93,4.2-2.36,6.57-2.93A15.85,15.85,0,0,1,17.85,0a2.16,2.16,0,0,1,1.69.83,16.54,16.54,0,0,1,1.62,2.51c2.6,4.63,5,9.4,8,13.81,1.62,2.38,1.44,3.54-.5,5.67a48.63,48.63,0,0,1-5.38,4.65A30.85,30.85,0,0,0,20.62,30a3,3,0,0,0-.69,3.66,73.71,73.71,0,0,0,4.44,7.66A57.08,57.08,0,0,0,44.89,60.59a41.76,41.76,0,0,0,4.67,2.6A3,3,0,0,0,53,62.6a38,38,0,0,0,4.36-5A22.85,22.85,0,0,1,61,53.84c1.44-1.17,2.61-1.37,4.16-.35,4.2,2.75,8.61,5.13,13,7.56a40.24,40.24,0,0,1,3.66,2.1A2.73,2.73,0,0,1,83.1,65.75Z"
                      />
                      <path d="M83.1,65.75A24.51,24.51,0,0,1,81.15,74a8.61,8.61,0,0,1-3,3.36c-4.77,3.59-10,5.9-16.1,5.66a30.76,30.76,0,0,1-9.39-2.2c-5-1.83-10-3.49-14.54-6.24A86.4,86.4,0,0,1,21.78,61.45C16.53,56.2,11.65,50.64,8,44.12A82.23,82.23,0,0,1,.38,24,16.74,16.74,0,0,1,0,20,25.34,25.34,0,0,1,7,3.45c1.73-1.93,4.2-2.36,6.57-2.93A15.85,15.85,0,0,1,17.85,0a2.16,2.16,0,0,1,1.69.83,16.54,16.54,0,0,1,1.62,2.51c2.6,4.63,5,9.4,8,13.81,1.62,2.38,1.44,3.54-.5,5.67a48.63,48.63,0,0,1-5.38,4.65A30.85,30.85,0,0,0,20.62,30a3,3,0,0,0-.69,3.66,73.71,73.71,0,0,0,4.44,7.66A57.08,57.08,0,0,0,44.89,60.59a41.76,41.76,0,0,0,4.67,2.6A3,3,0,0,0,53,62.6a38,38,0,0,0,4.36-5A22.85,22.85,0,0,1,61,53.84c1.44-1.17,2.61-1.37,4.16-.35,4.2,2.75,8.61,5.13,13,7.56a40.24,40.24,0,0,1,3.66,2.1A2.73,2.73,0,0,1,83.1,65.75Z" />
                    </g>
                  </g>
                </svg>

                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-palewhite">
                    Hubungi Kami
                  </h3>
                  <ul>
                    <li className="mt-1 text-sm text-gray-500">
                      +62 121-5248-160
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-x-7 py-6">
                <TbCirclesRelation
                  className="w-[45px] h-[45px]"
                  fontWeight={500}
                />

                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-palewhite">
                    Media Sosial
                  </h3>
                  <ul>
                    <li>
                      <Link
                        className="mt-2 inline-flex items-center gap-x-2 text-sm font-medium text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                        href="https://www.instagram.com/fierto.expedition"
                      >
                        {" "}
                        <FaInstagram className="w-[30px] h-[30px] font-medium" />{" "}
                        <span>@fierto.expedition</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="mt-2 inline-flex items-center gap-x-2 text-sm font-medium text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                        href="https://wa.link/gftgqv"
                      >
                        {" "}
                        <FaWhatsapp className="w-[30px] h-[30px] font-medium" />
                        <span>Klik untuk hubungi ke Whatsapp</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="relative w-full h-96 mt-5 rounded-lg">
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Diponegoro%20University+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  style={{ border: "0" }}
                  allowFullScreen={false}
                  aria-hidden="false"
                  tabIndex={0}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
