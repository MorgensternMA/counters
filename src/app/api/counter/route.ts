import { NextResponse } from "next/server";
import { error } from "console";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        return NextResponse.json(await prisma.contadores.findMany())
    }
    catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({
                message: error,
            }, { status: 500 })
        }
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const newContador = await prisma.contadores.create({data:{
            ...data,
            contador: 0
        }});
        console.log(newContador)
        return NextResponse.json(newContador)
    }
    catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({
                message: error,
            }, { status: 500 })
        }
    }
}