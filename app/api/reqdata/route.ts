import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await db.reqData.findMany({
      where: {
        status: "Pending",
      },
    });
    if (!users) {
      return NextResponse.json("No user found");
    }
    return NextResponse.json(users);
  } catch (error) {
    console.log("[REQ_DATA]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { adminId, userId, status } = await req.json();

    const admin = await db.userdata.findUnique({
      where: {
        id: adminId,
        isAdmin: true,
      },
    });

    if (!admin) {
      return new NextResponse("Unauthorized", { status: 400 });
    }
    const updateUser = await db.userdata.update({
      where: {
        id: userId,
      },
      data: {
        isTeacher: status,
      },
    });
    const withDrawReq = await db.reqData.delete({ where: { userId } });
    return NextResponse.json(updateUser);
  } catch (error) {
    console.log("[REQ_DATA]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
