import { getCurrentDate } from "./getCurrentDate";

export function saveLetter(currentEmoji, setShowing) {
    // Create JSON
    const content = document.getElementById("creation-input").value;
    const date = getCurrentDate("YYYYMMDD");
    const fullDateClean = getCurrentDate();
    const cleanDate = getCurrentDate("DDMMYY");

    if (localStorage.getItem("entries") === null) {
        localStorage.setItem("entries", "{}");
    }

    let letterJSON = {
        key: date,
        fullDateClean: fullDateClean,
        date: cleanDate,
        content: content,
        emoji: currentEmoji
    }

    const entriesObject = JSON.parse(localStorage.getItem("entries"));
    entriesObject[date] = letterJSON;

    localStorage.setItem("entries", JSON.stringify(entriesObject));

    setShowing(false);
}