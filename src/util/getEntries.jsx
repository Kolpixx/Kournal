import EntryButton from '../components/Dashboard/EntryButton/EntryButton';

export function getEntries(currentEntryKey, showLetterInformation) {
    // Get localStorage entries object
    const items = JSON.parse(localStorage.getItem("entries"));

    let entries = [];
    
    for (let key in items) {
        const regex = /\d\d\d\d\/\d\d\/\d\d/i;
        const matchesRegex = regex.test(key);

        if (matchesRegex) {
            const entry = items[key];
            entries.push(EntryButton(currentEntryKey, showLetterInformation, entry));
        }
    }
    return entries.reverse();
}