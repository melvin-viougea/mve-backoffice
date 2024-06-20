import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { authenticate } from "@/middleware/auth";
import { getUserData } from "@/lib/dataApi";

export async function GET(request: Request) {
  const authResult = authenticate(request, true);
  if (!authResult.authenticated) {
    return new NextResponse(JSON.stringify({ error: authResult.message }), { status: 401 });
  }

  try {
    const users = await prisma.user.findMany({
      include: {
        associations: {
          include: {
            association: {
              select: {
                id: true,
                name: true,
                image: true,
                campus: {
                  select: {
                    id: true,
                    name: true
                  }
                }
              }
            }
          }
        }
      }
    });

    const allUsers = await Promise.all(users.map(async (user) => await getUserData(user)));

    return new NextResponse(JSON.stringify(allUsers), { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return new NextResponse(JSON.stringify({ error: errorMessage }), { status: 500 });
  }
}

export async function POST(request: Request) {
  const authResult = authenticate(request, true);
  if (!authResult.authenticated) {
    return new NextResponse(JSON.stringify({error: authResult.message}), {status: 401});
  }

  const json = await request.json();

  try {
    const created = await prisma.user.create({
      data: json,
      include: {
        associations: {
          include: {
            association: {
              select: {
                id: true,
                name: true,
                image: true,
                campus: {
                  select: {
                    id: true,
                    name: true
                  }
                }
              }
            }
          }
        }
      }
    });

    const userData = await getUserData(created);
    return new NextResponse(JSON.stringify(userData), {status: 201});
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return new NextResponse(JSON.stringify({error: errorMessage}), {status: 500});
  }
}