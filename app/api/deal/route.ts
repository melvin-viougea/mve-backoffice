import {prisma} from "@/lib/prisma"
import {NextResponse} from "next/server";
import {authenticate} from "@/middleware/auth";
import {getDealData} from "@/lib/dataApi";

export async function GET(request: Request) {
  const authResult = authenticate(request);
  if (!authResult.authenticated) {
    return new NextResponse(JSON.stringify({error: authResult.message}), {status: 401});
  }

  try {
    const deals = await prisma.deal.findMany({
      include: {
        association: {select: {id: true, name: true}},
        company: {select: {id: true, name: true}},
        format: {select: {id: true, name: true}},
        offerType: {select: {id: true, name: true}},
        dealType: {select: {id: true, name: true}},
        dealCategory: {select: {id: true, name: true}},
        subDealCategory: {select: {id: true, name: true}},
        displayType: {select: {id: true, name: true}},
      },
    });

    const allDeal = await Promise.all(deals.map(async (deal) => await getDealData(deal)));
    return new NextResponse(JSON.stringify(allDeal), {status: 200});
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
    const created = await prisma.deal.create({
      data: json,
      include: {
        association: {select: {id: true, name: true}},
        company: {select: {id: true, name: true}},
        format: {select: {id: true, name: true}},
        offerType: {select: {id: true, name: true}},
        dealType: {select: {id: true, name: true}},
        dealCategory: {select: {id: true, name: true}},
        subDealCategory: {select: {id: true, name: true}},
        displayType: {select: {id: true, name: true}},
      },
    });

    const dealData = await getDealData(created);
    return new NextResponse(JSON.stringify(dealData), {status: 201});
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return new NextResponse(JSON.stringify({error: errorMessage}), {status: 500});
  }
}