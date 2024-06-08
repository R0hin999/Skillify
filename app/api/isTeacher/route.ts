import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 400 });
    }
    const data = await db.userdata.findUnique({
      where: { id: userId },
    });
    if (!data) {
      return new NextResponse("User not found", { status: 400 });
    }
    return NextResponse.json(data.isTeacher);
  } catch (error) {
    console.log("{IS_TEACHER}", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
