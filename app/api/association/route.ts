import {prisma} from "@/lib/prisma"
import {NextResponse} from "next/server";
import {authenticate} from "@/middleware/auth";
import {getAssociationData, getEventData} from "@/lib/dataApi";

export async function GET(request: Request) {
  const authResult = authenticate(request, true);
  if (!authResult.authenticated) {
    return new NextResponse(JSON.stringify({error: authResult.message}), {status: 401});
  }

  try {
    const associations = await prisma.association.findMany({
      include: {
        campus: {select: {id: true, name: true}},
      },
    });

    const allAssociations = await Promise.all(associations.map(async (association) => await getAssociationData(association)));

    return new NextResponse(JSON.stringify(allAssociations), {status: 200});
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return new NextResponse(JSON.stringify({error: errorMessage}), {status: 500});
  }
}

export async function POST(request: Request) {
  const authResult = authenticate(request, true);
  if (!authResult.authenticated) {
    return new NextResponse(JSON.stringify({error: authResult.message}), {status: 401});
  }

  const json = await request.json();

  try {
    const created = await prisma.association.create({
      data: json,
      include: {
        campus: {select: {id: true, name: true}},
      },
    });

    const associationData = await getAssociationData(created);
    return new NextResponse(JSON.stringify(associationData), {status: 201});
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return new NextResponse(JSON.stringify({error: errorMessage}), {status: 500});
  }
}