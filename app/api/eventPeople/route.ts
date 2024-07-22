import {prisma} from "@/lib/prisma"
import {NextResponse} from "next/server";
import {authenticate} from "@/middleware/auth";

export async function GET(request: Request) {
  const authResult = authenticate(request);
  if (!authResult.authenticated) {
    return new NextResponse(JSON.stringify({error: authResult.message}), {status: 401});
  }

  const eventPeoples = await prisma.eventPeople.findMany()
  return NextResponse.json(eventPeoples)
}

export async function POST(request: Request) {
  const authResult = authenticate(request);
  if (!authResult.authenticated) {
    return new NextResponse(JSON.stringify({error: authResult.message}), {status: 401});
  }

  const json = await request.json()

  const created = await prisma.eventPeople.create({
    data: json
  })

  return new NextResponse(JSON.stringify(created), {status: 201})
}