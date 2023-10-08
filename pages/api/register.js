import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
    let teamId;
    const login = req.cookies.login;
    console.log('post', req.body);
    if (req.body) {
        const { rows, ...result } = await sql`
        insert into team
        (event_id, name, member_count, created_on, created_by) 
        values(
            ${req.body.event_id},
            ${req.body.teamName},
            ${req.body.members.length / 2},
            to_timestamp(${Date.now() / 1000}),
            ${login}
        ) returning id;`;
        console.log(result);
        res.status(200).json(rows);
        teamId = rows[0].id// [{"id":1}]
        // curl -d "name=hello&status=1" http://localhost:3000/api/event_create
    } else {
        res.status(400).json({ error: 'bad request' });
        return
    }

    let memberCount = 0;
    for (let i = 0; i < req.body.members.length; i += 2) {
        const member_name = req.body.members[i];
        const member_login = req.body.members[i + 1];
        if (!member_login || !member_name) continue;
        const { rows, ...result } = await sql`
        insert into member
        (event_id,team_id, login, name, created_on, created_by)
        values(
            ${req.body.event_id},
            ${teamId},
            ${member_login},
            ${member_name},
            to_timestamp(${Date.now() / 1000}),
            ${login}
        ) returning id;`;
        ++memberCount;
        console.log(result);
    }
    const updateResult = await sql`update event set total_ppl = total_ppl  + ${memberCount} where id = ${req.body.event_id};`;
    res.status(200).json(teamId); // [{"id":1}]

    // curl -d "name=hello&status=1" http://localhost:3000/api/event_create

}