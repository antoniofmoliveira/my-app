'use server'

import { signIn } from '@/auth'; 
import { AuthError } from 'next-auth';
import db, { sql } from './db';
import { User } from './definitions';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function getUser(){
   const res: User[] = await db.query(sql`select * from users limit 1`);
   return res[0];
}

