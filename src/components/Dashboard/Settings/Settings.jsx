import './Settings.css';

import { changeName } from '../../../util/changeName';
import { exportEntries } from '../../../util/exportEntries';
import { importEntries } from '../../../util/importEntries';

export default function Settings({showSettings, name}) {
    return (
        <div id="settings" onClick={(e) => {e.target.id === "settings" && showSettings(false); e.stopPropagation;}}>
            <div id="settings-container">
                <h3>Settings</h3>
                <div id="settings-container-settings">
                    <form id="settings-container-form" onSubmit={(e) => {e.preventDefault(); changeName(document.getElementById("settings-name").value)}}>
                        <label htmlFor="settings-name">Name</label>
                        <div id="settings-name-input">
                            <input type="text" id="settings-name" placeholder="Your name here :P" defaultValue={name} maxLength={20} />
                            <button type="submit" id="settings-name-submit">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#262626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-icon lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
                            </button>
                        </div>
                    </form>
                    <div id="settings-import-export">
                        <button id="settings-import-button" onClick={importEntries}>Import</button>
                        <button id="settings-export-button" onClick={exportEntries}>Export</button>
                    </div>
                </div>
                <button onClick={() => showSettings(false)} id="settings-close-button" className="settings-action-button">
                    <svg width="36" height="36" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M40.5 3.5L3.5 40.5" stroke="#262626" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3.5 3.5L40.5 40.5" stroke="#262626" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
        </div>
    )
}