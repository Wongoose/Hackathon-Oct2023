import UserLayout from '@/components/UserLayout';
import { useState, useEffect } from 'react';
import Script from 'next/script';
import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useRouter } from "next/router";
import Loading from '@/components/Loading';
import Link from 'next/link'

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

export default function Page() {
    const router = useRouter();
    const [event, setEvent] = useState();

    // async function handleSubmit(event) {
    //     event.preventDefault();
    //     const body = new FormData(event.target);
    //     const post = {
    //         event_id: event.target.elements['event_id'],
    //         members: [

    //         ]
    //     };
    //     // for () {
    //     //     post.members.push()
    //     // }
    //     const res = await fetch('/api/register', {
    //         body: JSON.stringify(Object.fromEntries(body)),
    //         // body: JSON.stringify(post),
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //     const data = await res.json()
    //     console.log(data)
    //     router.push("/events/" + event.target.elements['event_id']);
    // }

    useEffect(() => {
        console.log(getCookie('login'));
        console.log(getCookie('image'));
        if (!router.query.event_id) {
            setEvent([]);
        } else {
            fetch('/api/events/' + router.query.event_id).then(r => r.json())
                .then(data => setEvent(data));
        }
    }, [router.query.event_id]);
    if (!event) return <Loading />;
    if (event.length == 0) return <h2>Not Found</h2>;
    return (
        <>
            <form onSubmit={handleSubmit}>
                {/* <!-- Header Section --> */}
                <div className="container">
                    <h1 id="eventName" className="mt-5">Event Name</h1>
                    {/* <!-- Team Info --> */}

                    <br />
                    {/* <!-- Registration Buttons Section --> */}
                    <h2><b>Registrate:</b></h2>
                    <input type="text" className="form-control" id="teamName" placeholder="Team Name" />
                    <br />
                    <div className="row">

                        <div className="col-md-6">
                            <input type="text" className="form-control" id="MemberName1" placeholder="team Member Name" />
                        </div>
                        <div className="col-md-6">
                            <input type="text" className="form-control" id="Memberid1" placeholder="team Member Intra Id" />
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-md-6">
                            <input type="text" className="form-control" id="MemberName2" placeholder="team Member Name" />
                        </div>
                        <div className="col-md-6">
                            <input type="text" className="form-control" id="Memberid2" placeholder="team Member Intra Id" />
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-md-6">
                            <input type="text" className="form-control" id="MemberName2" placeholder="team Member Name" />
                        </div>
                        <div className="col-md-6">
                            <input type="text" className="form-control" id="Memberid2" placeholder="team Member Intra Id" />
                        </div>
                    </div>

                    <br />
                    <div className="d-grid gap-6">
                        <button id="addMember" className="btn btn-primary" type="button">Submit Registration</button>
                    </div>
                    <br />
                </div>
                <br />
            </form>

        </>
    );
}

Page.getLayout = function getLayout(page) {
    return (
        <UserLayout>{page}</UserLayout>
    )
}