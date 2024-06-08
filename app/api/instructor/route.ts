import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      userId,
      username,
      useremail,
    }: { userId: string; username: string; useremail: string } =
      await req.json();
    const userExist = await db.reqData.findUnique({
      where: {
        userId,
        username,
        useremail,
      },
    });
    if (userExist) {
      return new NextResponse("Request granted already", { status: 200 });
    }
    const newUser = await db.reqData.create({
      data: {
        userId,
        username,
        useremail,
      },
    });
    return NextResponse.json("Request sent Successfuly", { status: 200 });
  } catch (error) {
    console.log("[INSTRUCTOR]", error);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}
