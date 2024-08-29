import {prisma} from "@/lib/prisma";
import {NextResponse} from "next/server";
import {authenticate} from "@/middleware/auth";
import {getEventTicketData} from "@/lib/dataApi";

export async function GET(request: Request, {params}: { params: { id: string } }) {
  const authResult = authenticate(request);
  if (!authResult.authenticated) {
    return new NextResponse(JSON.stringify({error: authResult.message}), {status: 401});
  }

  const id = parseInt(params.id, 10);
  const eventTicket = await prisma.eventTicket.findUnique({
    where: {id},
    include: {
      event: {select: {id: true, title: true}},
    },
  });

  if (!eventTicket) {
    return new NextResponse(JSON.stringify({error: "Event ticket not found"}), {status: 404});
  }

  try {
    const eventTicketData = await getEventTicketData(eventTicket);

    return new NextResponse(JSON.stringify(eventTicketData), {status: 200});
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
    const updated = await prisma.eventTicket.update({
      where: {id},
      data: {
        ...(json.name !== undefined && {name: json.name}),
        ...(json.price !== undefined && {price: json.price}),
        ...(json.eventId !== undefined && {eventId: json.eventId}),
      },
      include: {
        event: {select: {id: true, title: true}},
      },
    });

    const eventTicketData = await getEventTicketData(updated);
    return new NextResponse(JSON.stringify(eventTicketData), {status: 200});
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
    const deleted = await prisma.eventTicket.delete({
      where: {id},
      include: {
        event: {select: {id: true, title: true}},
      },
    });

    const eventTicketData = await getEventTicketData(deleted);
    return new NextResponse(JSON.stringify(eventTicketData), {status: 200});
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return new NextResponse(JSON.stringify({error: errorMessage}), {status: 500});
  }
}