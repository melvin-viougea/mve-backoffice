import {compare} from "bcrypt";
import {sign} from "jsonwebtoken";
import {NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";

const MAX_AGE = 60 * 5;

export async function POST(request: Request) {
  const {email, password} = await request.json();

  const user = await prisma.user.findUnique({
    where: {email}
  });

  if (!user || !(await compare(password, user.password))) {
    return new NextResponse("Invalid email or password", {status: 401});
  }

  // TODO changer cette merde
  const token = sign(
    {email},
    process.env.JWT_SECRET || "cd011b85e6f06cf38b9b8cd478a96a5cf9f79268774666c0",
    {expiresIn: MAX_AGE}
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