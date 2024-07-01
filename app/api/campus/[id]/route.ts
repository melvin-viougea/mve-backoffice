import {NextResponse} from "next/server";
import {authenticate} from "@/middleware/auth";
import {getCampusData, getEventData} from "@/lib/dataApi";
import {prisma} from "@/lib/prisma";

export async function GET(request: Request, {params}: { params: { id: string } }) {
  const authResult = authenticate(request, true);
  if (!authResult.authenticated) {
    return new NextResponse(JSON.stringify({error: authResult.message}), {status: 401});
  }

  const id = parseInt(params.id, 10);
  const event = await prisma.campus.findUnique({
    where: {id},
    include: {
      campusType: {select: {id: true, name: true}},
      nbStudent: {select: {id: true, number: true}},
    },
  });

  if (!event) {
    return new NextResponse(JSON.stringify({error: "Campus not found"}), {status: 404});
  }

  try {
    const campusData = await getCampusData(event);
    return new NextResponse(JSON.stringify(campusData), {status: 200});
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return new NextResponse(JSON.stringify({error: errorMessage}), {status: 500});
  }
}

export async function PUT(request: Request, {params}: { params: { id: string } }) {
  const authResult = authenticate(request, true);
  if (!authResult.authenticated) {
    return new NextResponse(JSON.stringify({error: authResult.message}), {status: 401});
  }

  const id = parseInt(params.id, 10);
  const json = await request.json();

  try {
    const updated = await prisma.campus.update({
      where: {id},
      data: {
        name: json.name || null,
        description: json.description || null,
        city: json.city || null,
        address: json.address || null,
        firstname: json.firstname || null,
        lastname: json.lastname || null,
        email: json.email || null,
        phone: json.phone || null,
        role: json.role || null,
        campusTypeId: json.campusTypeId || null,
        nbStudentId: json.nbStudentId || null,
      },
      include: {
        campusType: {select: {id: true, name: true}},
        nbStudent: {select: {id: true, number: true}},
      },
    });

    const campusData = await getCampusData(updated);
    return new NextResponse(JSON.stringify(campusData), {status: 200});
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return new NextResponse(JSON.stringify({error: errorMessage}), {status: 500});
  }
}

export async function PATCH(request: Request, {params}: { params: { id: string } }) {
  const authResult = authenticate(request, true);
  if (!authResult.authenticated) {
    return new NextResponse(JSON.stringify({error: authResult.message}), {status: 401});
  }

  const id = parseInt(params.id, 10);
  const json = await request.json();

  try {
    const updated = await prisma.campus.update({
      where: {id},
      data: {
        ...(json.name !== undefined && {name: json.name}),
        ...(json.description !== undefined && {description: json.description}),
        ...(json.address !== undefined && {address: json.address}),
        ...(json.city !== undefined && {city: json.city}),
        ...(json.firstname !== undefined && {firstname: json.firstname}),
        ...(json.lastname !== undefined && {lastname: json.lastname}),
        ...(json.email !== undefined && {email: json.email}),
        ...(json.phone !== undefined && {phone: json.phone}),
        ...(json.role !== undefined && {role: json.role}),
        ...(json.campusTypeId !== undefined && {campusTypeId: json.campusTypeId}),
        ...(json.nbStudentId !== undefined && {nbStudentId: json.nbStudentId}),
      },
      include: {
        campusType: {select: {id: true, name: true}},
        nbStudent: {select: {id: true, number: true}},
      },
    });

    const campusData = await getCampusData(updated);
    return new NextResponse(JSON.stringify(campusData), {status: 200});
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return new NextResponse(JSON.stringify({error: errorMessage}), {status: 500});
  }
}

export async function DELETE(request: Request, {params}: { params: { id: string } }) {
  const authResult = authenticate(request, true);
  if (!authResult.authenticated) {
    return new NextResponse(JSON.stringify({error: authResult.message}), {status: 401});
  }

  const id = parseInt(params.id, 10);

  try {
    const deleted = await prisma.campus.delete({
      where: {id},
      include: {
        campusType: {select: {id: true, name: true}},
        nbStudent: {select: {id: true, number: true}},
      },
    });

    const campusData = await getCampusData(deleted);
    return new NextResponse(JSON.stringify(campusData), {status: 200});
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return new NextResponse(JSON.stringify({error: errorMessage}), {status: 500});
  }
}