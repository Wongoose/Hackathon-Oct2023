//302 location: return?error=access_denied&error_description=The+resource+owner+or+authorization+server+denied+the+request
function getAccessTokenFromCookie(req) {
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
    if (token.cookies) {
        const req = token;
        token = getAccessTokenFromCookie(req);
    }
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
    res.status(400).send('');
}