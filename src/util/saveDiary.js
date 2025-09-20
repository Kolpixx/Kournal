import { getCurrentDate } from "./getCurrentDate";
import { sendToast } from "../toasts";

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

    if (localStorage.getItem("entries") === null) {
        localStorage.setItem("entries", "{}");
    }

    let diaryJSON = {
        key: date,
        fullDateClean: fullDateClean,
        date: cleanDate,
        content: content,
        emoji: currentEmoji
    }

    const entriesObject = JSON.parse(localStorage.getItem("entries"));
    entriesObject[date] = diaryJSON;

    localStorage.setItem("entries", JSON.stringify(entriesObject));

    showCreationPage(false);
    sendToast("Saved diary entry (⌒▽⌒)☆", "success");
}