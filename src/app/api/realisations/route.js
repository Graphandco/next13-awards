// url : http://localhost:3000/api/realisations
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    try {
        const body = await request.json();
        const { title, slug, description, imageURL } = body;
        const newRealisation = await prisma.realisations.create({
            data: {
                title,
                slug,
                description,
                imageURL,
            },
        });

        return NextResponse.json(newRealisation);
    } catch (err) {
        return NextResponse.json(
            { message: "erreur de POST", err },
            { status: 500 }
        );
    }
};

export const GET = async () => {
    try {
        const realisations = await prisma.realisations.findMany();
        return NextResponse.json(realisations);
    } catch (err) {
        return NextResponse.json(
            { message: "erreur de GET", err },
            { status: 500 }
        );
    }
};
