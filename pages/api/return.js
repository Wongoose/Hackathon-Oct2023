/** @format */

// import { stateToPage } from "../../data/pages";

//302 location: return?error=access_denied&error_description=The+resource+owner+or+authorization+server+denied+the+request
export function getAccessToken(req) {
    const token = req.cookies["access_token"];
    if (typeof token !== "string") {
        const error = new Error("Invalid token");
        error.status = 401;
        throw error;
    }
    return token;
}

// hardcoded: 1) api baseurl, 2) 10k rows limit
// fetch/json error or error response will throw with error.status
export async function fetchApi(token, uri) {
    const allData = [];
    uri += uri.indexOf("?") === -1 ? "?" : "&";
    for (let page = 1; page <= 10; page++) {
        const response = await fetch(
            `https://api.intra.42.fr/v2/${uri}access_token=${token}&per_page=100&page=${page}`
        );
        if (!response.ok) {
            const error = new Error(await response.text());
            error.status = response.status;
            throw error;
        }
        const pagedData = await response.json();
        if (!Array.isArray(pagedData)) return pagedData;

        allData.push(...pagedData);
        if (pagedData.length < 100) break;
        if (allData.length > 10000) break;
    }
    return allData;
}

export default async function handler(req, res) {
    const postParams = {
        grant_type: "authorization_code",
        client_id: process.env.API_CLIENT_ID,
        client_secret: process.env.API_CLIENT_SECRET,
        code: req.query.code,
        redirect_uri: process.env.API_REDIRECT_URI,
        state: req.query.state,
    };
    try {
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

        const data = await fetchApi(access_token, 'me');
        console.log('me', data);
        // res.status(200).json(data); return;

        res.setHeader(
            "Set-Cookie",
            [
            `access_token=${access_token}&login=${data.login}&image=${data.image.versions.small}&staff=${data['staff?']}; Path=/; Max-Age=${expires_in}`,
            `login=${data.login}; Path=/; Max-Age=${expires_in}`,
            `image=${data.image.versions.small}; Path=/; Max-Age=${expires_in}`,
            `staff=${data['staff?']}; Path=/; Max-Age=${expires_in}`,
            ]
        );
    } catch (error) {
        res.setHeader("x-error", error.message);
    }
    const page = postParams.state? 'events': 'events';
    res.redirect("/" + page);
}