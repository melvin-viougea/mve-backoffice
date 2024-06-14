import {compare} from "bcrypt";
import {sign} from "jsonwebtoken";
import {NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";

const maxAge = 24 * 60 * 60;

export async function POST(request: Request) {
  const {email, password} = await request.json();

  const user = await prisma.user.findUnique({
    where: {email}
  });

  if (!user || !(await compare(password, user.password))) {
    return new NextResponse("Invalid email or password", {status: 401});
  }

  const token = sign(
    {email},
    process.env.JWT_SECRET || "",
    {expiresIn: maxAge}
  );

  const response = {
    message: "Authenticated!",
    user: user,
    token: token,
  };

  return new NextResponse(JSON.stringify(response), {
    status: 200,
  });
}