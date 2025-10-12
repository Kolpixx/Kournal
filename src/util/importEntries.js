import { sendToast } from "./sendToast";

export function importEntries(showSettings) {
    return new Promise(() => {
        // Open Database
        const request = indexedDB.open("journalEntries", 1);

        // Handle error
        request.onerror = () => {
            console.log('Error occured while trying to create/open "journalEntries" IndexedDB database');
        }

        request.onsuccess = () => {
            console.log("Trying to import entries...");

            const input = document.createElement("input");
            input.type = "file";
            input.accept = ".json";

            input.onchange = () => {
                const selectedFile = input.files[0];

                const reader = new FileReader();

                reader.addEventListener("load", () => {
                    const entriesJSON = JSON.parse(reader.result);

                    const regex = /\[\{"id":.*"key":.*"date":.*"content":.*"emoji":.*\}\]/i;

                    if (!regex.test(JSON.stringify(entriesJSON))) {
                        sendToast("Provided file doesn't match correct pattern D:", "error");
                        return;
                    }

                    const db = request.result;
                    const transaction = db.transaction("entries", "readwrite");
                    const store = transaction.objectStore("entries");

                    entriesJSON.forEach(entry => {
                        store.put(entry);
                    });
                    showSettings(false);

                    sendToast("Successfully imported entries! ＼(＾▽＾)／", "success")
                })

                if (selectedFile) {
                    reader.readAsText(selectedFile);
                }
            }

            input.click();
        }
    })
}