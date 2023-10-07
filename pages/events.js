import { useState, useEffect } from "react";
import Link from 'next/link'
import UserLayout from '@/components/UserLayout';
import Loading from '@/components/Loading';

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const event_construct = (id, title) => ({ id, title });

// const events = [
//     event_construct(1, 'event 1'), 
//     event_construct(2, 'event 2'), 
//     event_construct(3, 'event 3') 
// ];

function EventCard({data}) {
    return (
        <div className="col-md-4 mb-4">
            <div className="card" style={{ width: "18rem" }}>
                <img src="images/Events2.jpg" className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{data.name}</h5>
                    <p className="card-text" dangerouslySetInnerHTML={{ __html: data.intro}} />
                    <Link href={`/events/${data.id}`} className="btn btn-primary">Go somewhere</Link>
                </div>
                <div className="card-footer" >
                    <div className="col-md-6">
                        <p>On Going</p>
                    </div>
                    <div className="col-md-6 text-end">
                        <p style={{ display: "inline" }}>3/10</p>
                    </div>
                </div>
                <div className="position-absolute top-0 end-0 p-2">
                    <span className="badge rounded-pill bg-dark text-light">Coalition</span>
                </div>
            </div>
        </div>
    )
}

export default function Page() {
    const [count, setCount] = useState(0);
    const [events, setEvents] = useState();
    useEffect(() => {
        // console.log(getCookie('login'));
        // console.log(getCookie('image'));
        fetch('/api/events').then(r => r.json())
            .then(data => setEvents(data));
    }, []);
    if (!events) return <Loading />;
    if (events.length == 0) return <h2>No event. Let&apos;s create one.</h2>
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
                    <div className="row">
                        {/* <!-- Card content --> */}
                        {events.map(x => <EventCard data={x} key={x.id} />)}
                    </div>
                </div>
            </div>
            {/* <h1>event listing</h1>
                    {events.length &&
                        <ul>
                            {events.map(x => <li key={x.id}><Link href={'events/' + x.id}>{x.name}</Link></li>)}
                        </ul>
                    }
                    <button onClick={x => setCount(x => x + 1)}>{count}</button> */}
        </>
    );
}

Page.getLayout = function getLayout(page) {
    return (
        <UserLayout>{page}</UserLayout>
    )
}