import './Dashboard.css';
import { useState, useRef } from 'react';
import { getCurrentDate } from '../../util/getCurrentDate';
import { getEntries } from '../../util/getEntries';
import { name, funfact } from '../../App';

import CreateButton from './CreateButton/CreateButton';
import DiaryInformation from './DiaryInformation/DiaryInformation'

export default function Dashboard({showing, setShowing}) {
    const [showingDiaryInformation, showDiaryInformation] = useState(false);
    let currentEntryKey = useRef(null);

    if (localStorage.getItem("entries") === null) {
        localStorage.setItem("entries", "{}");
    }

    const entriesObject = JSON.parse(localStorage.getItem("entries"));

    return (
        <div className="dashboard">
            {showingDiaryInformation && <DiaryInformation currentEntryKey={currentEntryKey.current} showDiaryInformation={showDiaryInformation} />}
            <section className="top">
                <div className="greeting">
                    <h1>Welcome {name}!</h1>
                    <p>Fun fact: {funfact}</p>
                </div>
                <div className="date">
                    <h2>{getCurrentDate()}</h2>
                </div>
            </section>
            <section className="bottom">
                {entriesObject[getCurrentDate("YYYYMMDD")] ? null : <CreateButton showing={showing} setShowing={setShowing} /> } 
                {getEntries(currentEntryKey, showDiaryInformation)}
            </section>
        </div>
    )
}