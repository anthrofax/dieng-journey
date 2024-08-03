import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, ctx: any) {
  try {
    const { destinationId } = ctx.params;

    const destination = await db.destination.findUnique({
      where: { destinationId },
      include: {
        experiences: true,
      },
    });

    return NextResponse.json(destination);
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function PUT(req: NextRequest, ctx: any) {
  try {
    const { destinationId } = ctx.params;
    const body = await req.json();

    const updateddestination = await db.destination.update({
      where: { destinationId },
      data: { ...body },
    });

    return NextResponse.json(updateddestination);
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function DELETE(req: NextRequest, ctx: any) {
  try {
    const { destinationId } = ctx.params;

    const deleteddestination = await db.destination.delete({
      where: { destinationId },
    });

    if (deleteddestination) {
      return NextResponse.json(
        { message: "Data destinasi telah berhasil dihapus" },
        { status: 200 }
      );
    } else {
      return NextResponse.json({
        error: `Destinasi dengan id ${destinationId} tidak tersedia!`,
      });
    }
  } catch (error) {
    return NextResponse.json({ error });
  }
}
