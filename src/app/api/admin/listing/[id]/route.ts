import db from "@/lib/db";
import isAdminUser from "@/lib/isAdminUser";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest, ctx:any) {
    try {
        await isAdminUser()

        const { id } = ctx.params

        const listing = await db.listing.findUnique({
            where: { id }
        })

        return NextResponse.json(listing)
    } catch (error) {
        return NextResponse.json({error})
    }
}

export async function PUT(req:NextRequest, ctx:any) {
    try {
        await isAdminUser()

        const { id } = ctx.params
        const body = await req.json()

        const updatedListing = await db.listing.update({
            where: { id },
            data: { ...body }
        })

        return NextResponse.json(updatedListing)
    } catch (error) {
        return NextResponse.json({error})
    }
}

export async function DELETE(req:NextRequest, ctx:any) {
    try {
        await isAdminUser()
        const { id } = ctx.params

        const deletedListing = await db.listing.delete({
            where: { id }
        })

        if (deletedListing) {
            return NextResponse.json({ message: "Listing has been deleted successfully" }, { status: 200 })
        } else {
            return NextResponse.json({ error: `Listing with the id of ${id} doesn't exist!` })
        }
    } catch (error) {
        return NextResponse.json({error})
    }
}