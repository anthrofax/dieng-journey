const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");
// import {faker } from '@faker-js/faker
const bcryptjs = require("bcryptjs");

const optionLocations = [
  "dubai",
  "abu-dhabi",
  "mumbai",
  "delhi",
  "berlin",
  "hamburg",
  "st-tropez",
  "paris",
];

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

  // Seed Hotels
  for (let j = 0; j < 10; j++) {
    await prismaServer.hotel.create({
      data: {
        hotelName: faker.company.name(),
        description: faker.lorem.paragraphs(),
        location: `${faker.location.city()}, ${faker.location.state()}`, // Create a location in the format of "City, State"
        destinationId: destinations[j].destinationId,
      },
    });
  }

  // Seed Experiences
  for (let j = 0; j < 10; j++) {
    await prismaServer.experience.create({
      data: {
        experienceName: faker.commerce.productName(), // Generate a random experience name
        price: faker.number.int({ min: 100000, max: 5000000 }), // Random price for the experience
        imageUrls: [faker.image.url(), faker.image.url(), faker.image.url()], // Array of image URLs
        description: faker.lorem.paragraph(), // A paragraph describing the experience
        destinationId: destinations[j].destinationId, // Assign each experience to a destination
      },
    });
  }

  // Seed Orders
  for (let j = 0; j < 10; j++) {
    await prismaServer.order.create({
      data: {
        qty: faker.number.int({ min: 1, max: 3 }),
        destinationId: destinations[j].destinationId, // Assuming you have destination IDs
        createdAt: faker.date.past(),
        userId: users[j].id,
      },
    });
  }

  // Fetch some hotel IDs
  const hotels = await prismaServer.hotel.findMany({
    select: {
      id: true,
    },
  });

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
        experienceId: experiences[i].id,
      },
    });
  }

  // Seed Rooms
  for (let j = 0; j < 10; j++) {
    await prismaServer.room.create({
      data: {
        beds: faker.number.int(),
        pricePerNight: faker.number.float(),
        fasilitas: faker.helpers.arrayElements([
          "Wifi Gratis",
          "Kasur Lebar",
          "Mesin Kopi",
          "AC",
          "Bathub",
          "Netflix",
        ]),
        spaciousRoom: faker.number.float(),
        description: faker.lorem.paragraphs(),
        image: faker.helpers.arrayElements([
          faker.image.url(),
          faker.image.url(),
          faker.image.url(),
          faker.image.url(),
          faker.image.url(),
          faker.image.url(),
        ]),
        hotelId: hotels[j].id,
      },
    });
  }

  // Seed Listings
  for (let j = 0; j < 10; j++) {
    await prismaServer.listing.create({
      data: {
        name: faker.company.name(), // Generate a random property name
        location: faker.helpers.arrayElement(
          optionLocations.map((location: string) => location)
        ), // Create a location in the format of "City, State"
        type: faker.helpers.arrayElement([
          "luxury",
          "budget",
          "threeStars",
          "fourStars",
          "fiveStars",
        ]), // Randomly select a type of property
        desc: faker.lorem.paragraphs(), // Generate a short description for the listing
        pricePerNight: faker.number.float({ min: 100000, max: 5000000 }), // Generate a random price per night
        beds: faker.number.int({ min: 1, max: 5 }), // Random number of beds
        hasFreeWifi: faker.datatype.boolean(), // Randomly determine if there's free WiFi
        imageUrls: [faker.image.url(), faker.image.url(), faker.image.url()], // Array of image URLs
      },
    });
  }

  // Fetch some rooms IDs
  const rooms = await prismaServer.room.findMany({
    select: {
      id: true,
    },
  });

  // Fetch some listings IDs
  const listings = await prismaServer.listing.findMany({
    select: {
      id: true,
    },
  });

  // Seed Reservations
  for (let j = 0; j < 10; j++) {
    const startDate = faker.date.soon(); // Generate a start date in the near future
    const endDate = new Date(
      startDate.getTime() +
        faker.number.int({ min: 1, max: 14 }) * 24 * 60 * 60 * 1000
    ); // End date based on start date, adding 1-14 days
    await prismaServer.reservation.create({
      data: {
        startDate: startDate,
        endDate: endDate,
        chargeId: faker.string.uuid(), // Generate a random transaction ID
        daysDifference:
          (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24), // Calculate the number of days between start and end dates
        reservedDates: Array.from(
          {
            length:
              (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24),
          },
          (_, i) => new Date(startDate.getTime() + i * 1000 * 3600 * 24)
        ), // Generate an array of all dates between start and end
        listingId: listings[j].id, // Cycle through available listings
        userId: users[j].id, // Cycle through available users
        roomId: rooms[j].id, // Cycle through available rooms
      },
    });
  }

  // Seed Reviews
  for (let j = 0; j < 10; j++) {
    await prismaServer.review.create({
      data: {
        text: faker.lorem.sentences(faker.number.int({ min: 1, max: 3 })), // Generate 1 to 3 sentences of review text
        stars: faker.number.int({ min: 1, max: 5 }), // Generate a star rating between 1 and 5
        listingId: listings[j].id, // Cycle through available listings
        destinationId: destinations[j].destinationId, // Cycle through available destinations
        userId: users[j].id, // Cycle through available users
      },
    });
  }

  console.log("Orders have been seeded.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaServer.$disconnect();
  });
