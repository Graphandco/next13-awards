// url : http://localhost:3000/api/realisations/12345
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
    try {
        const { id } = params;

        const realisation = await prisma.realisations.findUnique({
            where: {
                id,
            },
        });

        if (!realisation) {
            return NextResponse.json(
                { message: "Réalisation non trouvée", err },
                { status: 404 }
            );
        }

        return NextResponse.json(realisation);
    } catch (err) {
        return NextResponse.json(
            { message: "erreur de GET", err },
            { status: 500 }
        );
    }
};

export const PATCH = async (request, { params }) => {
    try {
        const body = await request.json();
        const { title, slug, description, imageURL } = body;
        const { id } = params;
        const updateRealisation = await prisma.realisations.update({
            where: { id },
            data: {
                title,
                slug,
                description,
                imageURL,
            },
        });

        if (!updateRealisation) {
            return NextResponse.json(
                { message: "Réalisation non trouvée", err },
                { status: 404 }
            );
        }

        return NextResponse.json(updateRealisation);
    } catch (err) {
        return NextResponse.json(
            { message: "erreur de UPDATE", err },
            { status: 500 }
        );
    }
};

export const DELETE = async (request, { params }) => {
    try {
        const { id } = params;

        await prisma.realisations.delete({
            where: {
                id,
            },
        });

        return NextResponse.json("Réalisation supprimée");
    } catch (err) {
        return NextResponse.json(
            { message: "erreur de DELETE", err },
            { status: 500 }
        );
    }
};
