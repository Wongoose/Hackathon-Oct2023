import UserLayout from '@/components/UserLayout';
import { useState, useEffect } from 'react';

export default function Page() {
    return (
        <form>
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
                    <button id="addMember" className="btn btn-primary" type="button">Create Event</button>
                </div>
                <br />
            </div>
        </form>
    )
}


Page.getLayout = function getLayout(page) {
    return (
        <UserLayout>{page}</UserLayout>
    )
}