import UserLayout from '@/components/UserLayout';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSession from '@/components/useSession';
import Link from 'next/link'

export default function Page() {
    const session = useSession();
    const router = useRouter();

    return (
        <>
            <h1 style={{ "font-weight": "bold" }}>Submission form</h1>
            <form>
                <div class="col">
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="input-github" placeholder="github.io/name/repo" required />
                        <label for="input-github">GitHub repository URL</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="input-name" readOnly="readonly" placeholder="SEAN CHUAH | SCHUAH" defaultValue={session.login} />
                        <label for="input-name">Submit By</label>
                    </div>
                </div>
                <div style={{ width: "100%" }}>
                    <button id="submit-btn"
                        style={{ width: "100%", "padding-top": "8px", "padding-bottom": "8px", "margin-bottom": "5px" }}>Submit</button>
                    {/* <button id="cancel-btn"
                        style={{ "background-color": "transparent", border: "none", width: "100%", "padding-top": "8px", "padding-bottom": "8px" }}
                        formmethod="dialog">Cancel</button> */}
                </div>
            </form>
            <div className="d-grid gap-6 mt-4">
                <Link href={'/events/' + router.query.event_id} className="btn btn-primary" type="button">Back</Link>
            </div>
        </>
    )
}

Page.getLayout = function getLayout(page) {
    return (
        <UserLayout>{page}</UserLayout>
    )
}