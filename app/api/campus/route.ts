import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { authenticate } from "@/middleware/auth";

export async function GET(request: Request) {
  const authResult = authenticate(request, true);
  if (!authResult.authenticated) {
    return new NextResponse(JSON.stringify({ error: authResult.message }), { status: 401 });
  }

  const campuses = await prisma.campus.findMany();
  return NextResponse.json(campuses);
}

export async function POST(request: Request) {
  const authResult = authenticate(request, true);
  if (!authResult.authenticated) {
    return new NextResponse(JSON.stringify({ error: authResult.message }), { status: 401 });
  }

  const json = await request.json();

  const created = await prisma.campus.create({
    data: json,
  });

  return new NextResponse(JSON.stringify(created), { status: 201 });
}