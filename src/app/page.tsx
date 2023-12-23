
import Image from 'next/image'
import { inter, lusitana } from '@/app/_ui/fonts';
import { getUser } from './_lib/actions';

export default async function Home() {
    const user = await getUser();
    return (

        <main>
            {user.email} {user.userId}
        </main>
    )
}
