import './Dashboard.css';
import { useRef, useState, useEffect } from 'react';
import { getCurrentDate } from '../../util/getCurrentDate';
import { getEntries } from '../../util/getEntries';
import { funFacts } from '../../consts';
import { checkForUpdate } from '../../util/checkForUpdate';

import CreateButton from './CreateButton/CreateButton';
import DiaryInformation from './DiaryInformation/DiaryInformation'
import ViewDiaryEntry from './DiaryInformation/ViewDiaryEntry/ViewDiaryEntry';
import Settings from './Settings/Settings';
import getEntry from '../../util/getEntry';

export default function Dashboard({showingCreationPage, showCreationPage, currentEntryKey, toggleEditingMode}) {
    const [entries, setEntries] = useState([]);
    const [alreadyCreatedEntry, setAlreadyCreatedEntry] = useState(false);
    const [showingDiaryInformation, showDiaryInformation] = useState(false);
    const [viewingDiaryEntry, viewDiaryEntry] = useState(false);
    const [showingSettings, showSettings] = useState(false);
    const [selectedTheme, setTheme] = useState("default")

    const funFactNumber = useRef(Math.round(Math.random() * ((funFacts.length) - 1)));
    const funFact = funFacts[funFactNumber.current];

    const userJSON = JSON.parse(localStorage.getItem("user"));
    const name = userJSON.name;

    // Check if entry was already created
    useEffect(() => {
        getEntry(getCurrentDate("YYYYMMDD"))
            .then((entry) => {
                if (entry === undefined) {
                    setAlreadyCreatedEntry(false);
                } else {
                    setAlreadyCreatedEntry(true);
                }
            })
            .catch((e) => console.log(e))
    }, [showingDiaryInformation, viewingDiaryEntry, showingSettings])

    // Disable scroll when some popup is open
    useEffect(() => {
        showingDiaryInformation || viewingDiaryEntry || showingSettings ? document.body.style.overflow = "hidden" : document.body.style.overflow = "auto"
    }, [showingDiaryInformation, viewingDiaryEntry, showingSettings]);

    // Get entries
    useEffect(() => {
        getEntries(currentEntryKey, showDiaryInformation, toggleEditingMode, showCreationPage)
            .then((entries) => setEntries(entries))
            .catch(() => console.error("Failed to get entries"));
    }, [showingDiaryInformation, viewingDiaryEntry, showingSettings]);

    // Check for updates
    useEffect(() => {
        checkForUpdate();
    }, []);

    // Set theme state
    useEffect(() => {
        switch (userJSON["theme"]) {
            case "default":
                setTheme("Light");
                break;
            case "dark":
                setTheme("Dark");
                break;
            case "system":
                setTheme("System");
                break;
        }
    })

    return (
        <div id="dashboard">
            {showingDiaryInformation && <DiaryInformation currentEntryKey={currentEntryKey.current} showDiaryInformation={showDiaryInformation} viewDiaryEntry={viewDiaryEntry} toggleEditingMode={toggleEditingMode} showCreationPage={showCreationPage} />}
            {viewingDiaryEntry && <ViewDiaryEntry currentEntryKey={currentEntryKey.current} viewDiaryEntry={viewDiaryEntry} toggleEditingMode={toggleEditingMode} showCreationPage={showCreationPage} showDiaryInformation={showDiaryInformation} />}
            {showingSettings && <Settings showSettings={showSettings} name={name} selectedTheme={selectedTheme} setTheme={setTheme} />}
            <section className="top">
                <div className="greeting">
                    <h1>Welcome <span id="dashboard-username">{name}</span>!</h1>
                    <p>Fun fact: {funFact}</p>
                </div>
                <div className="date">
                    <h2>{getCurrentDate()}</h2>
                </div>
            </section>
            <section className="bottom">
                {alreadyCreatedEntry ? null : <CreateButton showingCreationPage={showingCreationPage} showCreationPage={showCreationPage} /> } 
                {entries}
            </section>
            <button id="settings-button" onClick={() => showSettings(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings-icon lucide-settings"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
        </div>
    )
}