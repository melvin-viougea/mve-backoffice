import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { authenticate } from "@/middleware/auth";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const authResult = authenticate(request);
  if (!authResult.authenticated) {
    return new NextResponse(JSON.stringify({ error: authResult.message }), { status: 401 });
  }

  const id = params.id;
  const event = await prisma.event.findUnique({
    where: {
      id: parseInt(id)
    },
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
        },
      },
    },
  });

  if (!event) {
    return new NextResponse(JSON.stringify({ error: "Event not found" }), { status: 404 });
  }

  const eventWithAssociation = {
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
  };

  return NextResponse.json(eventWithAssociation);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const authResult = authenticate(request);
  if (!authResult.authenticated) {
    return new NextResponse(JSON.stringify({ error: authResult.message }), { status: 401 });
  }

  const id = params.id;
  const json = await request.json();

  const updated = await prisma.event.update({
    where: {
      id: parseInt(id)
    },
    data: {
      title: json.title || null,
      description: json.description || null,
      logo: json.logo || null,
      isPublished: json.isPublished || null,
      isPlace: json.isPlace || null,
      place: json.place || null,
      date: json.date || null,
      isEndDate: json.isEndDate || null,
      endDate: json.endDate || null,
      isHour: json.isHour || null,
      hour: json.hour || null,
      isEndHour: json.isEndHour || null,
      endHour: json.endHour || null,
      isAddress: json.isAddress || null,
      address: json.address || null,
      isPeopleLimit: json.isPeopleLimit || null,
      peopleLimit: json.peopleLimit || null,
      associationId: json.associationId || null,
      displayTypeId: json.displayTypeId || null,
      eventTypeId: json.eventTypeId || null,
      subEventTypeId: json.subEventTypeId || null,
    },
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
        },
      },
    },
  });

  const updatedEvent = {
    id: updated.id,
    title: updated.title,
    description: updated.description,
    logo: updated.logo,
    date: updated.date,
    isPublished: updated.isPublished,
    isPlace: updated.isPlace,
    place: updated.place,
    isEndDate: updated.isEndDate,
    endDate: updated.endDate,
    isHour: updated.isHour,
    hour: updated.hour,
    isEndHour: updated.isEndHour,
    endHour: updated.endHour,
    isAddress: updated.isAddress,
    address: updated.address,
    isPeopleLimit: updated.isPeopleLimit,
    peopleLimit: updated.peopleLimit,
    createdAt: updated.createdAt,
    updatedAt: updated.updatedAt,
    eventType: {
      id: updated.eventType.id,
      name: updated.eventType.name,
    },
    subEventType: {
      id: updated.subEventType.id,
      name: updated.subEventType.name,
    },
    displayType: {
      id: updated.displayType.id,
      name: updated.displayType.name,
    },
  };

  return NextResponse.json(updatedEvent);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const authResult = authenticate(request);
  if (!authResult.authenticated) {
    return new NextResponse(JSON.stringify({ error: authResult.message }), { status: 401 });
  }

  const id = params.id;

  const deleted = await prisma.event.delete({
    where: {
      id: parseInt(id)
    },
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
        },
      },
    },
  });

  const deletedEvent = {
    id: deleted.id,
    title: deleted.title,
    description: deleted.description,
    logo: deleted.logo,
    date: deleted.date,
    isPublished: deleted.isPublished,
    isPlace: deleted.isPlace,
    place: deleted.place,
    isEndDate: deleted.isEndDate,
    endDate: deleted.endDate,
    isHour: deleted.isHour,
    hour: deleted.hour,
    isEndHour: deleted.isEndHour,
    endHour: deleted.endHour,
    isAddress: deleted.isAddress,
    address: deleted.address,
    isPeopleLimit: deleted.isPeopleLimit,
    peopleLimit: deleted.peopleLimit,
    createdAt: deleted.createdAt,
    updatedAt: deleted.updatedAt,
    eventType: {
      id: deleted.eventType.id,
      name: deleted.eventType.name,
    },
    subEventType: {
      id: deleted.subEventType.id,
      name: deleted.subEventType.name,
    },
    displayType: {
      id: deleted.displayType.id,
      name: deleted.displayType.name,
    },
  };

  return NextResponse.json(deletedEvent);
}