'use client'
import { useParams } from "next/navigation"

export default function AddPhoto() {
    const userId = useParams()['userId']

    return (
        <form action={`/api/${userId}/upload`} method="post" encType="multipart/form-data">
            <input type="file" name="avatar" />
            <input type="submit" value="submit" />
        </form>
    )
}

// http://localhost:3000/user/410544b2-4001-4271-9855-fec4b6a6442a/addphoto