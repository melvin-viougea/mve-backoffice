import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {AuthUser} from "@/types";

const maxAge = 24 * 60 * 60;

export async function POST(request: Request) {
  const { email, password } = await request.json();

  let user: AuthUser | null = await prisma.user.findUnique({
    where: { email }
  });

  let isSuperAdmin = false;

  if (!user) {
    user = await prisma.superUser.findUnique({
      where: { email },
    });
    isSuperAdmin = !!user;
  }

  if (!user || !(await compare(password, user.password))) {
    return new NextResponse("Invalid email or password", { status: 401 });
  }

  const token = sign(
    { email, isSuperAdmin },
    process.env.JWT_SECRET || "",
    { expiresIn: maxAge }
  );

  const response = {
    message: "Authenticated!",
    user: user,
    token: token,
  };

  return new NextResponse(JSON.stringify(response), { status: 200 });
}