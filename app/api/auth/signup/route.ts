import {hash} from "bcrypt";
import {sign} from "jsonwebtoken";
import {NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";

const MAX_AGE = 60 * 5;

export async function POST(request: Request) {
    const { email, password, address, city, postalCode, firstname, lastname } = await request.json();

    const existingUser = await prisma.user.findFirst({
        where: { email }
    });

    if (existingUser) {
        return new NextResponse("User already exists", { status: 400 });
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
        }
    })

    // TODO changer cette merde
    const token = sign(
      { email },
      process.env.JWT_SECRET || "cd011b85e6f06cf38b9b8cd478a96a5cf9f79268774666c0",
      { expiresIn: MAX_AGE }
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
