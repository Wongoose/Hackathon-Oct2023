import UserLayout from '@/components/UserLayout';
import { useState, useEffect } from 'react';
import Script from 'next/script';
import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useRouter } from "next/router";
import Loading from '@/components/Loading';

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
                <h1 id="eventName" className="mt-5">Event Name {event[0].name}</h1>
                {/* <!-- Event Introduction Section --> */}
                <div className="description-line">
                    <h4 id="eventIntro">Welcome to 42KL&apos;s first-ever in-house 48hr Hackathon, aimed at protecting, maintaining, and elevating the integrity of 42&apos;s peer-to-peer learning environment. This also allows Cadets who have never participated in a Hackathon to experience what a Hackathon is.</h4>
                </div>
                {/* <!-- Progress Bar Section --> */}
                <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                    <div className="progress-bar" style={{ width: "75%" }}></div>
                </div>
                <br />
                {/* <!-- Event Details Section --> */}
                <h2><b>Event Details:</b></h2>
                <div className="description-line">
                    <h4><b>Date :</b>
                        <span id="starDate"> 6th October </span>
                        <span id="starTime"> 4:00 PM </span> to
                         <span id="endtDate"></span>
                        <span>9th October </span>
                        <span id="EndTime">6:00 PM</span>
                    </h4>
                    <h4>
                        <b>Briefing :</b>
                        <span id="dateBriefing"> 6th October </span>
                        Time <span id="TimeBriefing"> 2:30 PM </span> </h4>
                    <h4><b>Location :</b> <span id="location"> 42KL Ground Floor, Lobby Area (Onsite) </span></h4>
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
                    <h4 id="eventDescription">The Peer-Defence Hackathon is for 42KL Cadets to join forces and contribute to the protection, maintenance, or elevation of the integrity that defines our peer-to-peer learning ecosystem. This event offers a practical chance to work together, come up with ideas, and develop solutions that safeguard the integrity of the learning experiences at 42KL.</h4>
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
                <h2><b>Registrate:</b></h2>
                <div className="row justify-content-center">
                    <div className="col-md-6 mb-3 flex">
                        <button id="RegistrateTeam" className="btn btn-primary" type="button">Team</button>
                    </div>
                    <div className="col-md-6 mb-3 flex">
                        <button id="RegistrateWolf" className="btn btn-primary" type="button">Lone Wolf</button>
                    </div>
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