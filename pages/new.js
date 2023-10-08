import UserLayout from '@/components/UserLayout';
import { useState, useEffect } from 'react';
import Script from 'next/script';
import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useRouter } from "next/router";


export default function Page() {
    const [allowTeam, setAllowTeam] = useState(false);
    const editorRef1 = useRef(null);
    const editorRef2 = useRef(null);
    const router = useRouter()

    const onOptionChange = e => {
        setAllowTeam(e.target.value)
        console.log('team is ', e.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const body = new FormData(event.target);
        body.append('details', editorRef2.current.getContent());
        const res = await fetch('/api/event_create', {
            body: JSON.stringify(Object.fromEntries(body)),
            method: 'POST',
            headers: {
                // 'Content-Type': 'multipart/form-data',
                'Content-Type': 'application/json',
            },
        })
        const data = await res.json()
        console.log(data)
        router.push("/events")
    }

    // function loadMce() {
    //     if (window.tinymce) {
    //         window.tinymce.init({
    //             selector: 'textarea',
    //             plugins: 'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
    //             toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
    //             tinycomments_mode: 'embedded',
    //             tinycomments_author: 'Author name',
    //             mergetags_list: [
    //                 { value: 'First.Name', title: 'First Name' },
    //                 { value: 'Email', title: 'Email' },
    //             ],
    //             ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
    //         });
    //         return;
    //     } 

    //     console.log('loadmce');
    //      // setTimeout(loadMce, 1000);
    // }

    // useEffect(() => {
    //     loadMce();
    // }, []);
    return (
        <>
            {/* <Script src="https://cdn.tiny.cloud/1/pov0fuuisfpdpriwx94auezwav7nukrl7ni2w5lzbh6qufya/tinymce/6/tinymce.min.js" referrerpolicy="origin"></Script> */}
            <div className="container">
                <h1 className="mt-5">Create Event</h1>
                <form onSubmit={handleSubmit}>
                    {/* <div className="form-floating mb-3"> */}
                        <input name="name" type="text" className="form-control" id="floatingInput" placeholder="Enter Event Title" />
                        {/* <label for="floatingInput">Event Title</label> */}
                    {/* </div> */}
                    <div className="mb-3">
                        <textarea className="form-control" id="Welcome" rows="3" placeholder="Welcome Intro" name="intro"></textarea>
                        {/* <Editor
                            onInit={(evt, editor) => editorRef1.current = editor}
                            initialValue=""
                            init={{
                                // height: 500,
                                // menubar: false,
                                plugins: [
                                    'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss'
                                ],
                                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                // content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                        /> */}
                    </div>
                    <div className="container">
                        <h2 className="mt-5">Who Can Participate:</h2>
                        {/* <form> */}
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-check form-switch">
                                    <input name="cadet" className="form-check-input" type="checkbox" role="switch" id="cadets" />
                                    <label className="form-check-label" for="cadets">42KL Cadets</label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-check form-switch">
                                    <input name="agu" className="form-check-input" type="checkbox" role="switch" id="cadetsAGU" />
                                    <label className="form-check-label" for="cadetsAGU">Cadets in AGU</label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-check form-switch">
                                    <input name="anyone" className="form-check-input" type="checkbox" role="switch" id="anyOne" />
                                    <label className="form-check-label" for="anyOne">AnyOne</label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-check form-switch">
                                    <input name="pisciner" className="form-check-input" type="checkbox" role="switch" id="pisciner" />
                                    <label className="form-check-label" for="pisciner">Pisciner</label>
                                </div>
                            </div>
                        </div>
                        {/* <button type="submit" className="btn btn-primary">Submit</button> */}
                        {/* </form> */}
                    </div>
                    <div className="container">
                        <h2 className="mt-4">Event Details:</h2>
                        <label for="eventDate" className="form-label">Briefing Time:</label>
                        <div className="row">

                            <div className="col-md-6 mb-3">
                                <input type="date" className="form-control" id="eventDate" name="eventDate" placeholder="Event Date" />
                            </div>
                            <div className="col-md-6 mb-3">
                                <input type="time" className="form-control" id="eventTime" name="eventTime" placeholder="Event Time" />
                            </div>
                        </div>
                        <label for="eventDate" className="form-label">Period</label>
                        <div className="row">

                            <div className="col-md-3 mb-3">
                                {/* <label for="startDate" className="form-label">Sart</label> */}
                                <input type="date" className="form-control" id="startDate" name="startDate" placeholder="Start Date" required />
                            </div>
                            <div className="col-md-3 mb-3">
                                {/* <label for="startTime" className="form-label">Start Time:</label> */}
                                <input type="time" className="form-control" id="startTime" name="startTime" placeholder="Start Time" required />
                            </div>
                            <div className="col-md-3 mb-3">
                                {/* <label for="endDate" className="form-label">End Date:</label> */}
                                <input type="date" className="form-control" id="endDate" name="endDate" placeholder="End Date" required />
                            </div>
                            <div className="col-md-3 mb-3">
                                {/* <label for="endTime" className="form-label">End Time:</label> */}
                                <input type="time" className="form-control" id="endTime" name="endTime" placeholder="End Time" required />
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <input type="text" className="form-control" id="eventLocation" name="eventLocation" placeholder="Event Location"/>
                            </div>
                            <div class="col-md-6 mb-3">
                                <input type="text" className="form-control" id="eventType" name="eventType" placeholder="Event Type"/>
                            </div>
                            </div>

                       
                        <div className="mb-3">
                            {/* <textarea className="form-control" id="eventDescription" rows="3" placeholder="Event Description:"></textarea> */}
                            <Editor
                                onInit={(evt, editor) => editorRef2.current = editor}
                                initialValue=""
                                init={{
                                    // height: 500,
                                    // menubar: false,
                                    plugins: [
                                        'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss'
                                    ],
                                    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                    // content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                }}
                            />
                        </div>
                        Reference
                        <div class="row">
                            <div class="col-md-3 mb-3">

                               
                                <input type="file" className="form-control" id="eventFiles" name="eventFiles" accept=".pdf, .doc, .docx, .txt" multiple/>

                            </div>
                            <div class="col-md-3 mb-3">
                              
                                <input type="text" className="form-control" id="eventLinksDes" name="eventLinksDes" placeholder="link Description"/>
                            </div>
                            <div class="col-md-3 mb-3">
                               
                                <input type="text" className="form-control" id="eventLink" name="eventLink" placeholder="link"/>
                            </div>
                            <div class="col-md-3 mb-3">
                                <button className="btn btn-primary" type="button">+ More</button>
                               
                            </div>
                        </div>
                        Participance Type
                <div className="row">
                            <div class="col-md-6 mb-3">
                                <div className="border p-2">
                                    <div className="form-check">
                                        <input name="asTeam" className="form-check-input" type="radio" id="teamCheckbox" value="true" 
                                            onChange={onOptionChange} checked={allowTeam=='true'} />
                                        <label className="form-check-label" for="teamCheckbox">Team</label>
                                    </div>
                                    {
                                        allowTeam=='true' && <>
                                            <div className="form-group" id="teamMembersInput">
                                                <label for="teamMaxMembers">Max Members:</label>
                                                <input type="number" className="form-control" id="teamMaxMembers" name="teamMaxMembers" min="1" required />
                                            </div>
                                            <div className="form-group" id="teamMinMembersInput">
                                                <label for="teamMinMembers">Min Members:</label>
                                                <input type="number" className="form-control" id="teamMinMembers" name="teamMinMembers" min="1" required />
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="border p-2">
                                    <div className="form-check">
                                        <input name="asTeam" className="form-check-input" type="radio" id="loneWolfCheckbox" checked={allowTeam=='false'}
                                         value="false" onChange={onOptionChange} />
                                        <label className="form-check-label" for="loneWolfCheckbox">
                                            Individual
                          </label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3 mb-3">
                                <input type="number" className="form-control" id="maxGroups" name="joinLimit" placeholder="Join Limit" min="1"/>
                            </div>
                        </div>
                        <br />
                        <div className="d-grid gap-6">
                            {/* <button className="btn btn-primary" type="button">Create Event</button> */}
                            <button className="btn btn-secondary btn-lg">Create Event</button>
                        </div>
                        <br />
                    </div>
                </form>
            </div >
        </>
    )
}

Page.getLayout = function getLayout(page) {
    return (
        <UserLayout>{page}</UserLayout>
    )
}