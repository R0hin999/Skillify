import { db } from "@/lib/db";

import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  const { userId, values } = await req.json();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const courseOwner = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId: userId,
    },
  });
  try {
    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const attachment = await db.attachment.create({
      data: {
        url: values.url,
        name: values.url.split("/").pop(),
        courseId: params.courseId,
      },
    });
    return NextResponse.json(attachment);
  } catch (error) {
    console.log("{COURSE_ID_ATTACHMENTS}", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
