import {NextResponse} from "next/server";
import {authenticate} from "@/middleware/auth";
import {getEventData} from "@/lib/dataApi";
import {prisma} from "@/lib/prisma";

export async function GET(request: Request, {params}: { params: { id: string } }) {
  const authResult = authenticate(request);
  if (!authResult.authenticated) {
    return new NextResponse(JSON.stringify({error: authResult.message}), {status: 401});
  }

  const id = parseInt(params.id, 10);
  const event = await prisma.event.findUnique({
    where: {id},
    include: {
      association: {select: {id: true, name: true}},
      eventType: {select: {id: true, name: true}},
      subEventType: {select: {id: true, name: true}},
      displayType: {select: {id: true, name: true}},
      eventTicket: {select: {id: true, name: true, price: true }},
      eventPeople: {
        select: {
          id: true,
          firstname: true,
          lastname: true,
          email: true,
          date: true,
          eventTicket: {
            select: {
              id: true,
              name: true
            }
          },
          payment: {
            select: {
              id: true,
              name: true
            }
          }
        }
      }
    },
  });

  if (!event) {
    return new NextResponse(JSON.stringify({error: "Event not found"}), {status: 404});
  }

  try {
    const eventData = await getEventData(event);

    return new NextResponse(JSON.stringify(eventData), {status: 200});
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return new NextResponse(JSON.stringify({error: errorMessage}), {status: 500});
  }
}

export async function PUT(request: Request, {params}: { params: { id: string } }) {
  const authResult = authenticate(request);
  if (!authResult.authenticated) {
    return new NextResponse(JSON.stringify({error: authResult.message}), {status: 401});
  }

  const id = parseInt(params.id, 10);
  const json = await request.json();

  try {
    const updated = await prisma.event.update({
      where: {id},
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
        association: {select: {id: true, name: true}},
        eventType: {select: {id: true, name: true}},
        subEventType: {select: {id: true, name: true}},
        displayType: {select: {id: true, name: true}},
        eventTicket: {select: {id: true, name: true, price: true }},
        eventPeople: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
            date: true,
            eventTicket: {
              select: {
                id: true,
                name: true
              }
            },
            payment: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      },
    });

    const eventData = await getEventData(updated);
    return new NextResponse(JSON.stringify(eventData), {status: 200});
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return new NextResponse(JSON.stringify({error: errorMessage}), {status: 500});
  }
}

export async function PATCH(request: Request, {params}: { params: { id: string } }) {
  const authResult = authenticate(request);
  if (!authResult.authenticated) {
    return new NextResponse(JSON.stringify({error: authResult.message}), {status: 401});
  }

  const id = parseInt(params.id, 10);
  const json = await request.json();

  try {
    const updated = await prisma.event.update({
      where: {id},
      data: {
        ...(json.title !== undefined && {title: json.title}),
        ...(json.description !== undefined && {description: json.description}),
        ...(json.logo !== undefined && {logo: json.logo}),
        ...(json.isPublished !== undefined && {isPublished: json.isPublished}),
        ...(json.isPlace !== undefined && {isPlace: json.isPlace}),
        ...(json.place !== undefined && {place: json.place}),
        ...(json.date !== undefined && {date: json.date}),
        ...(json.isEndDate !== undefined && {isEndDate: json.isEndDate}),
        ...(json.endDate !== undefined && {endDate: json.endDate}),
        ...(json.isHour !== undefined && {isHour: json.isHour}),
        ...(json.hour !== undefined && {hour: json.hour}),
        ...(json.isEndHour !== undefined && {isEndHour: json.isEndHour}),
        ...(json.endHour !== undefined && {endHour: json.endHour}),
        ...(json.isAddress !== undefined && {isAddress: json.isAddress}),
        ...(json.address !== undefined && {address: json.address}),
        ...(json.isPeopleLimit !== undefined && {isPeopleLimit: json.isPeopleLimit}),
        ...(json.peopleLimit !== undefined && {peopleLimit: json.peopleLimit}),
        ...(json.associationId !== undefined && {associationId: json.associationId}),
        ...(json.displayTypeId !== undefined && {displayTypeId: json.displayTypeId}),
        ...(json.eventTypeId !== undefined && {eventTypeId: json.eventTypeId}),
        ...(json.subEventTypeId !== undefined && {subEventTypeId: json.subEventTypeId}),
      },
      include: {
        association: {select: {id: true, name: true}},
        eventType: {select: {id: true, name: true}},
        subEventType: {select: {id: true, name: true}},
        displayType: {select: {id: true, name: true}},
        eventTicket: {select: {id: true, name: true, price: true }},
        eventPeople: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
            date: true,
            eventTicket: {
              select: {
                id: true,
                name: true
              }
            },
            payment: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      },
    });

    const eventData = await getEventData(updated);
    return new NextResponse(JSON.stringify(eventData), {status: 200});
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return new NextResponse(JSON.stringify({error: errorMessage}), {status: 500});
  }
}

export async function DELETE(request: Request, {params}: { params: { id: string } }) {
  const authResult = authenticate(request);
  if (!authResult.authenticated) {
    return new NextResponse(JSON.stringify({error: authResult.message}), {status: 401});
  }

  const id = parseInt(params.id, 10);

  try {
    const deleted = await prisma.event.delete({
      where: {id},
      include: {
        association: {select: {id: true, name: true}},
        eventType: {select: {id: true, name: true}},
        subEventType: {select: {id: true, name: true}},
        displayType: {select: {id: true, name: true}},
        eventTicket: {select: {id: true, name: true, price: true }},
        eventPeople: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
            date: true,
            eventTicket: {
              select: {
                id: true,
                name: true
              }
            },
            payment: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      },
    });

    const eventData = await getEventData(deleted);
    return new NextResponse(JSON.stringify(eventData), {status: 200});
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return new NextResponse(JSON.stringify({error: errorMessage}), {status: 500});
  }
}