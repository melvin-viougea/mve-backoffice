import {prisma} from "@/lib/prisma"
import {NextResponse} from "next/server";
import {authenticate} from "@/middleware/auth";
import {getEventData, getEventTicketData} from "@/lib/dataApi";

export async function GET(request: Request) {
  const authResult = authenticate(request);
  if (!authResult.authenticated) {
    return new NextResponse(JSON.stringify({error: authResult.message}), {status: 401});
  }

  try {
    const eventsTicket = await prisma.eventTicket.findMany({
      include: {
        event: {select: {id: true, title: true}},
      },
    });

    const allEventsTicket = await Promise.all(eventsTicket.map(async (eventTicket) => await getEventTicketData(eventTicket)));

    return new NextResponse(JSON.stringify(allEventsTicket), {status: 200});
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
    const created = await prisma.eventTicket.create({
      data: json,
      include: {
        event: {select: {id: true, title: true}},
      },
    });

    const eventTicketData = await getEventTicketData(created);
    return new NextResponse(JSON.stringify(eventTicketData), {status: 201});
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return new NextResponse(JSON.stringify({error: errorMessage}), {status: 500});
  }
}