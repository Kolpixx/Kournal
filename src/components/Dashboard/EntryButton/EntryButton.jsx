import './EntryButton.css'

export default function EntryButton(currentEntrykey, showLetterInformation, entry) {
    return (
        <div key={entry.key} className="entry" onClick={() => viewEntry(currentEntrykey, showLetterInformation, entry.key)}>
            <h1>{entry.emoji}</h1>
            <p>{entry.date}</p>
            <button className="edit" onClick={(e) => {e.stopPropagation(); editEntry(entry.key)}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#262626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil-icon lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
            </button>
        </div>
    )
}

function viewEntry(currentEntryKey, showLetterInformation, date) {
    currentEntryKey.current = date;
    
    showLetterInformation(true);
}

function editEntry(entry) {
    console.log(entry);
}