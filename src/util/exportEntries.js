export function exportEntries() {
    const entriesJSON = JSON.parse(localStorage.getItem("entries"));

    const link = document.createElement("a");
    link.href = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(entriesJSON))}`;
    link.download = "entries.json";
    link.click();
}