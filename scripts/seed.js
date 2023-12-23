
const {
    users
} = require('../src/app/_lib/placeholder-data.js');
const createConnectionPool = require('@databases/pg');
const db = createConnectionPool(process.env.DATABASE_URL);
const { sql } = require('@databases/pg');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
    try {
        await client.query(sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        // Create the "users" table if it doesn't exist
        const createTable = await client.query(sql`
        CREATE TABLE IF NOT EXISTS users (
          userId UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL,
          bio TEXT NOT NULL,
          blocked BOOLEAN DEFAULT false
        );
      `);
      const createTable2 = await client.query(sql`
      CREATE TABLE IF NOT EXISTS photo (
        userId UUID PRIMARY KEY,
        type TEXT NOT NULL,
        photo BYTEA NOT NULL,
        CONSTRAINT fk_user FOREIGN KEY(userId) REFERENCES users(userId)
      );
    `);
        console.log(`Created "users" table`);

        // Insert data into the "users" table
        const insertedUsers = await Promise.all(
            users.map(async (user) => {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                return client.query(sql`
          INSERT INTO users (userId, name, email, password, bio)
          VALUES (${user.userId}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.bio})
          ON CONFLICT (userId) DO NOTHING;
        `);
            }),
        );

        console.log(`Seeded ${insertedUsers.length} users`);

        // console.log(createTable);
        // console.log(insertedUsers);

        return {
            createTable,
            users: insertedUsers,
        };
    } catch (error) {
        console.error('Error seeding users:', error);
        throw error;
    }
}

async function main() {
    const client = db;

    await seedUsers(client);

    await client.dispose();
}

main().catch((err) => {
    console.error(
        'An error occurred while attempting to seed the database:',
        err,
    );
});