import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
    const login = req.cookies.login;
    const { rows } = await sql`
    SELECT e.*, m.login FROM event e
    left join member m on m.login=${login} and m.event_id=e.id
    where e.id=${req.query.event_id}`;
    res.status(200).json(rows);
}