import UserLayout from '@/components/UserLayout';
import { useState, useEffect } from 'react';

export default function Page() {
    return (
        <>
            <h1 style={{ "font-weight": "bold" }}>Submission form</h1>
            <form>
                <div class="col">
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="input-github" placeholder="github.io/name/repo" />
                        <label for="input-github">GitHub repository URL</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="input-name" placeholder="SEAN CHUAH | SCHUAH" />
                        <label for="input-name">Intra ID</label>
                    </div>
                </div>
                <div style={{ width: "100%" }}>
                    <button id="submit-btn"
                        style={{ width: "100%", "padding-top": "8px", "padding-bottom": "8px", "margin-bottom": "5px" }}>Submit</button>
                    <button id="cancel-btn"
                        style={{ "background-color": "transparent", border: "none", width: "100%", "padding-top": "8px", "padding-bottom": "8px" }}
                        formmethod="dialog">Cancel</button>
                </div>
            </form>
        </>
    )
}

Page.getLayout = function getLayout(page) {
    return (
        <UserLayout>{page}</UserLayout>
    )
}