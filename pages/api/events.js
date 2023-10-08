import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
    const { rows } = await sql`SELECT * FROM event order by startdate;`;
    res.status(200).json(rows);
}