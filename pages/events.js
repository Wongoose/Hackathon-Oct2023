'use client';
import { useState, useEffect } from "react";
import UserLayout from '@/components/UserLayout';
import Loading from '@/components/Loading';
// import useLocalStorage from "@/components/useLocalStorage";
import Message from '@/components/Message'
import Link from 'next/link'

function EventCard({ data }) {
    return (
        <div className="col-md-4 mb-4">
            <div className="card" style={{ width: "18rem" }}>
                {/* <img src="images/Events2.jpg" className="card-img-top" alt="..." /> */}
                <div className="card-body">
                    <h5 className="card-title">{data.name}</h5>
                    <p className="card-text" dangerouslySetInnerHTML={{ __html: data.intro }} />
                    <Link href={`/events/${data.id}`} className="btn btn-primary">Go somewhere</Link>
                </div>
                <div className="card-footer" >
                    <div className="col-md-6">
                        <p>{data.startdate + ' ' + data.starttime}</p>
                    </div>
                    <div className="col-md-6 text-end">
                        {
                            (data.total_ppl > 0) &&
                            <p style={{ display: "inline" }}>{data.total_ppl} {(data.joinlimit ?? 4242) == 4242 ? '' : ' / ' + data.joinlimit}</p>
                        }
                    </div>
                </div>
                <div className="position-absolute top-0 end-0 p-2">
                    <span className="badge rounded-pill bg-dark text-light">{data.eventtype}</span>
                </div>
            </div>
        </div>
    )
}

export default function Page() {
    const [count, setCount] = useState(0);
    const [events, setEvents] = useState();
    useEffect(() => {
        fetch('/api/events').then(r => r.json())
            .then(data => setEvents(data));
    }, []);
    if (!events) return <Loading />;
    if (events.length == 0) return <Message text={"No event. Let's create one."} />
    return (
        <>
            {/* <!-- Header Section --> */}
            <div className="container">
                <h1 id="eventName" className="mt-5">Event Listing</h1>
                <div className="card" style={{ width: "18rem" }}>
                    <div className="d-grid gap-6">
                        <Link href="/new" className="btn btn-primary" >Create Event</Link>
                    </div>
                </div>
                <br />
                {/* <!-- Event Introduction Section --> */}
                <div className="container">
                    <h2>Active Events</h2>
                    <div className="row">
                        {/* <!-- Card content --> */}
                        {events.filter(x => (new Date(x.enddate + ' 23:59')) >= new Date()).map(x => <EventCard data={x} key={x.id} />)}
                    </div>
                </div>

                {
                    events.some(x => (new Date(x.enddate + ' 23:59')) < new Date()) && <>
                        <hr />

                        <div className="container">
                            <h2>Past Events</h2>
                            <div className="row">
                                {/* <!-- Card content --> */}
                                {events.filter(x => (new Date(x.enddate + ' 23:59')) < new Date()).map(x => <EventCard data={x} key={x.id} />)}
                            </div>
                        </div>
                    </>
                }
            </div>

        </>
    );
}

Page.getLayout = function getLayout(page) {
    return (
        <UserLayout>{page}</UserLayout>
    )
}

export const dynamic = "force-dynamic";
