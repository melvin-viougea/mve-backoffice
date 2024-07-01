import {NextResponse} from "next/server";
import {authenticate} from "@/middleware/auth";
import {getAssociationData} from "@/lib/dataApi";
import {prisma} from "@/lib/prisma";

export async function GET(request: Request, {params}: { params: { id: string } }) {
  const authResult = authenticate(request, true);
  if (!authResult.authenticated) {
    return new NextResponse(JSON.stringify({error: authResult.message}), {status: 401});
  }

  const id = parseInt(params.id, 10);
  const association = await prisma.association.findUnique({
    where: {id},
    include: {
      campus: {select: {id: true, name: true}},
      associationType: {select: {id: true, name: true}},
    },
  });

  if (!association) {
    return new NextResponse(JSON.stringify({error: "Association not found"}), {status: 404});
  }

  try {
    const associationData = await getAssociationData(association);
    return new NextResponse(JSON.stringify(associationData), {status: 200});
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
    const updated = await prisma.association.update({
      where: {id},
      data: {
        name: json.name || null,
        image: json.image || null,
        campusId: json.campusId || null,
        associationTypeId: json.associationTypeId || null,
      },
      include: {
        campus: {select: {id: true, name: true}},
        associationType: {select: {id: true, name: true}},
      },
    });

    const associationData = await getAssociationData(updated);
    return new NextResponse(JSON.stringify(associationData), {status: 200});
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
    const updated = await prisma.association.update({
      where: {id},
      data: {
        ...(json.name !== undefined && {name: json.name}),
        ...(json.image !== undefined && {image: json.image}),
        ...(json.campusId !== undefined && {campusId: json.campusId}),
        ...(json.associationTypeId !== undefined && {associationTypeId: json.associationTypeId}),
      },
      include: {
        campus: {select: {id: true, name: true}},
        associationType: {select: {id: true, name: true}},
      },
    });

    const associationData = await getAssociationData(updated);
    return new NextResponse(JSON.stringify(associationData), {status: 200});
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return new NextResponse(JSON.stringify({error: errorMessage}), {status: 500});
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const authResult = authenticate(request, true);
  if (!authResult.authenticated) {
    return new NextResponse(JSON.stringify({ error: authResult.message }), { status: 401 });
  }

  const id = parseInt(params.id, 10);

  try {
    const users = await prisma.user.findMany({
      where: { associationId: id },
      select: { id: true },
    });

    const userIds = users.map(user => user.id);

    await prisma.user.deleteMany({
      where: { id: { in: userIds } },
    });

    const deleted = await prisma.association.delete({
      where: { id },
      include: {
        campus: { select: { id: true, name: true } },
        associationType: { select: { id: true, name: true } },
      },
    });

    const associationData = await getAssociationData(deleted);

    return new NextResponse(JSON.stringify(associationData), { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return new NextResponse(JSON.stringify({ error: errorMessage }), { status: 500 });
  }
}