import { getPhoto } from "@/app/_lib/actions";
import { NextResponse } from "next/server";

// TODO! adicionar tratamento de erro
export async function GET(req: Request,
    { params }: { params: { userId: string } }) {
    const userId = params.userId;
    const photo = await getPhoto(userId);
    const res = new NextResponse(photo.photo);
    res.headers.set('Content-Type', photo.type)
    return res
}


// http://localhost:3000/api/410544b2-4001-4271-9855-fec4b6a6442a/photo