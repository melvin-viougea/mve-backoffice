import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.displayType.createMany({
    data: [
      {
        name: 'Affichage 1',
      },
    ],
  });

  await prisma.eventType.createMany({
    data: [
      {
        name: 'Soirée',
      },
      {
        name: 'Séminaire',
      },
      {
        name: 'Évènement social',
      },
      {
        name: 'Évènement sportif',
      },
      {
        name: 'Jeu',
      },
      {
        name: 'Autres',
      },
    ],
  });

  await prisma.subEventType.createMany({
    data: [
      {
        name: 'Soirée boîte',
      },
      {
        name: 'Soirée bar',
      },
      {
        name: 'Gala',
      },
      {
        name: 'Soirée jeu',
      },
      {
        name: 'Soirée karaoké',
      },
      {
        name: 'Week-end d’intégration',
      },
      {
        name: 'Week-end de désintégration',
      },
      {
        name: 'Week-end ski',
      },
      {
        name: 'Week-end mer',
      },
      {
        name: 'Atelier de formation',
      },
      {
        name: 'Soirée caritative',
      },
      {
        name: 'Journée caritative',
      },
      {
        name: 'Goûter',
      },
      {
        name: 'Journée bien être',
      },
      {
        name: 'Petit déjeuner',
      },
      {
        name: 'Brunch',
      },
      {
        name: 'Collecte de vêtements',
      },
      {
        name: 'Journée portes ouvertes',
      },
      {
        name: 'Tournois de foot',
      },
      {
        name: 'Tournois de rugby',
      },
      {
        name: 'Tournoi de basket',
      },
      {
        name: 'Tournoi de volley',
      },
      {
        name: 'Course à pied',
      },
      {
        name: 'Randonnée',
      },
      {
        name: 'Cours de fitness/yoga collectif',
      },
      {
        name: 'Soirée jeu',
      },
      {
        name: 'Journée jeu',
      },
      {
        name: 'Tournoi de jeux vidéo',
      },
      {
        name: 'Escape game',
      },
      {
        name: 'Quiz culturel',
      },
      {
        name: 'Ventes de goodies',
      },
      {
        name: 'Bourse aux livres',
      },
      {
        name: 'Conférences/débats',
      },
      {
        name: 'Projections de films/documentaires',
      },
      {
        name: 'Expositions artistiques',
      },
      {
        name: 'Ateliers créatifs',
      },
    ],
  });

  await prisma.associationType.createMany({
    data: [
      {
        name: 'BDE',
      },
      {
        name: 'BDA',
      },
      {
        name: 'BDS',
      },
      {
        name: 'Communication',
      },
      {
        name: 'Sport',
      },
      {
        name: 'Bar',
      },
      {
        name: 'Food',
      },
      {
        name: 'Humanitaire',
      },
      {
        name: 'Musique',
      },
    ],
  });

  await prisma.campusType.createMany({
    data: [
      {
        name: 'IUT tech de co',
      },
      {
        name: 'Ecole d’ingénieur',
      },
      {
        name: 'Ifsi',
      },
      {
        name: 'Ecole de commerce',
      },
      {
        name: 'Staps',
      },
      {
        name: 'Ecole d’informatique',
      },
      {
        name: 'Sciences Po',
      },
      {
        name: 'Fac de droit',
      },
      {
        name: 'Fac de lettres',
      },
      {
        name: 'Fac d’histoires',
      },
      {
        name: 'Ecole de musique',
      },
      {
        name: 'ecole d’art',
      },
      {
        name: 'Ecole de design',
      },
      {
        name: 'Ecole immobiliere',
      },
    ],
  });

  await prisma.superUser.createMany({
    data: [
      {
        firstname: 'Melvin',
        lastname: 'Viougea',
        email: 'mviougea@icloud.com',
        password: 'azeazeaze',
      },
    ],
  });

  await prisma.nbStudent.createMany({
    data: [
      {
        number: '1 - 250',
      },
      {
        number: '250 - 500',
      },
      {
        number: '500 - 750',
      },
      {
        number: '750 - 1000',
      },
      {
        number: '1000 - 1500',
      },
      {
        number: '1500 - 2000',
      },
      {
        number: '2000 - 3000',
      },
      {
        number: '3000 - 4000',
      },
      {
        number: '4000+',
      },
    ],
  });

  await prisma.payment.createMany({
    data: [
      {
        name: 'Cash',
      },
      {
        name: 'Lydia',
      },
      {
        name: 'Paylib',
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