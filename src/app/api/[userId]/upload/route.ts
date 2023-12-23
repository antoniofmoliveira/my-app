import { Blob } from 'node:buffer';
import { NextResponse } from "next/server";
// import fs from "fs";
// import path from 'node:path';
import { setPhoto } from '@/app/_lib/actions';

export async function POST(req: Request,
    { params }: { params: { userId: string } }) {
    const res = NextResponse.json({ status: 200 });
    const formData = await req.formData();
    const file = formData.get('avatar') as File;
    if (file instanceof Blob) {
        const ab = await file.arrayBuffer();
        const buffer = Buffer.from(ab);
        // await fs.promises.writeFile(path.join('./public/data/uploads/', file.name), buffer, { encoding: 'binary' });
        //recuperar userId da sessão
        // let userId = '410544b2-4001-4271-9855-fec4b6a6442a';
        const userId = params.userId;
        setPhoto(userId, file.type, buffer);
    }
    return res;
}
// http://localhost:3000/api/410544b2-4001-4271-9855-fec4b6a6442a/upload