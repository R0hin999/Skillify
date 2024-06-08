import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { id, title } = await req.json();
    if (!id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const course = await db.course.create({ data: { userId: id, title } });
    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
