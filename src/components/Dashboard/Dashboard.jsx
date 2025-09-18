import './Dashboard.css';
import { useRef, useState, useEffect } from 'react';
import { getCurrentDate } from '../../util/getCurrentDate';
import { getEntries } from '../../util/getEntries';
import { funFacts } from '../../consts';

import CreateButton from './CreateButton/CreateButton';
import DiaryInformation from './DiaryInformation/DiaryInformation'
import ViewDiaryEntry from './DiaryInformation/ViewDiaryEntry/ViewDiaryEntry';
import Settings from './Settings/Settings';

export default function Dashboard({showingCreationPage, showCreationPage, currentEntryKey, toggleEditingMode}) {
    const [showingDiaryInformation, showDiaryInformation] = useState(false);
    const [viewingDiaryEntry, viewDiaryEntry] = useState(false);
    const [showingSettings, showSettings] = useState(false);

    const funFactNumber = useRef(Math.round(Math.random() * ((funFacts.length) - 1)));
    const funFact = funFacts[funFactNumber.current];

    const userJSON = JSON.parse(localStorage.getItem("user"));
    const name = userJSON.name;

    if (localStorage.getItem("entries") === null) {
        localStorage.setItem("entries", "{}");
    }

    const entriesObject = JSON.parse(localStorage.getItem("entries"));

    // Disable scroll when some popup is open
    useEffect(() => {
        showingDiaryInformation || viewingDiaryEntry || showingSettings ? document.body.style.overflow = "hidden" : document.body.style.overflow = "auto"
    }, [showingDiaryInformation, viewingDiaryEntry, showingSettings]);

    return (
        <div id="dashboard">
            {showingDiaryInformation && <DiaryInformation currentEntryKey={currentEntryKey.current} showDiaryInformation={showDiaryInformation} viewDiaryEntry={viewDiaryEntry} toggleEditingMode={toggleEditingMode} showCreationPage={showCreationPage} />}
            {viewingDiaryEntry && <ViewDiaryEntry currentEntryKey={currentEntryKey.current} viewDiaryEntry={viewDiaryEntry} toggleEditingMode={toggleEditingMode} showCreationPage={showCreationPage} showDiaryInformation={showDiaryInformation} />}
            {showingSettings && <Settings showSettings={showSettings} name={name} />}
            <section className="top">
                <div className="greeting">
                    <h1>Welcome {name}!</h1>
                    <p>Fun fact: {funFact}</p>
                </div>
                <div className="date">
                    <h2>{getCurrentDate()}</h2>
                </div>
            </section>
            <section className="bottom">
                {entriesObject[getCurrentDate("YYYYMMDD")] ? null : <CreateButton showingCreationPage={showingCreationPage} showCreationPage={showCreationPage} /> } 
                {getEntries(currentEntryKey, showDiaryInformation, toggleEditingMode, showCreationPage)}
            </section>
            <button id="settings-button" onClick={() => showSettings(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#262626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings-icon lucide-settings"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
        </div>
    )
}