import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { error } from "console";
import { preloadStyle } from "next/dist/server/app-render/entry-base";

interface Params { params: { id: number } }
const prisma = new PrismaClient();

export async function DELETE(request: Request, { params }: Params) {
    try {
        console.log(params)
        const deleted = await prisma.contadores.delete({where:{
            id: Number(params.id)
        }});
        return NextResponse.json(deleted)
    }
    catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({
                message: error,
            }, { status: 500 })
        }
    }
}

export async function PUT(request: Request, { params }: Params) {
    try {
        const data = await request.json();
        console.log(data)
        const updated = await prisma.contadores.update({
            where: {
                id: Number(params.id),
            },
            data: {
                contador: data.count
            }
        })
        console.log(updated)
        return NextResponse.json(updated)
    }
    catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({
                message: error,
            }, { status: 500 })
        }
    }
}