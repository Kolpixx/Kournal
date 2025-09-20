import { sendToast } from "./sendToast";

export function deleteEntry(currentEntryKey, showDiaryInformation, viewDiaryEntry) {
    const entries = JSON.parse(localStorage.getItem("entries"));

    delete entries[currentEntryKey];

    localStorage.setItem("entries", JSON.stringify(entries));

    showDiaryInformation(false);
    viewDiaryEntry(false);

    sendToast("Deleted diary entry :(", "success");
}