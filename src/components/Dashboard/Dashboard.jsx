import './Dashboard.css';
import { useState } from 'react';
import { getCurrentDate } from '../../util/getCurrentDate';
import { getEntries } from '../../util/getEntries';
import { funFacts } from '../../consts';

import CreateButton from './CreateButton/CreateButton';
import DiaryInformation from './DiaryInformation/DiaryInformation'
import ViewDiaryEntry from './DiaryInformation/ViewDiaryEntry/ViewDiaryEntry';

export default function Dashboard({showingCreationPage, showCreationPage, currentEntryKey, toggleEditingMode}) {
    const [showingDiaryInformation, showDiaryInformation] = useState(false);
    const [viewingDiaryEntry, viewDiaryEntry] = useState(false);

    const funFact = funFacts[(Math.round(Math.random() * ((funFacts.length) - 1)))];
    const userJSON = JSON.parse(localStorage.getItem("user"));
    const name = userJSON.name;

    if (localStorage.getItem("entries") === null) {
        localStorage.setItem("entries", "{}");
    }

    const entriesObject = JSON.parse(localStorage.getItem("entries"));

    return (
        <div className="dashboard">
            {showingDiaryInformation ? <DiaryInformation currentEntryKey={currentEntryKey.current} showDiaryInformation={showDiaryInformation} viewDiaryEntry={viewDiaryEntry} toggleEditingMode={toggleEditingMode} showCreationPage={showCreationPage} /> : viewingDiaryEntry ? <ViewDiaryEntry currentEntryKey={currentEntryKey.current} viewDiaryEntry={viewDiaryEntry} toggleEditingMode={toggleEditingMode} showCreationPage={showCreationPage} /> : null}
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
        </div>
    )
}