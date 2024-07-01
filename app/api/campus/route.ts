import {prisma} from "@/lib/prisma";
import {NextResponse} from "next/server";
import {authenticate} from "@/middleware/auth";
import {getCampusData} from "@/lib/dataApi";

export async function GET(request: Request) {
  const authResult = authenticate(request, true);
  if (!authResult.authenticated) {
    return new NextResponse(JSON.stringify({error: authResult.message}), {status: 401});
  }

  try {
    const campuses = await prisma.campus.findMany({
      include: {
        campusType: {select: {id: true, name: true}},
        nbStudent: {select: {id: true, number: true}},
      },
    });

    const allCampuses = await Promise.all(campuses.map(async (campus) => await getCampusData(campus)));

    return new NextResponse(JSON.stringify(allCampuses), {status: 200});
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
    const created = await prisma.campus.create({
      data: json,
      include: {
        campusType: {select: {id: true, name: true}},
        nbStudent: {select: {id: true, number: true}},
      },
    });

    const campusData = await getCampusData(created);
    return new NextResponse(JSON.stringify(campusData), {status: 201});
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return new NextResponse(JSON.stringify({error: errorMessage}), {status: 500});
  }
}