import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { eq } from 'drizzle-orm';
import { usersTable } from './schema';
  
export const db = drizzle({connection: {
  url: process.env.DB_FILE_NAME!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
}});

async function main() {
  const user: typeof usersTable.$inferInsert = {
    name: 'John',
    saldo: 30,
    cpf: '00000000000'
  };

  await db.insert(usersTable).values(user);
  console.log('New user ' +user["name"] + ' created!')
//cria usuario John
}


