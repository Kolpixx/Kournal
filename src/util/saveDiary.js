import { getCurrentDate } from "./getCurrentDate";

export function saveDiary(currentEmoji, setShowing) {
    // Create JSON
    const content = document.getElementById("creation-input").value;
    const date = getCurrentDate("YYYYMMDD");
    const fullDateClean = getCurrentDate();
    const cleanDate = getCurrentDate("DDMMYY");

    if (localStorage.getItem("entries") === null) {
        localStorage.setItem("entries", "{}");
    }

    let diarryJSON = {
        key: date,
        fullDateClean: fullDateClean,
        date: cleanDate,
        content: content,
        emoji: currentEmoji
    }

    const entriesObject = JSON.parse(localStorage.getItem("entries"));
    entriesObject[date] = diarryJSON;

    localStorage.setItem("entries", JSON.stringify(entriesObject));

    setShowing(false);
}