export function checkForUpdate() {
    // If "entries" exist in localStorage then the user is using a version that was created before refactoring entries from localStorage to indexedDB
    if (localStorage.getItem("entries")) {
        console.log("Detected that entries are still stored in localStorage")
        const entries = localStorage.getItem("entries");

        // Open Database
        const request = indexedDB.open("journalEntries", 1);

        // Handle error
        request.onerror = () => {
            console.log('Error occured while trying to create/open "journalEntries" IndexedDB database');
        }

        request.onsuccess = () => {
            const db = request.result;
            const transaction = db.transaction("entries", "readwrite");
            const store = transaction.objectStore("entries");

            const entriesJSON = JSON.parse(entries);

            let entriesLenght = 0;
            let entriesIteration = 0;

            for (const entry in entriesJSON) {
                entriesLenght++;
            }

            console.log(`There are a total of ${entriesLenght} entries`);
            console.log("Migrating entries from localStorage to indexedDB");

            for (const entry in entriesJSON) {
                const entryJSON = entriesJSON[entry];
                entryJSON.id = entryJSON.key;

                store.put(entryJSON);
                entriesIteration++;
                console.log(`Moving entries from localStorage to indexedDB (${entriesIteration}/${entriesLenght})`);
            }

            localStorage.removeItem("entries");
            console.log("Successfully migrated from localStorage to indexedDB");
        }
    }
}