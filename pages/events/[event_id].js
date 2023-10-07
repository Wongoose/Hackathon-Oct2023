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
    if (!event) return <Loading/>;
    if (event.length == 0) return <h2>Not Found</h2>;
    return (
        <>
            <div className="container">
                <h1 id="eventName" className="mt-5">{event[0].name}</h1>
                {/* <!-- Event Introduction Section --> */}
                {
                    event[0].intro &&
                    <div className="description-line">
                        <h4 id="eventIntro" dangerouslySetInnerHTML={{ __html: event[0].intro }}></h4>
                    </div>
                }
                {/* <!-- Progress Bar Section --> */}
                <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                    <div className="progress-bar" style={{ width: "75%" }}></div>
                </div>
                <br />
                {/* <!-- Event Details Section --> */}
                <h2><b>Event Details:</b></h2>
                <div className="description-line">
                    <h4><b>Date :</b>
                        <span id="starDate"> {event[0].startdate} </span>
                        <span id="starTime"> {event[0].starttime} </span>
                        to&nbsp;
                        <span id="endtDate">{event[0].enddate} </span>
                        <span id="EndTime">{event[0].endtime}</span>
                    </h4>
                    <h4>
                        <b>Briefing :</b>
                        <span id="dateBriefing"> 6th October </span>
                        Time <span id="TimeBriefing"> 2:30 PM </span> </h4>
                    <h4><b>Location :</b> <span id="location"> {event[0].location} </span></h4>
                </div>
                <br />
                {/* <!-- Who Can Participate Section --> */}
                <h2><b>Who Can Participate:</b></h2>
                <div className="description-line">
                    <h4><b>Only :</b> <span id="whoList"> 42KL Cadets </span> are allowed to participate</h4>
                </div>
                <br />
                {/* <!-- Event Description Section --> */}
                <h2><b>Event Description:</b></h2>
                <div className="description-line">
                    <h4 id="eventDescription" dangerouslySetInnerHTML={{ __html: event[0].details }}></h4>
                </div>
                <br />
                {/* <!-- References Section --> */}
                <div className="references">
                    <h2><b>References:</b></h2>
                    <div className="description-line">
                        <ul className="inline-list">
                            <li><a id="references1" href="https://example.com/document1.pdf" target="_blank">Document 1 (PDF)</a></li>
                            <li><a id="references2" href="https://example.com/document2.pdf" target="_blank">Document 2 (PDF)</a></li>
                            <li><a id="references3" href="https://example.com/link1" target="_blank">Link 1</a></li>
                            <li><a id="references4" href="https://example.com/link2" target="_blank">Link 2</a></li>
                        </ul>
                    </div>
                </div>
                <br />
                {/* <!-- Registration Buttons Section --> */}
                {/* <h2><b>Registrate:</b></h2> */}
                <div className="d-grid gap-6">
                    <Link href={'/register/' + router.query.event_id} className="btn btn-secondary btn-lg">Register</Link>
                    <Link href={'/participants/' + router.query.event_id} className=" mt-2">Participants</Link>
                    <Link href={'/participants/' + router.query.event_id} className=" mt-2">Result</Link>
                </div>
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