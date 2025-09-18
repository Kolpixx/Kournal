export function deleteEntry(currentEntryKey) {
    const entries = JSON.parse(localStorage.getItem("entries"));

    delete entries[currentEntryKey];

    localStorage.setItem("entries", JSON.stringify(entries));

    window.location.reload();
}