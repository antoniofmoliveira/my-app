import createConnectionPool, { sql } from '@databases/pg';
import { unstable_noStore as noStore } from 'next/cache';
import { User } from './definitions';

export { sql };

const db = createConnectionPool(process.env.DATABASE_URL);
export default db;

export async function getUser(email: string) {
    noStore();

    try {
        const user = await db.query(sql`SELECT * FROM users WHERE email=${email}`);
        return user[0] as User;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

// any
//     createUser
//     uploadPhoto
// owner
//     editUser
//     changePassword
//     uploadPhoto
// Admin
//     blockUser
//     changeUserRole
//     listUsers
// canCreate 
//     createTodo
// owner
//     editTodo
//     completeTodo
//     deleteTodo
//     listTodo
// canView
//     listPosts
//     viewPost
// canCreate
//     createPost
// owner
//     editPost
//     publishPost
//     retractPost
// canAdmin
//     retractPost
//     hidePost
// canView
//     listComments
// canComment
//     createComment
// owner
// canAdmin
//     hideComment