
export default async function handler(req, res) {
    res.setHeader(
        "Set-Cookie",
        [
            `access_token=; Path=/; Max-Age=-1`,
            `login=; Path=/; Max-Age=-1`,
            `image=; Path=/; Max-Age=-1`,
            `displayname=; Path=/; Max-Age=-1`,
            `staff=; Path=/; Max-Age=-1`,
        ]
    );
    res.redirect('/');
}