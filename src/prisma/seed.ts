const { PrismaClient } = require("@prisma/client");
// import { PrismaClient } from "@prisma/client";
const { faker } = require("@faker-js/faker");
// import { faker } from "@faker-js/faker";
const bcryptjs = require("bcryptjs");

const prismaServer = new PrismaClient();

async function main() {
  // Seed Users
  await prismaServer.user.create({
    data: {
      username: "anthrofax",
      displayName: "Afridho",
      email: "afridhoikhsan@gmail.com",
      password: await bcryptjs.hash("123123", 10),
      phone: "085770006121",
      isAdmin: true,
    },
  });
  for (let i = 0; i < 10; i++) {
    await prismaServer.user.create({
      data: {
        username: faker.internet.userName(),
        displayName: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        phone: faker.phone.number(),
        profileImage: faker.image.avatar(),
        isAdmin: faker.datatype.boolean(),
      },
    });
  }

  // Seed Destinations
  await prismaServer.destination.create({
    data: {
      destinationName: "Golden Sunrise Sikunir",
      description:
        "Nikmati keajaiban alam dari Golden Sunrise Sikunir yang terkenal dengan pemandangan matahari terbitnya yang memukau. Terletak di ketinggian Dieng, Bukit Sikunir menawarkan panorama langit yang berubah warna menjadi emas saat fajar menyingsing, menjadikannya tempat yang sempurna bagi pecinta alam dan fotografi.",
      price: 500000,
      city: "Wonosobo",
      imageUrls: [
        "https://res.cloudinary.com/dmc0cvmf5/image/upload/v1722746067/menikmati-keindahan-golden-sunrise-bukit-sikunir-di-dieng-Elk-thumb_xbtov4.jpg",
        "https://res.cloudinary.com/dmc0cvmf5/image/upload/v1722746068/Sunrise_di_Bukit_Sikunir_fgojko.jpg",
        "https://res.cloudinary.com/dmc0cvmf5/image/upload/v1722746068/golden-sunrise-sikunir_b1rojm.jpg",
        "https://res.cloudinary.com/dmc0cvmf5/image/upload/v1722746068/Matahari-Terbit-Bukit-Sikunir-Dieng-Wonosobo-by-Ade-Chrisnadhi_gornd2.jpg",
        "https://res.cloudinary.com/dmc0cvmf5/image/upload/v1722746068/400baf57-0689-43ca-a2c1-5b36ea8b2802_u3bme4.jpg",
      ],
    },
  });

  await prismaServer.destination.create({
    data: {
      destinationName: "Batu Ratapan Angin",
      description:
        "Batu Ratapan Angin menyajikan pemandangan Telaga Warna yang eksotis dari ketinggian. Dikenal dengan legenda penuh misteri, tempat ini menawarkan sudut pandang unik dimana Anda bisa merenung dan menikmati keindahan alam sekitar yang menenangkan. Ideal untuk refleksi dan menikmati ketenangan.",
      price: 500000,
      city: "Wonosobo",
      imageUrls: [
        "https://res.cloudinary.com/dmc0cvmf5/image/upload/v1722746215/5d63c95234404_xvtus7.jpg",
        "https://res.cloudinary.com/dmc0cvmf5/image/upload/v1722746215/berkunjung-ke-batu-ratapan-angin-di-dieng-dijamin-nggak-bikin-kamu-baper-9NvvNR4w8i_mytmow.jpg",
        "https://res.cloudinary.com/dmc0cvmf5/image/upload/v1722746216/telaga-warna-dieng-wonosobo-ok_nadpdh.jpg",
        "https://res.cloudinary.com/dmc0cvmf5/image/upload/v1722746216/images_6_oqmqw4.jpg",
        "https://res.cloudinary.com/dmc0cvmf5/image/upload/v1722746216/1680163299_lwtirb.png",
      ],
    },
  });

  await prismaServer.destination.create({
    data: {
      destinationName: "Kawah Sikidang",
      description:
        "Kawah Sikidang, salah satu kawah vulkanik aktif di Dieng, menawarkan pengalaman yang tidak terlupakan dengan fenomena alam berupa asap belerang yang mengepul dan tanah yang mendesis. Area ini menawarkan pandangan dekat pada kekuatan alam bumi serta kesempatan untuk belajar tentang geologi vulkanik.",
      price: 500000,
      city: "Banjarnegara",
      imageUrls: [
        "https://res.cloudinary.com/dmc0cvmf5/image/upload/v1722746455/images_7_t8jlnw.jpg",
        "https://res.cloudinary.com/dmc0cvmf5/image/upload/v1722746455/images_8_titj6c.jpg",
        "https://res.cloudinary.com/dmc0cvmf5/image/upload/v1722746455/kawah-sikidang_yuzc7n.png",
        "https://res.cloudinary.com/dmc0cvmf5/image/upload/v1722746455/612d73d031321_esnasn.jpg",
        "https://res.cloudinary.com/dmc0cvmf5/image/upload/v1722746462/614eba86bfd35_nezqxd.jpg",
      ],
    },
  });

  await prismaServer.destination.create({
    data: {
      destinationName: "Telaga Warna",
      description:
        "Telaga Warna adalah keajaiban alam yang menarik dengan air danau yang dapat berubah warna karena refleksi mineral belerang di dasar danau. Dikelilingi oleh hutan pinus dan udara yang sejuk, Telaga Warna adalah destinasi yang sempurna untuk piknik, trekking ringan, dan fotografi.",
      price: 500000,
      city: "Wonosobo",
      imageUrls: [
        "https://res.cloudinary.com/dmc0cvmf5/image/upload/v1722746594/Telaga_warna_uejwjm.jpg",
        "https://res.cloudinary.com/dmc0cvmf5/image/upload/v1722746595/1716219958447433-0_o5ca2p.jpg",
        "https://res.cloudinary.com/dmc0cvmf5/image/upload/v1722746595/7104981685_dc868363b7_b_e5lafb.jpg",
        "https://res.cloudinary.com/dmc0cvmf5/image/upload/v1722746607/df5e5f5c-b0dd-4024-bd1b-06c9d830dace_ldcm81.jpg",
        "https://res.cloudinary.com/dmc0cvmf5/image/upload/v1722746617/Telaga_Warna_in_The_Dieng_Plateau_xxgeln.jpg",
      ],
    },
  });

  await prismaServer.destination.create({
    data: {
      destinationName: "Candi Arjuna",
      description:
        "Kompleks Candi Arjuna, yang berusia lebih dari seribu tahun, merupakan saksi bisu peradaban Hindu kuno di Dataran Tinggi Dieng. Candi ini menampilkan arsitektur batu kuno yang megah dan merupakan situs sejarah yang penting untuk dipelajari. Pengunjung dapat menyelami sejarah dan arsitektur Hindu kuno, serta menikmati pemandangan alam yang mempesona sekitarnya.",
      price: 500000,
      city: "Banjarnegara",
      imageUrls: [
        "https://res.cloudinary.com/dmc0cvmf5/image/upload/v1722746966/2558601317_rb7lew.webp",
        "https://res.cloudinary.com/dmc0cvmf5/image/upload/v1722746967/f6cbe22988b601d5de2b101d118ce410_rzqt7a.png",
        "https://res.cloudinary.com/dmc0cvmf5/image/upload/v1722746967/Paket-Wisata-Dieng-Candi-Arjuna-1_yjuprk.jpg",
        "https://res.cloudinary.com/dmc0cvmf5/image/upload/v1722746967/614ea1f2206ed_egdv3n.jpg",
        "https://res.cloudinary.com/dmc0cvmf5/image/upload/v1722746967/WhatsApp-Image-2023-12-10-at-122248_9643202a-283540967_cpmogm.webp",
      ],
    },
  });

  for (let i = 0; i < 10; i++) {
    await prismaServer.destination.create({
      data: {
        destinationName: faker.location.city(),
        description: faker.lorem.paragraphs(),
        price: faker.number.int({ min: 500000, max: 2000000 }),
        city: faker.helpers.arrayElement([
          "yogyakarta",
          "magelang",
          "wonosobo",
        ]),
        imageUrls: [faker.image.url(), faker.image.url(), faker.image.url()],
      },
    });
  }

  // Fetch some user IDs
  const users = await prismaServer.user.findMany({
    select: {
      id: true,
    },
  });

  // Fetch some destination IDs
  const destinations = await prismaServer.destination.findMany({
    select: {
      destinationId: true,
    },
  });

  // Seed Experiences
  await prismaServer.experience.create({
    data: {
      namaExperience: "Pabrik Carica",
      biaya: 100000,
      deskripsi:
        'Mengunjungi dan melihat langsung pembuatan Carica di Pabrik Carica + membawa oleh" carica. (Price 100k/orang)',
    },
  });

  // Seed Penginapan
  await prismaServer.penginapan.create({
    data: {
      namaPenginapan: "Hotel Tirta Arum",
      deskripsi: "",
      biaya: 300000,
    },
  });

  await prismaServer.penginapan.create({
    data: {
      namaPenginapan: "Sikembang Tenda Safari Double",
      deskripsi: "Include Breakfast, Waterheater, Tea & Coffe | Maks 2 Orang",
      biaya: 350000,
    },
  });

  await prismaServer.penginapan.create({
    data: {
      namaPenginapan: "CRA Hotel",
      deskripsi: "Deluxe Room",
      biaya: 320000,
    },
  });

  // Fetch some destination IDs
  const penginapan = await prismaServer.penginapan.findMany({
    select: {
      id: true,
    },
  });

  // Seed Orders
  for (let j = 0; j < 10; j++) {
    await prismaServer.order.create({
      data: {
        masaPerjalanan: faker.helpers.arrayElement([1, 3]),
        nama: faker.person.fullName(),
        nomorHp: faker.phone.number(),
        tanggalPerjalanan: faker.date.anytime(),
        totalBiaya: faker.number.int({ min: 100000, max: 1200000 }),
        qty: faker.number.int({ min: 1, max: 3 }),
        destinationId: destinations[j].destinationId, // Assuming you have destination IDs
        createdAt: faker.date.past(),
        userId: users[j].id,
        lokasiPenjemputan: faker.helpers.arrayElement([
          "yogyakarta",
          "magelang",
          "wonosobo",
        ]),
        penginapanId:
          penginapan[
            faker.helpers.arrayElement([0, 1, 2])
          ].id,
      },
    });
  }

  // Fetch some order IDs
  const orders = await prismaServer.order.findMany({
    select: {
      id: true,
    },
  });

  // Fetch some experience IDs
  const experiences = await prismaServer.experience.findMany({
    select: {
      id: true,
    },
  });

  // Seed ExperienceOrder
  for (let i = 0; i < 10; i++) {
    await prismaServer.orderExperience.create({
      data: {
        orderId: orders[i].id,
        experienceId: experiences[0].id,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaServer.$disconnect();
  });
