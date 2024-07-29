import {prisma} from "@/lib/prisma";
import {NextResponse} from "next/server";
import {authenticate} from "@/middleware/auth";
import {getPartnerData} from "@/lib/dataApi";

export async function GET(request: Request, {params}: { params: { id: string } }) {
  const authResult = authenticate(request);
  if (!authResult.authenticated) {
    return new NextResponse(JSON.stringify({error: authResult.message}), {status: 401});
  }

  const id = parseInt(params.id, 10);
  const partner = await prisma.partner.findUnique({
    where: {id},
    include: {
      partnerType: {select: {id: true, name: true}},
      subPartnerType: {select: {id: true, name: true}},
      displayType: {select: {id: true, name: true}},
    },
  });

  if (!partner) {
    return new NextResponse(JSON.stringify({error: "Partner not found"}), {status: 404});
  }

  try {
    const partnerData = await getPartnerData(partner);

    return new NextResponse(JSON.stringify(partnerData), {status: 200});
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
    const updated = await prisma.partner.update({
      where: {id},
      data: {
        ...(json.name !== undefined && {name: json.name}),
        ...(json.date !== undefined && {date: json.date}),
        ...(json.description !== undefined && {description: json.description}),
        ...(json.firstname !== undefined && {firstname: json.firstname}),
        ...(json.lastname !== undefined && {lastname: json.lastname}),
        ...(json.email !== undefined && {email: json.email}),
        ...(json.phone !== undefined && {phone: json.phone}),
        ...(json.role !== undefined && {role: json.role}),
        ...(json.price !== undefined && {price: json.price}),
        ...(json.percentage !== undefined && {percentage: json.percentage}),
        ...(json.reduction !== undefined && {reduction: json.reduction}),
        ...(json.link !== undefined && {link: json.link}),
        ...(json.place !== undefined && {place: json.place}),
        ...(json.address !== undefined && {address: json.address}),
        ...(json.offerLimit !== undefined && {offerLimit: json.offerLimit}),
        ...(json.offerTemp !== undefined && {offerTemp: json.offerTemp}),
        ...(json.partnerTypeId !== undefined && {partnerTypeId: json.partnerTypeId}),
        ...(json.subPartnerTypeId !== undefined && {subPartnerTypeId: json.subPartnerTypeId}),
        ...(json.displayTypeId !== undefined && {displayTypeId: json.displayTypeId}),
      },
      include: {
        partnerType: {select: {id: true, name: true}},
        subPartnerType: {select: {id: true, name: true}},
        displayType: {select: {id: true, name: true}},
      },
    });

    const partnerData = await getPartnerData(updated);
    return new NextResponse(JSON.stringify(partnerData), {status: 200});
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
    const deleted = await prisma.partner.delete({
      where: {id},
      include: {
        partnerType: {select: {id: true, name: true}},
        subPartnerType: {select: {id: true, name: true}},
        displayType: {select: {id: true, name: true}},
      },
    });

    const partnerData = await getPartnerData(deleted);
    return new NextResponse(JSON.stringify(partnerData), {status: 200});
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return new NextResponse(JSON.stringify({error: errorMessage}), {status: 500});
  }
}