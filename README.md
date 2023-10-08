This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## SQL

CREATE TABLE IF NOT EXISTS account(
    login VARCHAR(200) PRIMARY KEY,
    name VARCHAR(500) NOT NULL,
    image VARCHAR(200),
    is_staff BOOLEAN NOT NULL,
    cursus_id INT NOT NULL,
    coalition_id INT,
    coalition_name VARCHAR(200),
    created_on TIMESTAMP
);

CREATE TABLE IF NOT EXISTS event(
    id SERIAL PRIMARY KEY,
    name VARCHAR(200),
    startdate varchar NOT NULL,
    enddate varchar NOT NULL,
    starttime varchar NOT NULL,
    endtime varchar NOT NULL,
    cadet boolean NOT NULL,
    pisciner boolean NOT NULL,
    agu boolean NOT NULL,
    anyone boolean NOT NULL,
    location varchar NOT NULL,
    links TEXT NOT NULL,
    team boolean NOT NULL,
    individual boolean NOT NULL,
    team_min int NOT NULL,
    team_max int NOT NULL,
    intro TEXT NOT NULL,
    details TEXT NOT NULL,
    closing_on TIMESTAMP NOT NULL,
    eventType VARCHAR(200),
    joinLimit INT,
    total_ppl INT DEFAULT 0 NOT NULL,
    created_on TIMESTAMP NOT NULL,
    created_by VARCHAR(200) NOT NULL
);

CREATE TABLE IF NOT EXISTS team(
    id SERIAL PRIMARY KEY,
    event_id INT NOT NULL,
    name VARCHAR(200),
    coalition_id INT,
    member_count INT NOT NULL,
    created_on TIMESTAMP NOT NULL,
    created_by VARCHAR(200) NOT NULL
);

CREATE TABLE IF NOT EXISTS member(
    id SERIAL NOT NULL,
    event_id INT NOT NULL,
    team_id INT NOT NULL,
    login VARCHAR(200) NOT NULL,
    name VARCHAR(200) NOT NULL,
    created_on TIMESTAMP NOT NULL,
    created_by VARCHAR(200) NOT NULL
);

CREATE TABLE IF NOT EXISTS result(
    id INT NOT NULL,
    team_id INT NOT NULL,
    login VARCHAR(200),
    reason VARCHAR(200),
    bh INT NOT NULL,
    ep INT NOT NULL,
    wallet INT NOT NULL,
    coalition_pt INT NOT NULL,
    created_on TIMESTAMP NOT NULL,
    created_by VARCHAR(200) NOT NULL,
);

cursus_users?filter[campus_id]=34&page[number]=14&page[size]=100
blocs?filter[campus_id]=34