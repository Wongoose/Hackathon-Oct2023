import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
    console.log('post', req.body);
    if (req.body && req.body.name) {
        const {rows, ...result} = await sql`insert into event
        (name, startdate, enddate, starttime, endtime, 
        cadet, pisciner, agu, anyone, location, links, 
        team, individual, team_max, team_min,
        intro, details, closing_on, created_on, created_by) 
        values(
            ${req.body.name}, 
            ${req.body.startDate}, 
            ${req.body.endDate}, 
            ${req.body.startTime},
            ${req.body.endTime},
            ${req.body.cadet??false}, 
            ${req.body.pisciner??false}, 
            ${req.body.agu??false},
            ${req.body.anyone??false},
            ${req.body.eventLocation},
            ${req.body.eventLinks},
            ${req.body.asTeam??false},
            ${req.body.asIndividual??false},
            ${req.body.teamMaxMembers??0},
            ${req.body.teamMinMembers??0},
            ${req.body.intro},
            ${req.body.details},
            ${req.body.startDate + ' ' + req.body.startTime},
            to_timestamp(${Date.now() / 1000}),
            'skoh'
        ) returning id;`;
        console.log(result);
        res.status(200).json(rows); // [{"id":1}]
        // curl -d "name=hello&status=1" http://localhost:3000/api/event_create
    } else {
        res.status(400).json({error:'bad request'});
    }
}