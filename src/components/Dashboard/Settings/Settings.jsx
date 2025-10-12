import './Settings.css';

import { changeName } from '../../../util/changeName';
import { exportEntries } from '../../../util/exportEntries';
import { importEntries } from '../../../util/importEntries';
import { changeTheme } from '../../../util/changeTheme';
import { useEffect, useState } from 'react';

export default function Settings({showSettings, name}) {
    const userJSON = JSON.parse(localStorage.getItem("user"));

    const [selectedTheme, setTheme] = useState("test");

    const selectTheme = (theme) => {
        setTheme(theme.outerText);

        theme = theme.id;
        theme = theme.replace("theme-selection-", "");
        changeTheme(theme);
    }

    useEffect(() => {
        setTheme(document.getElementById(`theme-selection-${userJSON["theme"]}`).outerText);
    }, []);

    return (
        <div id="settings" onClick={(e) => {e.target.id === "settings" && showSettings(false); e.stopPropagation;}}>
            <div id="settings-container" onClick={(e) => {(e.target.id !== "custom-theme-select-button" && e.target.id !== "custom-theme-selected-value") && document.getElementById("custom-theme-select-dropdown").classList.add("hidden")}}>
                <h3>Settings</h3>
                <div id="settings-container-settings">
                    <form className="settings-container-form" onSubmit={(e) => {e.preventDefault(); changeName(document.getElementById("settings-name").value)}}>
                        <label htmlFor="settings-name">Name</label>
                        <div id="settings-name-input">
                            <input type="text" id="settings-name" placeholder="Your name here :P" defaultValue={name} maxLength={20} />
                            <button type="submit" id="settings-name-submit">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-icon lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
                            </button>
                        </div>
                    </form>
                    <form className="settings-container-form" onChange={(e) => changeTheme(e.target.value)}>
                        <label htmlFor="settings-theme">Theme</label>
                        <div id="custom-theme-select">
                            <button id="custom-theme-select-button" onClick={(e) => {e.preventDefault(); document.getElementById("custom-theme-select-dropdown").classList[0] === "hidden" ? document.getElementById("custom-theme-select-dropdown").classList.remove("hidden") : document.getElementById("custom-theme-select-dropdown").classList.add("hidden")}}>
                                <span id="custom-theme-selected-value">{selectedTheme}</span>
                            </button>
                            <ul id="custom-theme-select-dropdown" className="hidden">
                                <li id="theme-selection-system" onClick={(e) => selectTheme(e.target)}>System</li>
                                <li id="theme-selection-default" onClick={(e) => selectTheme(e.target)}>Light</li>
                                <li id="theme-selection-dark" onClick={(e) => selectTheme(e.target)}>Dark</li>
                            </ul>
                        </div>
                    </form>
                    <div id="settings-import-export">
                        <button id="settings-import-button" onClick={() => importEntries(showSettings)}>Import</button>
                        <button id="settings-export-button" onClick={exportEntries}>Export</button>
                    </div>
                </div>
                <button onClick={() => showSettings(false)} id="settings-close-button" className="settings-action-button">
                    <svg width="36" height="36" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M40.5 3.5L3.5 40.5" stroke="var(--primary-color)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3.5 3.5L40.5 40.5" stroke="var(--primary-color)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
        </div>
    )
}