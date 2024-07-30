import db from "@/lib/db";
import isAdminUser from "@/lib/isAdminUser";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, ctx: any) {
  try {
    await isAdminUser();

    const { id } = ctx.params;

    const selectedExperience = await db.experience.findUnique({
      where: {
        id,
      },
    });

    return NextResponse.json(selectedExperience);
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function PUT(req: NextRequest, ctx: any) {
  try {
    await isAdminUser();

    const { id } = ctx.params;
    const body = await req.json();

    await db.experience.update({
      where: { id },
      data: { ...body },
    });

    return NextResponse.json({
      message: "Data experience telah berasil diperbarui",
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

    const deleteddestination = await db.experience.delete({
      where: { id },
    });

    if (deleteddestination) {
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
