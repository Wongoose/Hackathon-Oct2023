/** @format */
import {fetchApi} from "./apiService";
import {} from "./dataService";

// import { stateToPage } from "../../data/pages";




/*
INSERT INTO user (login, )
VALUES(${})
ON CONFLICT (login)
DO NOTHING
*/

async function getAccessToken(req) {
    const postParams = {
        grant_type: "authorization_code",
        client_id: process.env.API_CLIENT_ID,
        client_secret: process.env.API_CLIENT_SECRET,
        code: req.query.code,
        redirect_uri: process.env.API_REDIRECT_URI,
        state: req.query.state,
    };
    const response = await fetch("https://api.intra.42.fr/oauth/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postParams),
    });
    if (!response.ok) throw new Error(response.statusText);
    const {
        access_token,
        refresh_token,
        token_type, //bearer
        created_at, //1647908553 timestamp
        expires_in, //7200 second
        scope, //public
    } = await response.json();
    return {access_token, refresh_token, token_type, created_at, expires_in, scope};
}

export default async function handler(req, res) {
    
    try {
        const {access_token, expires_in} = await getAccessToken(req);
        const data = await fetchApi(access_token, 'me');
        // console.log('me', data);
        // res.status(200).json(data); return;

        res.setHeader(
            "Set-Cookie",
            [
            `access_token=${access_token}; Path=/; Max-Age=${expires_in}`,
            `login=${data.login}; Path=/; Max-Age=${expires_in}`,
            `image=${data.image.versions.small}; Path=/; Max-Age=${expires_in}`,
            `displayname=${data.displayname}; Path=/; Max-Age=${expires_in}`,
            `staff=${data['staff?']}; Path=/; Max-Age=${expires_in}`,
            ]
        );
    } catch (error) {
        res.setHeader("x-error", error.message);
    }
    res.redirect('/events');
    // const page = postParams.state? 'events': 'events';
    // res.redirect("/" + page);
}