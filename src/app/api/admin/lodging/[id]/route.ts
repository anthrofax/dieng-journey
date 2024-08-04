import db from "@/lib/db";
import isAdminUser from "@/lib/isAdminUser";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, ctx: any) {
  try {
    await isAdminUser();

    const { id } = ctx.params;

    const selectedLodging = await db.penginapan.findUnique({
      where: {
        id,
      },
    });

    return NextResponse.json(selectedLodging);
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function PATCH(req: NextRequest, ctx: any) {
  try {
    await isAdminUser();

    const { id } = ctx.params;
    const body = await req.json();

    console.log(body);

    await db.penginapan.update({
      where: { id },
      data: body,
    });

    return NextResponse.json({
      message: "Data penginapan telah berasil diperbarui",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function DELETE(req: NextRequest, ctx: any) {
  try {
    await isAdminUser();
    const { id } = ctx.params;

    const deletedLodging = await db.penginapan.delete({
      where: { id },
    });

    if (deletedLodging) {
      return NextResponse.json(
        { message: "Data experience telah berhasil dihapus" },
        { status: 200 }
      );
    } else {
      return NextResponse.json({
        error: `Experience dengan id ${id} tidak tersedia!`,
      });
    }
  } catch (error) {
    return NextResponse.json({ error });
  }
}
