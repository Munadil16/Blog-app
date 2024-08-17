import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";
import { signUpSchema, SignUpType } from "@/lib/schemas/signUpSchema";
import prisma from "@/db";

export async function POST(req: NextRequest) {
  const body: SignUpType = await req.json();
  const { success, error, data } = signUpSchema.safeParse(body);

  if (!success) {
    return NextResponse.json(
      { message: error.errors[0].message, success: false },
      { status: 400 }
    );
  }

  const { email, username, password } = data;

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists", success: false },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);

    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        provider: "credentials",
      },
    });

    return NextResponse.json(
      { message: "User created successfully", success: true },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error while creating new user: ", error);
    return NextResponse.json(
      { message: "Server error", success: false },
      { status: 500 }
    );
  }
}
