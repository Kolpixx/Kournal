import { getCurrentDate } from "./getCurrentDate";

export function addImage(refreshImages) {
    const date = getCurrentDate("YYYYMMDD");

    const indexedDB =
        window.indexedDB ||
        window.mozIndexedDB ||
        window.webkitIndexedDB ||
        window.msIndexedDB ||
        window.shimIndexedDB;

    if (!indexedDB) {
        console.error("Your browser doesn't support IndexedDB :(");
    }

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/png, image/jpeg";

    input.onchange = () => {
        console.log("Trying to add image...");

        const selectedFile = input.files[0];
        console.log("Select file:");
        console.log(selectedFile);

        const fileReader = new FileReader();

        fileReader.onload = () => {
            const base64 = fileReader.result;
            console.log("base64 of file:");
            console.log(base64);

            const request = indexedDB.open("EntriesAttachments", 1);

            request.onerror = (event) => {
                console.error("An error occured with IndexedDB");
                console.error(event); // No Kournal experience for you :(
            }

            request.onsuccess = () => {
                console.log("Request to open the database has succeeded");
                const db = request.result;
                const transaction = db.transaction("dates", "readwrite");
                const store = transaction.objectStore("dates");

                console.log("date", date);
                const attachmentsQuery = store.get(date);

                attachmentsQuery.onerror = () => {
                    console.log("Error while querying database for date");
                }

                attachmentsQuery.onsuccess = () => {
                    console.log("Querying database for date succeeded")
                    let attachmentsJSON;
                    if (attachmentsQuery.result === undefined) {
                        console.log("attachementsQuery.result is undefined so I'll add empty image array to date or smth bro I don't even know anymore");
                        store.add({ id: date, images: [] });
                        attachmentsJSON = {id: date, images: []};
                    } else {
                        attachmentsJSON = attachmentsQuery.result;
                    }

                    console.log(attachmentsQuery.result);
                    console.log(attachmentsJSON);

                    attachmentsJSON.images.push(base64);
                    store.put({ attachmentsJSON });

                    // Update entry
                    console.log(attachmentsJSON);
                }
            }
            // refreshImages();
        };

        // Get base64 (no shit .-.)
        fileReader.readAsDataURL(selectedFile);
    }

    input.click();
}