import UserLayout from '@/components/UserLayout';
import { useState, useEffect } from 'react';

export default function Page() {
    const [winners, setWinners] = useState([]);
    const [participants, setparticipants] = useState([]);
    const [selected, setSelected] = useState();

    function onSubmitSearch(event) {
        event.preventDefault();
        setSelected(event.target.elements['search'].value)
    }

    useEffect(() => {
        //participants = await fetch('/api/getparticiapintaa')

    }, []);


    return (
        <>
            <h1 style={{ fontWeight: "bold" }}>Rewards</h1>
            <div className="col">
                <form onSubmit={onSubmitSearch}>

                    <input id="reward-search" name="search" className="form-control" type="search" placeholder="Search by Intra ID..." />
                </form>
                {selected &&
                    <div className="col" style={{ marginTop: "2rem", marginBottom: "1rem" }}>

                        <div className="row-cols-2">
                            <h4 style={{ fontWeight: "bold" }}>Selected: </h4>
                            <h4 style={{ fontWeight: "bold", color: "red" }}>{selected}</h4>
                        </div>
                        <div className="card" style={{ padding: "15px", marginBottom: "2rem" }}>
                            <div className="row" style={{ paddingLeft: "1rem" }}>
                                <input type="checkbox" name="+ Blackhole days" value="Blackhole days" style={{ color: "black" }} />
                                <p style={{ "marginLeft": "15px" }}>+ Eval points</p>
                            </div>
                            <div className="row" style={{ paddingLeft: "1rem" }}>
                                <input type="checkbox" name="Blackhole days" value="+ Blackhole days" style={{ color: "black" }} />
                                <p style={{ marginLeft: "15px" }}>+ Blackhole days</p>
                            </div>
                            <div className="row" style={{ paddingLeft: "1rem" }} >
                                <input type="checkbox" name="Blackhole days" value="+ Blackhole days" style={{ color: "black" }} />
                                <p style={{ marginLeft: "15px" }}>+ Currency ($)</p>
                            </div>
                            <div className="row" style={{ paddingLeft: "1rem" }}>
                                <input type="checkbox" name="Blackhole days" value="+ Blackhole days" style={{ color: "black" }} />
                                <p style={{ marginLeft: "15px" }}>+ Hackathon winner title</p>
                            </div>
                            <div className="form-floating mb-3" style={{ marginTop: "10px" }}>
                                <input type="text" className="form-control" id="input-name" placeholder="SEAN CHUAH | SCHUAH" />
                                <label for="input-name">Reason for reward</label>
                            </div>
                            <button id="reward-confirm-btn"
                                style={{ "width": "100%", paddingTop: "8px", paddingBottom: "8px", marginBottom: "5px" }}>Add zwong to list</button>
                        </div>
                    </div>
                }
                <h4 style={{ fontWeight: "bold" }}>Summary</h4>
                <div className="card" style={{ padding: "15px", marginBottom: "2rem" }}>
                    {
                        winners.length && winners.map((x, i) =>
                            <p>{i + 1}. {x.login} (+ {x.rewards}) - {x.reason}</p>)
                    }
                    <p>1. zwong (+ eval points) - 1st place winner</p>
                    <p>2. schuah (+ blackhole days) - 2nd place winner</p>
                    <p>3. skoh (+ currency) - Consolation prize</p>
                </div>
                <button id="reward-confirm-btn"
                    style={{ width: "100%", paddingTop: "8px", paddingBottom: "8px", marginBottom: "5px" }}>Confirm all rewards</button>
                <button id="cancel-btn"
                    style={{ backgroundColor: "transparent", border: "none", width: "100%", paddingTop: "8px", paddingBottom: "8px" }}
                    formmethod="dialog">Cancel</button>
            </div>
        </>


    )


}

Page.getLayout = function getLayout(page) {
    return (
        <UserLayout>{page}</UserLayout>
    )
}