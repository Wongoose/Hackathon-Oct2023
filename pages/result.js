import UserLayout from '@/components/UserLayout';
import { useState, useEffect } from 'react';

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

export default function Page() {
    const [winners, setWinners] = useState([]);
    const [participants, setparticipants] = useState([]); // currently not used, for datalist
    const [selected, setSelected] = useState();
    const [evalPoint, setEvalPoint] = useState(0);

    function onSubmitSearch(event) {
        event.preventDefault();
        document.getElementById("reason").reset;
        setSelected(event.target.elements['search'].value)
    }

    function evalToggle() {
        console.log(evalPoint);
        evalPoint == 0 ? setEvalPoint(3) : setEvalPoint(0);
    }

    // NEXT: Reset
    function addWinnerToList(event) {
        event.preventDefault();
        setWinners([...winners,
             { "name": selected,
              "evalPoints": event.target.elements['evalPoints'].checked,
              "bhDays": event.target.elements['bhDays'].checked,
              "currency": event.target.elements['currency'].checked,
              "title": event.target.elements['title'].checked,
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
            <h1 style={{ fontWeight: "bold" }}>Rewards</h1>
            <div className="col">
                <form onSubmit={onSubmitSearch}>

                    <input id="reward-search" name="search" className="form-control" type="search" placeholder="Search by Intra ID..." />
                </form>
                {selected &&
                    <form onSubmit={addWinnerToList}>
                        <div className="col" style={{ marginTop: "2rem", marginBottom: "1rem" }}>

                            <div className="row-cols-2">
                                <h4 style={{ fontWeight: "bold", color: "blueviolet" }}>Selected: {selected}</h4>
                            </div>
                            <div className="card" style={{ padding: "15px", marginBottom: "2rem" }}>
                                <div className="row" style={{ paddingLeft: "1rem" }}>
                                    <input type="checkbox" name="evalPoints" checked={evalPoint != 0} style={{ color: "black" }} onClick={evalToggle} />
                                    <p style={{ "marginLeft": "15px" }}>+ 3 Eval points</p>
                                </div>
                                <div className="row" style={{ paddingLeft: "1rem" }}>
                                    <input type="checkbox" name="bhDays" style={{ color: "black" }} />
                                    <p style={{ marginLeft: "15px" }}>+ 5 Blackhole days</p>
                                </div>
                                <div className="row" style={{ paddingLeft: "1rem" }} >
                                    <input type="checkbox" name="currency" style={{ color: "black" }} />
                                    <p style={{ marginLeft: "15px" }}>+ 200 Currency ($)</p>
                                </div>
                                <div className="row" style={{ paddingLeft: "1rem" }}>
                                    <input type="checkbox" name="title" style={{ color: "black" }} />
                                    <p style={{ marginLeft: "15px" }}>+ Hackathon winner title</p>
                                </div>
                                <div className="form-floating mb-3" style={{ marginTop: "10px" }}>
                                    <input type="text" name="reason" className="form-control" id="reason" />
                                    <label for="reason">Reason for reward</label>
                                </div>
                                <button id="reward-confirm-btn"
                                    style={{ "width": "100%", paddingTop: "8px", paddingBottom: "8px", marginBottom: "5px" }}>Add {selected} to list</button>
                            </div>
                        </div>
                    </form>
                }
                <h4 style={{ fontWeight: "bold" }}>Summary</h4>
                <div className="card" style={{ padding: "15px", marginBottom: "2rem" }}>
                    {
                        winners.length == 0 ? <p></p> : winners.map((x, i) =>
                            <p>{i + 1}. {x.name} ({x.evalPoints ? "3 eval points," : ""} {x.bhDays ? "5 blackhole days," : ""} {x.currency ? "200 currency," : ""} {x.title ? "winner title" : ""})
                             - {x.reason}</p>)
                    }
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