import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
    const { rows: event_rows } = await sql`
    SELECT name
    FROM event 
    where id=${req.query.event_id}`;
    if (event_rows.length == 0) return res.status(404).json({ error: 'Event not found' });
    const event_name = event_rows[0].name;

    const { rows } = await sql`
    SELECT m.*, t.name as team_name, a.image
    FROM member m 
    left join team t on m.team_id=t.id
    left join account a on m.login=a.login
    where m.event_id=${req.query.event_id}
    limit 10`;
    res.status(200).json({event_name, rows});
}