import { sendToast } from "./sendToast";

export function exportEntries() {
    return new Promise(() => {
        // Open Database
        const request = indexedDB.open("journalEntries", 1);

        // Handle error
        request.onerror = () => {
            console.log('Error occured while trying to create/open "journalEntries" IndexedDB database');
        }
        
        request.onsuccess = () => {
            const db = request.result;
            const transaction = db.transaction("entries", "readonly");
            const store = transaction.objectStore("entries");

            const entries = store.getAll();

            entries.onerror = () => {
                console.log("Failed to get entries from indexedDB");
                sendToast("Failed to export entries :(", "error");
            }

            entries.onsuccess = () => {
                const entriesJSON = entries.result;

                const link = document.createElement('a');
                link.href = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(entriesJSON))}`;
                link.download = "entries.json";
                link.click();
                sendToast("Successfully exported your entries :P", "success");
            }
        }
    })
}