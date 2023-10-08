'use client'
import { useEffect, useState } from "react";
import Head from 'next/head';
import Link from 'next/link';
import useSession from "./useSession";

const themes = [
'Default',
'Cerulean',
'Cosmo',
'Cyborg',
'Darkly',
'Flatly',
'Journal',
'Litera',
'Lumen',
'Lux',
'Materia',
'Minty',
'Morph',
'Pulse',
'Quartz',
'Sandstone',
'Simplex',
'Sketchy',
'Slate',
'Solar',
'Spacelab',
'Superhero',
'United',
'Vapor',
'Yeti',
'Zephyr'];

function Theme() {
    return <>
        <svg xmlns="http://www.w3.org/2000/svg" className="d-none">
            <symbol id="check2" viewBox="0 0 16 16">
                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"></path>
            </symbol>
            <symbol id="circle-half" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"></path>
            </symbol>
            <symbol id="moon-stars-fill" viewBox="0 0 16 16">
                <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"></path>
                <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z"></path>
            </symbol>
            <symbol id="sun-fill" viewBox="0 0 16 16">
                <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"></path>
            </symbol>
        </svg>

        <div className="dropdown position-fixed bottom-0 end-0 mb-3 me-3 bd-mode-toggle">
            <button className="btn btn-bd-primary py-2 dropdown-toggle d-flex align-items-center" id="bd-theme" type="button" aria-expanded="false" data-bs-toggle="dropdown" aria-label="Toggle theme (light)">
                <svg className="bi my-1 theme-icon-active" width="1em" height="1em"><use href="#sun-fill"></use></svg>
                <span className="visually-hidden" id="bd-theme-text">Toggle theme</span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="bd-theme-text">
                <li>
                    <button type="button" className="dropdown-item d-flex align-items-center active" data-bs-theme-value="light" aria-pressed="true">
                        <svg className="bi me-2 opacity-50 theme-icon" width="1em" height="1em"><use href="#sun-fill"></use></svg>
                        Light
            <svg className="bi ms-auto d-none" width="1em" height="1em"><use href="#check2"></use></svg>
                    </button>
                </li>
                <li>
                    <button type="button" className="dropdown-item d-flex align-items-center" data-bs-theme-value="dark" aria-pressed="false">
                        <svg className="bi me-2 opacity-50 theme-icon" width="1em" height="1em"><use href="#moon-stars-fill"></use></svg>
                        Dark
            <svg className="bi ms-auto d-none" width="1em" height="1em"><use href="#check2"></use></svg>
                    </button>
                </li>
                <li>
                    <button type="button" className="dropdown-item d-flex align-items-center" data-bs-theme-value="auto" aria-pressed="false">
                        <svg className="bi me-2 opacity-50 theme-icon" width="1em" height="1em"><use href="#circle-half"></use></svg>
                        Auto
            <svg className="bi ms-auto d-none" width="1em" height="1em"><use href="#check2"></use></svg>
                    </button>
                </li>
            </ul>
        </div>
    </>
}

function Header() {
    const session = useSession()
    const [theme, setTheme] = useState('sketchy');
    function onChangeTheme(event) {
        setTheme(event.target.value.toLowerCase());
    }
    return (
        <>
            <Head>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
                 integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossOrigin="anonymous" />
                <link href={`https://cdn.jsdelivr.net/npm/bootswatch@5.3.2/dist/${theme}/bootstrap.min.css`} rel="stylesheet" />
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" defer
                    integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossOrigin="anonymous"></script>
            </Head>
            {/* <Theme /> */}
            <header>
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    <div className="container-fluid">
                        <Link className="navbar-brand" href="/">42 Event</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarCollapse">
                            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" href="/events">Events</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" href="/new">Create</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href="/api/logout">Logout</Link>
                                </li>
                                <li className="nav-item">
                                    
                                </li>
                                    
                            </ul>
                            <form className="d-flex" role="search">
                                <Link className="nav-link p-0 mr-4" title={`${session.displayname} | ${session.login}`} href={"https://profile.intra.42.fr/users/" + session.login} target="_blank">
                                    <img src={session.image} className="rounded-circle" style={{ height: '40px' }} alt="{session.login}" />
                                </Link>
                                &nbsp;&nbsp;&nbsp;
                                {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success" type="submit">Search</button> */}
                                <select defaultValue="sketchy" onChange={onChangeTheme} className="form-select" aria-label="Default select example">
                                    { themes.map(x=> <option key={`theme-${x}`}>{x}</option>)}
                                    
                                </select>
                            </form>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}

function Main({ children }) {
    return (
        <main className="flex-shrink-0">
            <div className="container">

                {children}
            </div>
        </main>
    )
}

function Footer() {
    return (
        <footer className="footer mt-auto py-3 bg-body-tertiary">
            <div className="container">
                <span className="text-body-secondary">Place sticky footer content here.</span>
            </div>
        </footer>
    )
}

export default function Page({ children }) {

    useEffect(() => {
        document.querySelector('body').className = 'd-flex flex-column min-vh-100';
    }, []);
    return (
        <>
            <Header />
            <div style={{ height: "70px" }} ></div>
            <Main>{children}</Main>
            {/* <Footer /> */}
        </>
    )
}