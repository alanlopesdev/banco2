import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { eq } from 'drizzle-orm';
import { usersTable } from './schema';
  
export const db = drizzle({connection: {
  url: process.env.DB_FILE_NAME!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
}});



