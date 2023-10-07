import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
    const { rows } = await sql`SELECT * FROM event;`;
    res.status(200).json(rows);
}