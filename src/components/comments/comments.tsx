import styles from "./comments-style.module.css";

import Image from "next/image";

const testimonials = [
  {
    quote:
      "Mengunjungi Dieng Plateau adalah pengalaman yang tak terlupakan. Melihat Golden Sunrise Sikunir membuat saya terpesona dengan keindahan alam Indonesia.",
    name: "Andi Surya",
    jabatan: "Pecinta Alam",
    profileImage: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/816.jpg",
    style: "md:row-span-1", // Span 1 rows
  },
  {
    quote:
      "Pemandangan dari Batu Ratapan Angin sungguh luar biasa. Pasti akan kembali lagi.",
    name: "Andi Surya",
    jabatan: "Fotografer Profesional",
    profileImage: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/266.jpg",
    style: "md:row-span-1", // Span 1 row
  },
  {
    quote: (
      <>
        Mengunjungi Dieng Plateau dengan Fierto Private Trip benar-benar adalah
        keputusan terbaik yang pernah saya buat. Fasilitas yang disediakan
        sangat lengkap, mulai dari transportasi pulang-pergi yang nyaman hingga
        tiket masuk yang sudah diatur dengan baik. Selain itu, tour guide yang
        berpengetahuan luas dan sangat ramah membuat perjalanan ini menjadi
        lebih menyenangkan.
        <br />
        <br />
        Destinasi-destinasi yang dikunjungi, seperti Golden Sunrise Sikunir,
        Kawah Sikidang, dan Telaga Warna, benar-benar memukau dan meninggalkan
        kesan mendalam. Pengalaman ini tidak hanya memuaskan, tetapi juga sangat
        berkesan. Saya sangat merekomendasikan tur ini bagi siapa saja yang
        ingin menjelajahi keindahan alam Dieng.
      </>
    ),
    name: "Joko Prabowo",
    jabatan: "Penulis Perjalanan",
    profileImage: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/790.jpg",
    style: "md:row-span-2", // Span 3 rows
  },
  {
    quote:
      "Tur ini sangat terorganisir dengan baik. Dari transportasi, tiket, hingga tour guide yang ramah, semuanya sempurna. Wisata ke Kawah Sikidang sangat memukau!",
    name: "Siti Aminah",
    jabatan: "Blogger Wisata",
    profileImage: "https://avatars.githubusercontent.com/u/98673681",
    style: "md:row-span-1", // Span 1 rows
  },
  {
    quote:
      "Jas hujan sekali pakai sangat membantu saat cuaca berubah di Dieng.",
    name: "Budi Setiawan",
    jabatan: "Vlogger Perjalanan",
    profileImage: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1187.jpg",
    style: "md:row-span-1", // Span 1 row
  },
  {
    quote:
      "Perjalanan ke Dieng Plateau sangat menyenangkan dengan transportasi yang nyaman dan fasilitas lengkap. Melihat keindahan Telaga Warna langsung adalah pengalaman yang menakjubkan.",
    name: "Desi Ratnasari",
    jabatan: "Pemandu Wisata",
    profileImage: "https://avatars.githubusercontent.com/u/5629161",
    style: "md:row-span-2", // Span 2 rows
  },
  {
    quote:
      "Candi Arjuna adalah salah satu destinasi favorit saya di tur ini. Sangat bersejarah dan indah.",
    name: "Ahmad Wijaya",
    jabatan: "Sejarawan",
    profileImage: "https://avatars.githubusercontent.com/u/51898709",
    style: "md:row-span-1", // Span 1 row
  },
  {
    quote:
      "Tur satu hari ke Dieng Plateau benar-benar memberikan kesan mendalam. Telaga Warna yang indah dan pengalaman menyaksikan matahari terbit dari Sikunir adalah highlight perjalanan saya. Sangat direkomendasikan untuk semua pencinta alam.",
    name: "Lia Kusuma",
    jabatan: "Ahli Geografi",
    profileImage: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/632.jpg",
    style: "md:row-span-2", // Span 3 rows
  },
  {
    quote:
      "Saya sangat menikmati perjalanan ini. Dari Yogyakarta ke Dieng, semuanya diatur dengan baik. Batu Ratapan Angin dan Kawah Sikidang adalah tempat yang harus dikunjungi!",
    name: "Eko Purnomo",
    jabatan: "Pengusaha Wisata",
    profileImage: "https://avatars.githubusercontent.com/u/2388161",
    style: "md:row-span-2", // Span 2 rows
  },
];

function Comments() {
  return (
    <div className="bg-white shadow-xl text-black py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl">
          Testimoni
        </h2>
        <p className="mt-4 text-center text-xl leading-6 text-slate-800">
          Jelajahi seluruh koleksi komponen dan elemen web sumber terbuka yang
          dibuat dengan kelas utilitas dari Tailwind
        </p>
        <div
          className={`mt-12 grid gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 ${styles.gridAutoFlowDense}`}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-white shadow-md p-6 rounded-lg cursor-pointer duration-1000 hover:-translate-y-5 ${testimonial.style}`}
            >
              <blockquote className="mt-4 text-lg leading-6">
                <p className="relative">"{testimonial.quote}"</p>
              </blockquote>
              <div className="mt-4 flex gap-3">
                <Image
                  width={60}
                  height={60}
                  className="rounded-full"
                  src={testimonial.profileImage}
                  alt="Profile Image"
                />
                <div>
                  <p className="text-base font-semibold">{testimonial.name}</p>
                  <p className="text-sm">{testimonial.jabatan}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Comments;
