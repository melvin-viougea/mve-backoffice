import {prisma} from "@/lib/prisma";
import {NextResponse} from "next/server";
import {authenticate} from "@/middleware/auth";
import {getEventData} from "@/lib/dataApi";

export async function GET(request: Request) {
  const authResult = authenticate(request);
  if (!authResult.authenticated) {
    return new NextResponse(JSON.stringify({error: authResult.message}), {status: 401});
  }

  try {
    const events = await prisma.event.findMany({
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
                name: true,
                price: true
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

    const allEvents = await Promise.all(events.map(async (event) => await getEventData(event)));

    return new NextResponse(JSON.stringify(allEvents), {status: 200});
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return new NextResponse(JSON.stringify({error: errorMessage}), {status: 500});
  }
}

export async function POST(request: Request) {
  const authResult = authenticate(request);
  if (!authResult.authenticated) {
    return new NextResponse(JSON.stringify({error: authResult.message}), {status: 401});
  }

  const json = await request.json();

  try {
    const created = await prisma.event.create({
      data: json,
      include: {
        association: {select: {id: true, name: true}},
        eventType: {select: {id: true, name: true}},
        subEventType: {select: {id: true, name: true}},
        displayType: {select: {id: true, name: true}},
        eventTicket: {select: {id: true, name: true, price:true }},
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
                name: true,
                price: true
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

    const eventTickets = [
      { name: 'Cotisant', price: 0, eventId: created.id },
      { name: 'Non cotisant', price: 0, eventId: created.id }
    ];

    for (const ticket of eventTickets) {
      await prisma.eventTicket.create({
        data: ticket
      });
    }

    const eventData = await getEventData(created);
    return new NextResponse(JSON.stringify(eventData), {status: 201});
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return new NextResponse(JSON.stringify({error: errorMessage}), {status: 500});
  }
}