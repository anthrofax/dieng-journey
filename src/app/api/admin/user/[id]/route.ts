import db from "@/lib/db";
import isAdminUser from "@/lib/isAdminUser";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: any) {
  try {
    await isAdminUser();

    const { id } = res.params;

    const user = await db.user.findUnique({
      where: { id },
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function PUT(req: NextRequest, ctx: any) {
  try {
    await isAdminUser();
    const { id } = ctx.params;
    const body = await req.json();

    const updatedUser = await db.user.update({
      data: {
        ...body,
      },
      where: { id },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function DELETE(req: NextRequest, ctx: any) {
  try {
    await isAdminUser();
    const { id } = ctx.params;

    const deletedUser = await db.user.delete({
      where: { id },
    });

    if (deletedUser) {
      return NextResponse.json(
        { message: "User has been successfully deleted!" },
        { status: 200 }
      );
    } else {
      return NextResponse.json({
        message: `User with the id of ${id} doesn't exist!`,
      });
    }
  } catch (error) {
    return NextResponse.json({ error });
  }
}
