
## SQL
```
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
```