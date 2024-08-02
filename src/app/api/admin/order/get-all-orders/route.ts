import db from "@/lib/db";
import isAdminUser from "@/lib/isAdminUser";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await isAdminUser();

    const allOrders = await db.order.findMany({
      include: {
        destination: {
          select: {
            imageUrls: true,
            destinationName: true,
            price: true

          },
        },
        orderExperience: {
          select: {
            experience: {
              select: {
                experienceName: true,
                price: true
              },
            },
          },
        },
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    return NextResponse.json(allOrders);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
