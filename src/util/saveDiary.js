import { getCurrentDate } from "./getCurrentDate";
import { sendToast } from "./sendToast";

export function saveDiary(currentEmoji, showCreationPage, date, fullDateClean, cleanDate) {
    if (document.getElementById("creation-input").value === "") {
        sendToast("You ned to write smth... bru", "error");
        return;
    }

    if (currentEmoji === null) {
        sendToast("Select an emoji!!", "error");
        return;
    }

    // Create JSON
    const content = document.getElementById("creation-input").value;

    // Only get dates when unknown
    if (date === undefined) {
        date = getCurrentDate("YYYYMMDD");
        fullDateClean = getCurrentDate();
        cleanDate = getCurrentDate("DDMMYY");
    }
    
    let diaryJSON = {
        id: date,
        key: date,
        fullDateClean: fullDateClean,
        date: cleanDate,
        content: content,
        emoji: currentEmoji
    }

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
        store.put(diaryJSON);
    }

    showCreationPage(false);
    sendToast("Saved diary entry (⌒▽⌒)☆", "success");
}