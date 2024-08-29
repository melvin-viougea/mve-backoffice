import {prisma} from "@/lib/prisma"
import {NextResponse} from "next/server";
import {authenticate} from "@/middleware/auth";

export async function GET(request: Request) {
  const authResult = authenticate(request);
  if (!authResult.authenticated) {
    return new NextResponse(JSON.stringify({error: authResult.message}), {status: 401});
  }

  const dealTypes = await prisma.dealType.findMany()
  return NextResponse.json(dealTypes)
}