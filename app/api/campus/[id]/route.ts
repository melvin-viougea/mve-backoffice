import {prisma} from "@/lib/prisma";
import {NextResponse} from "next/server";
import {authenticate} from "@/middleware/auth";

export async function GET(request: Request, {params}: { params: { id: string } }) {
  const authResult = authenticate(request);
  if (!authResult.authenticated) {
    return new NextResponse(JSON.stringify({error: authResult.message}), {status: 401});
  }

  const id = params.id
  const campuses = await prisma.campus.findUnique({
    where: {
      id: parseInt(id)
    }
  })
  return NextResponse.json(campuses)
}

export async function PUT(request: Request, {params}: { params: { id: string } }) {
  const authResult = authenticate(request);
  if (!authResult.authenticated) {
    return new NextResponse(JSON.stringify({error: authResult.message}), {status: 401});
  }

  const id = params.id
  const json = await request.json()

  const updated = await prisma.campus.update({
    where: {
      id: parseInt(id)
    },
    data: {
      name: json.name || null,
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

  const updated = await prisma.campus.update({
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

  const deleted = await prisma.campus.delete({
    where: {
      id: parseInt(id)
    }
  })
  return NextResponse.json(deleted)
}