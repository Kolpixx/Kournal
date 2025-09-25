import { sendToast } from "./sendToast";

export function deleteEntry(currentEntryKey, showDiaryInformation, viewDiaryEntry) {
    return new Promise(() => {
        // Open Database
        const request = indexedDB.open("journalEntries", 1);

        // Handle error
        request.onerror = () => {
            console.error('Error occured while trying to create/open "journalEntries" IndexedDB database');
        }

        request.onsuccess = () => {
            const db = request.result;
            const transaction = db.transaction("entries", "readwrite");
            const store = transaction.objectStore("entries");

            const deleteEntry = store.delete(currentEntryKey);

            deleteEntry.onsuccess = () => {
                sendToast("Deleted diary entry :(", "success");
                showDiaryInformation(false);
                viewDiaryEntry(false);
            }

            deleteEntry.onerror = () => {
                sendToast("Failed to delete diary entry :D", "error");
            }
        }
    })
}