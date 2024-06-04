import {prisma} from "@/lib/prisma"
import {NextResponse} from "next/server";
import {authenticate} from "@/middleware/auth";

export async function GET(request: Request) {
  const authResult = authenticate(request);
  if (!authResult.authenticated) {
    return new NextResponse(JSON.stringify({error: authResult.message}), {status: 401});
  }

  const events = await prisma.event.findMany({
    include: {
      eventType: {
        select: {
          name: true,
        }
      },
      subEventType: {
        select: {
          name: true,
        }
      },
      displayType: {
        select: {
          name: true,
        }
      },
    },
  });

  const eventsWithAssociation = events.map(event => ({
    id: event.id,
    title: event.title,
    description: event.description,
    logo: event.logo,
    date: event.date,
    isPublished: event.isPublished,
    isPlace: event.isPlace,
    place: event.place,
    isEndDate: event.isEndDate,
    endDate: event.endDate,
    isHour: event.isHour,
    hour: event.hour,
    isEndHour: event.isEndHour,
    endHour: event.endHour,
    isAddress: event.isAddress,
    address: event.address,
    isPeopleLimit: event.isPeopleLimit,
    peopleLimit: event.peopleLimit,
    createdAt: event.createdAt,
    updatedAt: event.updatedAt,
    eventType: {
      name: event.eventType.name,
    },
    subEventType: {
      name: event.subEventType.name,
    },
    displayType: {
      name: event.displayType.name,
    },
  }));

  return NextResponse.json(eventsWithAssociation);
}

export async function POST(request: Request) {
  const authResult = authenticate(request);
  if (!authResult.authenticated) {
    return new NextResponse(JSON.stringify({error: authResult.message}), {status: 401});
  }

  const json = await request.json()

  const created = await prisma.event.create({
    data: json
  })

  return new NextResponse(JSON.stringify(created), {status: 201})
}