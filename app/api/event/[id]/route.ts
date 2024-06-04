import {prisma} from "@/lib/prisma";
import {NextResponse} from "next/server";
import {authenticate} from "@/middleware/auth";

export async function GET(request: Request, {params}: { params: { id: string } }) {
  const authResult = authenticate(request);
  if (!authResult.authenticated) {
    return new NextResponse(JSON.stringify({error: authResult.message}), {status: 401});
  }

  const id = params.id
  const events = await prisma.event.findUnique({
    where: {
      id: parseInt(id)
    }
  })
  return NextResponse.json(events)
}

export async function PUT(request: Request, {params}: { params: { id: string } }) {
  const authResult = authenticate(request);
  if (!authResult.authenticated) {
    return new NextResponse(JSON.stringify({error: authResult.message}), {status: 401});
  }

  const id = params.id
  const json = await request.json()

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
    }
  })
  return NextResponse.json(updated)
}

export async function PATCH(request: Request, {params}: { params: { id: string } }) {
  const authResult = authenticate(request);
  if (!authResult.authenticated) {
    return new NextResponse(JSON.stringify({error: authResult.message}), {status: 401});
  }

  const id = params.id
  const json = await request.json()

  const updated = await prisma.event.update({
    where: {
      id: parseInt(id)
    },
    data: json
  })
  return NextResponse.json(updated)
}

export async function DELETE(request: Request, {params}: { params: { id: string } }) {
  const authResult = authenticate(request);
  if (!authResult.authenticated) {
    return new NextResponse(JSON.stringify({error: authResult.message}), {status: 401});
  }

  const id = params.id

  const deleted = await prisma.event.delete({
    where: {
      id: parseInt(id)
    }
  })
  return NextResponse.json(deleted)
}