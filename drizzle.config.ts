import type { Config } from "drizzle-kit";
import * as dotenv from 'dotenv'
dotenv.config({
    path:'.env'
})
export default {
    driver:'turso',
    schema:'./src/lib/db/schema.ts',
    dbCredentials:{
        url:process.env.DATABASE_URL! as string,
        authToken:process.env.DATABASE_TOKEN! as string
    },
} satisfies Config