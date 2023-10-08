'use client';
import { useEffect, useState } from 'react';

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

export default function useSession() {
    const [session, setSession] = useState({ login: null, image: null, displayname: null, coalition_id: null, coalition_name: null });
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const login = getCookie('login');
        const image = getCookie('image');
        const displayname = getCookie('displayname');
        const coalition_id = getCookie('coalition_id');
        const coalition_name = getCookie('coalition_name');
        setSession({ login, image, displayname, coalition_id, coalition_name });
    }, []);

    return session;
}