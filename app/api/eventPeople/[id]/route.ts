import {prisma} from "@/lib/prisma";
import {NextResponse} from "next/server";
import {authenticate} from "@/middleware/auth";
import {getEventPeopleData} from "@/lib/dataApi";

export async function GET(request: Request, {params}: { params: { id: string } }) {
  const authResult = authenticate(request);
  if (!authResult.authenticated) {
    return new NextResponse(JSON.stringify({error: authResult.message}), {status: 401});
  }

  const id = parseInt(params.id, 10);
  const eventPeople = await prisma.eventPeople.findUnique({
    where: {id},
    include: {
      event: {select: {id: true, title: true}},
      eventTicket: {select: {id: true, name: true, price: true}},
      payment: {select: {id: true, name: true}},
    },
  });

  if (!eventPeople) {
    return new NextResponse(JSON.stringify({error: "Event people not found"}), {status: 404});
  }

  try {
    const eventPeopleData = await getEventPeopleData(eventPeople);

    return new NextResponse(JSON.stringify(eventPeopleData), {status: 200});
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
  console.log(json)
  try {
    const updated = await prisma.eventPeople.update({
      where: {id},
      data: {
        ...(json.firstname !== undefined && {firstname: json.firstname}),
        ...(json.lastname !== undefined && {lastname: json.lastname}),
        ...(json.date !== undefined && {date: json.date}),
        ...(json.email !== undefined && {email: json.email}),
        ...(json.eventId !== undefined && {eventId: json.eventId}),
        ...(json.eventTicketId !== undefined && {eventTicketId: json.eventTicketId}),
        ...(json.paymentId !== undefined && {paymentId: json.paymentId}),
      },
      include: {
        event: {select: {id: true, title: true}},
        eventTicket: {select: {id: true, name: true, price: true}},
        payment: {select: {id: true, name: true}},
      },
    });

    const eventPeopleData = await getEventPeopleData(updated);
    return new NextResponse(JSON.stringify(eventPeopleData), {status: 200});
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
    const deleted = await prisma.eventPeople.delete({
      where: {id},
      include: {
        event: {select: {id: true, title: true}},
        eventTicket: {select: {id: true, name: true, price: true}},
        payment: {select: {id: true, name: true}},
      },
    });

    const eventPeopleData = await getEventPeopleData(deleted);
    return new NextResponse(JSON.stringify(eventPeopleData), {status: 200});
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return new NextResponse(JSON.stringify({error: errorMessage}), {status: 500});
  }
}