import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // await prisma.user.createMany({
  //   data: [
  //     {
  //       firstname: 'John',
  //       lastname: 'Doe',
  //       address: '123 Main St',
  //       city: 'New York',
  //       postalCode: '10001',
  //       email: 'user1@example.com',
  //       password: 'password1',
  //     },
  //     {
  //       firstname: 'Jane',
  //       lastname: 'Doe',
  //       address: '456 Elm St',
  //       city: 'Los Angeles',
  //       postalCode: '90001',
  //       email: 'user2@example.com',
  //       password: 'password2',
  //     },
  //   ],
  // });

  await prisma.association.createMany({
    data: [
      {
        name: 'Association 1',
        image: 'image1.jpg',
      },
      {
        name: 'Association 2',
        image: 'image2.jpg',
      },
    ],
  });

  await prisma.displayType.createMany({
    data: [
      {
        name: 'Type d\'affichage 1',
      },
      {
        name: 'Type d\'affichage 2',
      },
    ],
  });

  await prisma.eventType.createMany({
    data: [
      {
        name: 'Type d\'événement 1',
      },
      {
        name: 'Type d\'événement 2',
      },
    ],
  });

  await prisma.subEventType.createMany({
    data: [
      {
        name: 'Sous-type d\'événement 1',
      },
      {
        name: 'Sous-type d\'événement 2',
      },
    ],
  });

  console.log('Seed terminé !');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });