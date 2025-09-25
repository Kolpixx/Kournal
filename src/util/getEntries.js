import EntryButton from '../components/Dashboard/EntryButton/EntryButton';

export function getEntries(currentEntryKey, showDiaryInformation, toggleEditingMode, showCreationPage) {
    return new Promise((resolve, reject) => {
        // Create Database
        const request = indexedDB.open("journalEntries", 1);

        // Handle error
        request.onerror = () => {
            console.log('Error occured while trying to create/open "journalEntries" IndexedDB database');
        }

        request.onsuccess = () => {
            const db = request.result;
            const transaction = db.transaction("entries", "readwrite");
            const store = transaction.objectStore("entries");
            
            const getAllEntries = store.getAll();

            getAllEntries.onsuccess = () => {
                let entries = [];
                const items = getAllEntries.result;
                
                items.forEach((entry) => {
                    entries.push(EntryButton(currentEntryKey, showDiaryInformation, entry, toggleEditingMode, showCreationPage));
                })

                resolve(entries.reverse());
            }

            getAllEntries.onerror = () => reject(getAllEntries.error);
        }
    });
}