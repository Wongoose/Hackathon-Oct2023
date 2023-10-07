import { useState, useEffect } from "react";
import Link from 'next/link'
import UserLayout from '@/components/UserLayout';
import Loading from '@/components/Loading';

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const event_construct = (id,title) =>({id, title});

// const events = [
//     event_construct(1, 'event 1'), 
//     event_construct(2, 'event 2'), 
//     event_construct(3, 'event 3') 
// ];

export default function Page() {
    const [count, setCount] = useState(0);
    const [events, setEvents] = useState();
    useEffect(() => {
        // console.log(getCookie('login'));
        // console.log(getCookie('image'));
        fetch('/api/events').then(r => r.json())
        .then(data => setEvents(data));
    }, []);
    if (!events) return <Loading/>;
    if (events.length ==0) return <h2>No event. Let&apos;s create one.</h2>
    return (
        <>
        <h1>event listing</h1>
        {events.length &&
        <ul>
            {events.map(x=><li key={x.id}><Link href={'events/'+x.id}>{x.name}</Link></li>)}
        </ul>
        }
        <button onClick={x=>setCount(x=>x+1)}>{count}</button>
        </>
    );
}

Page.getLayout = function getLayout(page) {
    return (
        <UserLayout>{page}</UserLayout>
    )
}