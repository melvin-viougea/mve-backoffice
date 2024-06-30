import {hash} from "bcrypt";
import {sign} from "jsonwebtoken";
import {NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";

const maxAge = 24 * 60 * 60;

export async function POST(request: Request) {
  const {email, password, address, city, postalCode, firstname, lastname} = await request.json();

  const existingUser = await prisma.user.findFirst({
    where: {email}
  });

  if (existingUser) {
    return new NextResponse("User already exists", {status: 400});
  }

  const hashedPassword = await hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      address,
      city,
      firstname,
      lastname,
      postalCode,
      //TODO add associationId
      associationId: 1,
    }
  })

  const token = sign(
    {email},
    process.env.JWT_SECRET || "",
    {expiresIn: maxAge}
  );
  const response = {
    message: "Authenticated!",
    user: newUser,
    token: token,
  };

  return new NextResponse(JSON.stringify(response), {
    status: 200,
  });
}
