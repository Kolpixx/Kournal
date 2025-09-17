import './Welcome.css'

export default function Welcome() {
    return (
        <div id="welcome-screen">
            <section id="welcome-screen-left">
                <h1>Haii!</h1>
                <span>＼(＾▽＾)／</span>
            </section>
            <section id="welcome-screen-right">
                <label htmlFor="welcome-screen-name-input">What's ya' name??</label>
                <input id="welcome-screen-name-input" type="text" maxLength={20} required={true} placeholder="Tell me pwease! :P" />
                <div id="welcome-screen-actions">
                    <button id="welcome-screen-actions-submit" type="submit" onClick={finishSetup}>LET ME IN!!!</button>
                    <button id="welcome-screen-actions-meow">Cat pic :3</button>
                </div>
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