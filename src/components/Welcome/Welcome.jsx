import './Welcome.css'

import { useState, useEffect } from 'react';

export default function Welcome() {
    const [showingMeowMeow, showMeowMeow] = useState(false);

    useEffect(() => {
        if (document.getElementById("welcome-screen-meow-image") !== null) {
            const image = document.getElementById("welcome-screen-meow-image");

            image.src = "https://cataas.com/cat?" + new Date().getTime();
        }
    }, [showingMeowMeow])

    return (
        <div id="welcome-screen">
            {showingMeowMeow && <RandomCatImage showMeowMeow={showMeowMeow} />}
            <section id="welcome-screen-left">
                <h1>Haii!</h1>
                <span>＼(＾▽＾)／</span>
            </section>
            <section id="welcome-screen-right">
                <form onSubmit={(e) => {e.preventDefault(); finishSetup()}}>
                    <label htmlFor="welcome-screen-name-input">What's ya' name??</label>
                    <input id="welcome-screen-name-input" type="text" maxLength={20} required={true} placeholder="Tell me pwease! :P" />
                    <div id="welcome-screen-actions">
                        <button id="welcome-screen-actions-submit" type="submit">LET ME IN!!!</button>
                        <button id="welcome-screen-actions-meow" onClick={() => showMeowMeow(true)}>Cat pic :3</button>
                    </div>
                </form>
            </section>
        </div>
    )
}

function finishSetup() {
    // Get name (rare comment; should probably comment more often so I can actually understand what's happening after I eeped)
    const name = document.getElementById("welcome-screen-name-input").value;

    // Generate JSON
    const userJSON = {
        name: name
    }

    // Add 'userJSON' & 'visited' to localStorage
    localStorage.setItem("user", JSON.stringify(userJSON));
    localStorage.setItem("visited", '1');
    
    // Reload site
    window.location.reload();
}

function RandomCatImage({showMeowMeow}) {
    return (
        <div id="welcome-screen-meow-image-container" onClick={(e) => {e.stopPropagation; showMeowMeow(false)}}>
            <img id="welcome-screen-meow-image" src="https://cataas.com/cat" alt="cat" />
            <button id="welcome-screen-meow-close-button" onClick={() => showMeowMeow(false)}>
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M40.5 3.5L3.5 40.5" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3.5 3.5L40.5 40.5" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
        </div>
    )
}