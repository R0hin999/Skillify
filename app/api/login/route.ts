import { db } from "@/lib/db";
import * as bcrypt from "bcrypt";
import { NextResponse } from "next/server";
interface BodyData {
  email: string;
  password: string;
}
interface DbData {
  id: number;
  username: string;
  email: string;
  pfp?: string;
  password: string;
}
export async function POST(req: Request) {
  try {
    const { email, password } = (await req.json()) as BodyData;
    // console.log(email);

    const val: DbData = await db.userdata.findUnique({
      where: {
        email: email,
      },
    });

    const result = await bcrypt.compare(password, val.password);
    if (result) {
      return NextResponse.json(val);
    } else {
      return NextResponse.json("Wrong password", { status: 400 });
    }
  } catch (error) {
    return Error;
  }
}
