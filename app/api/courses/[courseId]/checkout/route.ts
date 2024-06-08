import Stripe from "stripe";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";

interface SessionProps {
  user: {
    id: string;
    email: string;
    name: string;
  };
}
export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const session: SessionProps | null = await getServerSession(authOptions);
    const userId = session?.user?.id;
    if (!session?.user || !userId || !session.user.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        isPublished: true,
      },
    });
    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: params.courseId,
        },
      },
    });

    if (purchase) {
      return new NextResponse("Already purchased", { status: 400 });
    }
    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: "inr",
          product_data: {
            name: course.title,
            description: course.description!,
          },
          unit_amount: Math.round(course.price! * 100),
          //   1 RS= 100 cents
        },
      },
    ];
    let stripCustomer = await db.stripeCustomer.findUnique({
      where: { userId },
      select: {
        stripeCustomerId: true,
      },
    });
    if (!stripCustomer) {
      const customer = await stripe.customers.create({
        name: session.user.name,
        email: session.user.email,
      });
      stripCustomer = await db.stripeCustomer.create({
        data: {
          userId,
          stripeCustomerId: customer.id,
        },
      });
    }
    const checkoutSession = await stripe.checkout.sessions.create({
      line_items,
      customer: stripCustomer.stripeCustomerId,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.id}?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.id}?cancelled=1`,
      metadata: {
        courseId: course.id,
        userId,
      },
    });
    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.log("{COURSE_ID CHECKUT]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// I had option to either accept usd to usd (with 42 card num)
// Or
// Inr to usd
// Inr to Inr but with (Test page to pass or fail payment) with specific card number
