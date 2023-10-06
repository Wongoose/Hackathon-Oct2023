/** @format */
// import { pageToState } from "../../data/pages";

export default function handler(req, res) {
    res.redirect(
        "https://api.intra.42.fr/oauth/authorize?response_type=code" +
        `&client_id=${process.env.API_CLIENT_ID}` +
        `&redirect_uri=${encodeURIComponent(process.env.API_REDIRECT_URI)}` +
        `&scope=public` +
        `&state=`
    );
}