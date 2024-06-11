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
          id: true,
          name: true,
        }
      },
      subEventType: {
        select: {
          id: true,
          name: true,
        }
      },
      displayType: {
        select: {
          id: true,
          name: true,
        }
      },
    },
  });

  const allEvents = events.map(event => ({
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
      id: event.eventType.id,
      name: event.eventType.name,
    },
    subEventType: {
      id: event.subEventType.id,
      name: event.subEventType.name,
    },
    displayType: {
      id: event.displayType.id,
      name: event.displayType.name,
    },
  }));

  return NextResponse.json(allEvents);
}

export async function POST(request: Request) {
  const authResult = authenticate(request);
  if (!authResult.authenticated) {
    return new NextResponse(JSON.stringify({ error: authResult.message }), { status: 401 });
  }

  const json = await request.json();

  const created = await prisma.event.create({
    data: json,
    include: {
      eventType: {
        select: {
          id: true,
          name: true,
        }
      },
      subEventType: {
        select: {
          id: true,
          name: true,
        }
      },
      displayType: {
        select: {
          id: true,
          name: true,
        }
      },
    },
  });

  const createdEvent = {
    id: created.id,
    title: created.title,
    description: created.description,
    logo: created.logo,
    date: created.date,
    isPublished: created.isPublished,
    isPlace: created.isPlace,
    place: created.place,
    isEndDate: created.isEndDate,
    endDate: created.endDate,
    isHour: created.isHour,
    hour: created.hour,
    isEndHour: created.isEndHour,
    endHour: created.endHour,
    isAddress: created.isAddress,
    address: created.address,
    isPeopleLimit: created.isPeopleLimit,
    peopleLimit: created.peopleLimit,
    createdAt: created.createdAt,
    updatedAt: created.updatedAt,
    associationId: created.associationId,
    eventType: {
      id: created.eventType.id,
      name: created.eventType.name,
    },
    subEventType: {
      id: created.subEventType.id,
      name: created.subEventType.name,
    },
    displayType: {
      id: created.displayType.id,
      name: created.displayType.name,
    },
  };

  return new NextResponse(JSON.stringify(createdEvent), { status: 201 });
}