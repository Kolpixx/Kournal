import { getCurrentDate } from "./getCurrentDate";

export function saveDiary(currentEmoji, showCreationPage, date, fullDateClean, cleanDate) {
    // Create JSON
    const content = document.getElementById("creation-input").value;

    // Only get dates when unknown
    if (date === null) {
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
}