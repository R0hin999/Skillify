import { db } from "@/lib/db";
import * as bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await db.userdata.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return new NextResponse("Unauthorized", { status: 500 });
    }
    const result = await bcrypt.compare(password, user.password!);
    if (result && user.isAdmin) {
      const { password, pfp, isTeacher, ...others } = user;
      return NextResponse.json(others);
    } else {
      return new NextResponse("Unauthorized", { status: 500 });
    }
  } catch (error) {
    console.log("[isAdmin]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
