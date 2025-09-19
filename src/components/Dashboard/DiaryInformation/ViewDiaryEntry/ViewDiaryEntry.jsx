import './ViewDiaryEntry.css'

import { deleteEntry } from '../../../../util/deleteEntry';

export default function ViewDiaryEntry({currentEntryKey, viewDiaryEntry, toggleEditingMode, showCreationPage, showDiaryInformation}) {
    const entries = JSON.parse(localStorage.getItem("entries"));
    const entry = entries[currentEntryKey];

    return (
        <div id="diary-entry-viewer" onClick={(e) => {(e.target.id === "diary-entry-viewer") && viewDiaryEntry(false)}}>
            <div id="diary-entry-viewer-container">
                <button className="diary-entry-viewer-action-button" id="diary-entry-viewer-back-button" onClick={() => {viewDiaryEntry(false); showDiaryInformation(true)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#262626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left-icon lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                </button>
                <div id="diary-entry-viewer-actions">
                    <button className="diary-entry-viewer-action-button" onClick={() => viewDiaryEntry(false)}>
                        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M40.5 3.5L3.5 40.5" stroke="#262626" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M3.5 3.5L40.5 40.5" stroke="#262626" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                    <button className="diary-entry-viewer-action-button" onClick={() => {toggleEditingMode(true); showCreationPage(true);}}>
                        <svg width="44" height="42" viewBox="0 0 53 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M48.2883 13.6109C49.544 12.3996 50.2496 10.7565 50.2498 9.04327C50.25 7.32998 49.5449 5.68679 48.2895 4.47516C47.0342 3.26354 45.3314 2.58273 43.5558 2.58252C41.7802 2.5823 40.0773 3.2627 38.8216 4.47402L7.12484 35.0655C6.57341 35.596 6.16561 36.2492 5.93734 36.9676L2.79996 46.9409C2.73858 47.1391 2.73395 47.3496 2.78655 47.5501C2.83915 47.7507 2.94702 47.9337 3.09873 48.0799C3.25044 48.226 3.44031 48.3298 3.64821 48.3802C3.85612 48.4307 4.07429 48.4259 4.27959 48.3663L14.618 45.3413C15.3617 45.123 16.0386 44.7319 16.5892 44.2023L48.2883 13.6109Z" stroke="#262626" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M33.625 9.45837L43.125 18.625" stroke="#262626" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                    <button onClick={() => deleteEntry(currentEntryKey)} className="diary-entry-viewer-action-button" id="diary-entry-viewer-delete-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#262626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-icon lucide-trash"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    </button>
                </div>
                <span id="diary-entry-emoji">{entry.emoji}</span>
                <span id="diary-entry-content">{entry.content}</span>
            </div>
        </div>
    )
}