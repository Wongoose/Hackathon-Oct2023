'use client';
import { useRouter } from "next/router";
import UserLayout from '@/components/UserLayout';
import { Router } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link'

const tempUsers = [
    "zwong",
    "schuah",
    "skoh",
    "saleem",
    "nnorazma",
    "hwong",
    "jtan",
    "jng",
    "chenlee",
    "helee"
];

function makeWinner(name, evalPoints, bhDays, currency, title,reason) {
    return {
        name,
        evalPoints,
        bhDays,
        currency,
        title,
        reason,
    }
}
export default function Page() {
    const router = useRouter();
    const [winners, setWinners] = useState([
        makeWinner('zwong', 1, 2, 3, 'The Greatest', '1st Price'),
        makeWinner('salmoham', 1, 2, 3, 'The Greatest', '2st Price'),
        makeWinner('skoh', 1, 2, 3, 'The Greatest', '3rd Price'),

    ]);
    const [participants, setparticipants] = useState([]); // currently not used, for datalist
    const [selected, setSelected] = useState();
    const [evalPoint, setEvalPoint] = useState(0);

    function onSubmitSearch(event) {
        event.preventDefault();
        setSelected(event.target.elements['search'].value)
        const f = document.getElementById("rewardForm");
        if (f) f.reset();
    }

    function evalToggle() {
        console.log(evalPoint);
        evalPoint == 0 ? setEvalPoint(3) : setEvalPoint(0);
    }

    // NEXT: Reset
    function addWinnerToList(event) {
        event.preventDefault();
        setWinners([...winners,
        {
            "name": selected,
            "evalPoints": event.target.elements['evalPoint'].value,
            "bhDays": event.target.elements['blackholeDay'].value,
            "currency": event.target.elements['wallet'].value,
            "title": event.target.elements['other'].value,
            "reason": event.target.elements['reason'].value,
        }]);
    }

    useEffect(() => {
        //participants = await fetch('/api/getparticiapintaa')

        // Add dummy users in datalist
        let dataList = document.createElement("datalist");
        dataList.id = "user-datalist";
        dataList.style.backgroundColor = "FFFFFF"

        for (let i = 0; i < 10; i++) {
            let addOption = document.createElement("option");
            addOption.append(tempUsers[i]);
            dataList.append(addOption);
        }

        const rewardSearchInput = document.getElementById("reward-search");
        rewardSearchInput.setAttribute("list", "user-datalist"); // linking to 2nd attribute datalist ID

        rewardSearchInput.append(dataList); // append the datalist to input box

    }, []);


    return (
        <>
            <h1 style={{ fontWeight: "bold" }}>Winners</h1>
            <div className="card" style={{ padding: "15px", marginBottom: "2rem" }}>
                {
                    winners.length == 0 ? <p>No Winner yet. You could be the winner.</p> : winners.map((x, i) =>
                        <p>{i + 1}. {x.name}&nbsp;
                            ({x.evalPoints ? x.evalPoints + " eval points," : ""}&nbsp;
                            {x.bhDays ? x.bhDays + " blackhole days," : ""}&nbsp;
                            {x.currency ? x.currency + " currency," : ""} {x.title})&nbsp;
                            - {x.reason}</p>)
                }
            </div>
            <hr />
            <h2 style={{ fontWeight: "bold" }}>Rewards (By bocal only)</h2>
            <div className="col">
                <form onSubmit={onSubmitSearch}>
                    <input id="reward-search" name="search" className="form-control" type="search" placeholder="Search by Intra ID..." />
                </form>
                {selected &&
                    <form id="rewardForm" onSubmit={addWinnerToList}>
                        <div className="col" style={{ marginTop: "2rem", marginBottom: "1rem" }}>

                            <div className="row-cols-2">
                                <h4 style={{ fontWeight: "bold", color: "blueviolet" }}>Selected: {selected}</h4>
                            </div>
                            <div className="card" style={{ padding: "15px", marginBottom: "2rem" }}>
                                <h4>Rewards</h4>
                                <div className="row">
                                    
                                    <div className="form-floating mb-3 col-2" style={{ marginTop: "10px" }}>
                                        <input type="number" name="wallet" className="form-control" min="1" max="9999" />
                                        <label for="reason">Wallet ₳</label>
                                    </div>
                                    <div className="form-floating mb-3 col-2" style={{ marginTop: "10px" }}>
                                        <input type="number" name="coalitionPoint" className="form-control" min="1" max="9999" />
                                        <label for="reason">Coalition Point</label>
                                    </div>
                                    <div className="form-floating mb-3 col-2" style={{ marginTop: "10px" }}>
                                        <input type="number" name="blackholeDay" className="form-control" min="1" max="9999" />
                                        <label for="reason">Blackhole Days</label>
                                    </div>
                                    <div className="form-floating mb-3 col-2" style={{ marginTop: "10px" }}>
                                        <input type="number" name="evalPoint" className="form-control" min="1" max="9999" />
                                        <label for="reason">Eval Point</label>
                                    </div>
                                    <div className="form-floating mb-3 col-2" style={{ marginTop: "10px" }}>
                                        <input type="text" name="other" className="form-control" min="1" max="9999" />
                                        <label for="reason">Other Reward</label>
                                    </div>
                                    <div className="form-floating mb-3 col-4" style={{ marginTop: "10px" }}>
                                        <input type="number" name="rank" className="form-control" required min="1" max="9999" />
                                        <label for="reason">Rank</label>
                                    </div>
                                    <div className="form-floating mb-3 col-8" style={{ marginTop: "10px" }}>
                                        <input type="text" name="reason" className="form-control" id="reason" required />
                                        <label for="reason">Reason for reward</label>
                                    </div>
                                </div>
                                <button id="reward-confirm-btn"
                                    style={{ "width": "100%", paddingTop: "8px", paddingBottom: "8px", marginBottom: "5px" }}>Submit</button>
                            </div>
                        </div>
                    </form>
                }

                {/* <button id="reward-confirm-btn"
                    style={{ width: "100%", paddingTop: "8px", paddingBottom: "8px", marginBottom: "5px" }}>Confirm all rewards</button> */}
                {/* <Link href={'/events/' + Router.query.event_id}
                    style={{ backgroundColor: "transparent", border: "none", width: "100%", paddingTop: "8px", paddingBottom: "8px" }}
                    formmethod="dialog">Back</Link> */}
                <div className="d-grid gap-6 mt-4">
                    <Link href={'/events/' + router.query.event_id} className="btn btn-primary" type="button">Back</Link>
                </div>
            </div>
        </>


    )


}

Page.getLayout = function getLayout(page) {
    return (
        <UserLayout>{page}</UserLayout>
    )
}