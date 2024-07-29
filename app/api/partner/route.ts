import {prisma} from "@/lib/prisma"
import {NextResponse} from "next/server";
import {authenticate} from "@/middleware/auth";
import {getPartnerData} from "@/lib/dataApi";

export async function GET(request: Request) {
  const authResult = authenticate(request);
  if (!authResult.authenticated) {
    return new NextResponse(JSON.stringify({error: authResult.message}), {status: 401});
  }

  try {
    const partners = await prisma.partner.findMany({
      include: {
        partnerType: {select: {id: true, name: true}},
        subPartnerType: {select: {id: true, name: true}},
        displayType: {select: {id: true, name: true}},
      },
    });

    const allPartner = await Promise.all(partners.map(async (partner) => await getPartnerData(partner)));

    return new NextResponse(JSON.stringify(allPartner), {status: 200});
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
    const created = await prisma.partner.create({
      data: json,
      include: {
        partnerType: {select: {id: true, name: true}},
        subPartnerType: {select: {id: true, name: true}},
        displayType: {select: {id: true, name: true}},
      },
    });

    const partnerData = await getPartnerData(created);
    return new NextResponse(JSON.stringify(partnerData), {status: 201});
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return new NextResponse(JSON.stringify({error: errorMessage}), {status: 500});
  }
}