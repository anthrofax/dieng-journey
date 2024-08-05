import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: any) {
  try {
    const { id } = res.params;

    console.log(id);

    const user = await db.user.findUnique({
      where: { id },
    });

    console.log(user);

    if (!user) throw new Error("User not found");

    const { password, ...foundUser } = user;
    console.log(foundUser);

    return NextResponse.json({ user: foundUser });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function PATCH(req: NextRequest, ctx: any) {
  try {
    const { id } = ctx.params;
    const body = await req.json();

    console.log(body)

    const updatedUser = await db.user.update({
      data: {
        ...body,
      },
      where: { id },
    });

    console.log("Result => " + updatedUser);

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
