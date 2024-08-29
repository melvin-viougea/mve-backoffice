import {prisma} from "@/lib/prisma"
import {NextResponse} from "next/server";
import {authenticate} from "@/middleware/auth";
import {getEventPeopleData, getEventTicketData} from "@/lib/dataApi";

export async function GET(request: Request) {
  const authResult = authenticate(request);
  if (!authResult.authenticated) {
    return new NextResponse(JSON.stringify({error: authResult.message}), {status: 401});
  }

  try {
    const eventPeoples = await prisma.eventPeople.findMany({
      include: {
        event: {select: {id: true, title: true}},
        eventTicket: {select: {id: true, name: true, price: true}},
        payment: {select: {id: true, name: true}},
      },
    });

    const allEventPeople = await Promise.all(eventPeoples.map(async (eventPeople) => await getEventPeopleData(eventPeople)));

    return new NextResponse(JSON.stringify(allEventPeople), {status: 200});
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
    const created = await prisma.eventPeople.create({
      data: json,
      include: {
        event: {select: {id: true, title: true}},
        eventTicket: {select: {id: true, name: true, price: true}},
        payment: {select: {id: true, name: true}},
      },
    });

    const eventPeopleData = await getEventPeopleData(created);
    return new NextResponse(JSON.stringify(eventPeopleData), {status: 201});
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return new NextResponse(JSON.stringify({error: errorMessage}), {status: 500});
  }
}