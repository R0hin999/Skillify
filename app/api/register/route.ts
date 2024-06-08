import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import * as bcrypt from "bcrypt";

interface BodyData {
  username: string;
  email: string;
  pfp?: string;
  password?: string;
}

export async function POST(req: Request) {
  try {
    const user: BodyData = (await req.json()) as BodyData;
    if (user.password) {
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(user.password, salt);
      const newUser = await db.userdata.create({
        data: {
          username: user.username,
          email: user.email,
          password: hashPass,
        },
      });
      return NextResponse.json("Sign up Successful", { status: 200 });
    } else {
      const userExist = await db.userdata.findUnique({
        where: {
          email: user.email,
        },
      });

      if (userExist) {
        return NextResponse.json(userExist);
      } else {
        const newUser = await db.userdata.create({
          data: {
            email: user.email,
            username: user.username,
            pfp: user.pfp,
          },
        });
        if (newUser) {
          return NextResponse.json(newUser);
        } else {
          throw Error;
        }
      }
    }
  } catch (error) {
    if ((error.meta.target[0] as string) === "email") {
      return NextResponse.json("Email is already Registered", { status: 400 });
    }
    console.log("[REGISTER]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
