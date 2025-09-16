import { getCurrentDate } from "./getCurrentDate";

export function saveDiary(currentEmoji, showCreationPage) {
    // Create JSON
    const content = document.getElementById("creation-input").value;
    const date = getCurrentDate("YYYYMMDD");
    const fullDateClean = getCurrentDate();
    const cleanDate = getCurrentDate("DDMMYY");

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