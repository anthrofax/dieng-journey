import db from "@/lib/db";
import { getCurrentUser } from "@/lib/currentUser";
import { NextRequest, NextResponse } from "next/server";
import { Reservation } from "@prisma/client";

export async function DELETE(req: NextRequest, ctx: any) {
  try {
    // i did ctx.params.id
    const { id } = ctx.params;
    console.log(id);
    const currentUser = await getCurrentUser();
    console.log(currentUser, "current user");

    const reservation = await db.reservation.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });
    console.log(reservation);

    if (reservation!.user.id !== currentUser!.id && !currentUser!.isAdmin) {
      return NextResponse.json({
        error: "User has no permissions to cancel the reservation",
      });
    }

    await db.reservation.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(
      { message: "Successfully deleted reservation with id of " + id },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(error);
  }
}
