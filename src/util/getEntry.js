export default function getEntry(date) {
    return new Promise((resolve, reject) => {
        // Open Database
        const request = indexedDB.open("journalEntries", 1);

        // Handle error
        request.onerror = () => {
            console.error('Error occured while trying to create/open "journalEntries" IndexedDB database');
        }

        request.onsuccess = () => {
            const db = request.result;
            const transaction = db.transaction("entries", "readonly");
            const store = transaction.objectStore("entries");

            const entry = store.get(date);

            entry.onsuccess = () => {
                resolve(entry.result);
            }
            
            entry.onerror = () => {
                reject(entry.error);
            }
        }

        request.onerror = () => {
            reject(request.error);
        }
    })
}