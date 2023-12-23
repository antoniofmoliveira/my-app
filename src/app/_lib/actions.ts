'use server'

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import db, { sql } from './db';
import { Photo, Todo, User } from './definitions';

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

export async function getUser() {
    const res: User[] = await db.query(sql`select * from users limit 1`);
    return res[0];
}

export async function setPhoto(userId: string, type: string, buffer: Buffer) {
    const res = await db.query(sql`INSERT INTO photo (userId, type, photo) values (${userId}, ${type}, ${buffer})`);
    // console.log(res);
}

export async function getPhoto(userId: string) {
    const res: Photo[] = await db.query(sql`SELECT userId, type, photo FROM photo WHERE userId = ${userId}`);
    return res[0];

}

export async function getTodos(userId: string) {
    const res = await db.query(sql`SELECT todoId, userId, title, completed, dueDate FROM todo WHERE userId = ${userId}`);
    const res2 = res.map(reg => ({ todoId: reg.todoid, userId: reg.userid, title: reg.title, completed: reg.completed, dueDate: reg.duedate }))
    return res2;
}

export async function getTodo(todoId: string) {
    const res: Todo[] = await db.query(sql`SELECT todoId, userId, title, completed, dueDate FROM todo WHERE todoId = ${todoId}`);
    return res[0];
}

export async function setTodo(todo: Todo) {
    const res = await db.query(sql`INSERT INTO todo (userId, title, completed, dueDate) VALUES (${todo.userId}, ${todo.title}, ${todo.completed}, ${todo.dueDate})`);
    return res;
}

export async function deleteTodo(todoId: string) {
    const res = await db.query(sql`DELETE FROM todo WHERE todoId = ${todoId}`);
    return res;
}

export async function completeTodo(todoId: string) {
    const res = await db.query(sql`UPDATE todo SET completed = TRUE WHERE todoId = ${todoId}`);
    return res;
}


