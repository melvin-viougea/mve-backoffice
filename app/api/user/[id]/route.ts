import {NextResponse} from "next/server";
import {authenticate} from "@/middleware/auth";
import {getUserData} from "@/lib/dataApi";
import {prisma} from "@/lib/prisma";

export async function GET(request: Request, {params}: { params: { id: string } }) {
  const authResult = authenticate(request, true);
  if (!authResult.authenticated) {
    return new NextResponse(JSON.stringify({error: authResult.message}), {status: 401});
  }

  const id = parseInt(params.id, 10);
  const user = await prisma.user.findUnique({
    where: {id},
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

  if (!user) {
    return new NextResponse(JSON.stringify({error: "User not found"}), {status: 404});
  }

  try {
    const userData = await getUserData(user);
    return new NextResponse(JSON.stringify(userData), {status: 200});
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return new NextResponse(JSON.stringify({error: errorMessage}), {status: 500});
  }
}

export async function PUT(request: Request, {params}: { params: { id: string } }) {
  const authResult = authenticate(request, true);
  if (!authResult.authenticated) {
    return new NextResponse(JSON.stringify({error: authResult.message}), {status: 401});
  }

  const id = parseInt(params.id, 10);
  const json = await request.json();

  try {
    const updated = await prisma.user.update({
      where: {id},
      data: {
        firstname: json.firstname || null,
        lastname: json.lastname || null,
        address: json.address || null,
        city: json.city || null,
        postalCode: json.postalCode || null,
        email: json.email || null,
        password: json.password || null,
      },
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

    const userData = await getUserData(updated);
    return new NextResponse(JSON.stringify(userData), {status: 200});
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return new NextResponse(JSON.stringify({error: errorMessage}), {status: 500});
  }
}

export async function PATCH(request: Request, {params}: { params: { id: string } }) {
  const authResult = authenticate(request, true);
  if (!authResult.authenticated) {
    return new NextResponse(JSON.stringify({error: authResult.message}), {status: 401});
  }

  const id = parseInt(params.id, 10);
  const json = await request.json();

  try {
    const updated = await prisma.user.update({
      where: {id},
      data: {
        ...(json.firstname !== undefined && {firstname: json.firstname}),
        ...(json.lastname !== undefined && {lastname: json.lastname}),
        ...(json.address !== undefined && {address: json.address}),
        ...(json.city !== undefined && {city: json.city}),
        ...(json.postalCode !== undefined && {postalCode: json.postalCode}),
        ...(json.email !== undefined && {email: json.email}),
        ...(json.password !== undefined && {password: json.password}),
      },
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

    const userData = await getUserData(updated);
    return new NextResponse(JSON.stringify(userData), {status: 200});
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return new NextResponse(JSON.stringify({error: errorMessage}), {status: 500});
  }
}

export async function DELETE(request: Request, {params}: { params: { id: string } }) {
  const authResult = authenticate(request, true);
  if (!authResult.authenticated) {
    return new NextResponse(JSON.stringify({error: authResult.message}), {status: 401});
  }

  const id = parseInt(params.id, 10);

  try {
    const deleted = await prisma.user.delete({
      where: {id},
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

    const userData = await getUserData(deleted);
    return new NextResponse(JSON.stringify(userData), {status: 200});
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return new NextResponse(JSON.stringify({error: errorMessage}), {status: 500});
  }
}