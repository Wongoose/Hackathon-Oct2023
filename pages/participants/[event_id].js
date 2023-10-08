import UserLayout from '@/components/UserLayout';
import { useState, useEffect } from 'react';
import Script from 'next/script';
import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useRouter } from "next/router";
import Loading from '@/components/Loading';
import Link from 'next/link'
import Message from '@/components/Message'

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function Participant({image, team_id, team_name, login, name, created_on}) {
    const dummy = 'https://img.freepik.com/free-vector/detailed-esports-gaming-logo_52683-63632.jpg?size=626&ext=jpg';
    return (
        <div className="description-line mb-2">
            <div className="row">
                <div className="col-md-3">
                    <img src={image??dummy} className="avatar" />
                </div>
                <div className="col-md-3">
                    <h3 className="team-name">{name} | <Link href={'https://profile.intra.42.fr/users/' + login}>{login}</Link></h3>
                </div>
                <div className="col-md-3">
                    <h3 className="team-name">{team_name??team_id}</h3>
                </div>
                <div className="col-md-3">
                    <h3 className="team-name">{new Date(created_on).toLocaleString()}</h3>
                </div>
            </div>
        </div>
    );
}

export default function Page() {
    const router = useRouter();
    const [rows, setRows] = useState();
    const [event_name, setEventName] = useState();

    useEffect(() => {
        if (!router.query.event_id) {
            setRows([]);
        } else {
            fetch('/api/participants?event_id=' + router.query.event_id).then(r => r.json())
                .then(data => {
                    setEventName(data.event_name);
                    setRows(data.rows);
                });
        }
    }, [router.query.event_id]);
    if (!rows) return <Loading />;
    if (!event_name) return <Message text={'Event Not Found'} />;
    if (rows.length == 0) return <Message text={'No one yet, be the first.'} />;
    return (
        <>
            {/* <!-- Header Section --> */}
            <div className="container">
                <h1 id="eventName" className="mt-5">Event: {event_name}</h1>
                {/* <!-- Team Info --> */}

                <br />
                {/* <!-- Registration Buttons Section --> */}
                <h2><b>Participant:</b></h2>

                <div className="description-line">
                    <div className="row">
                        <div className="col-md-3">
                            {/* <!-- <img src="loho.png" className="avatar" /> --> */}
                            Avatar
                        </div>
                        <div className="col-md-3">
                            <h3 className="name">Name</h3>
                        </div>
                        <div className="col-md-3">
                            <h3 className="name">Team Name</h3>
                        </div>
                        <div className="col-md-3">
                            <h3 className="name"> Join Time</h3>
                        </div>
                    </div>
                </div>
                <br />
                {
                    rows.map((row) => <Participant key={row.login} {...row} />)
                }
                <div className="d-grid gap-6">
                    <Link href={'/events/' + router.query.event_id} className="btn btn-primary" type="button">Back</Link>
                </div>
                <br />
            </div>
            <br />
        </>
    );
}

Page.getLayout = function getLayout(page) {
    return (
        <UserLayout>{page}</UserLayout>
    )
}