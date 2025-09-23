import Image from "../components/Dashboard/Creation/AttachmentWindow/images/Image/Image";

import { getCurrentDate } from "./getCurrentDate";

export function getImages() {
    const date = getCurrentDate("YYYYMMDD");

    const indexedDB =
        window.indexedDB ||
        window.mozIndexedDB ||
        window.webkitIndexedDB ||
        window.msIndexedDB ||
        window.shimIndexedDB;

    if (!indexedDB) {
        console.error("Your browser doesn't support IndexedDB :("); // Uhh disable or smth I dunno but I also want to move the entriess to IndexedDB so then the whole site wouldn't work I dunno but what browser doesn't support IndexedDB?? Like huh? Well, no support for people that use a browser that doesn't support IndexedDB ig
    }

    const request = indexedDB.open("EntriesAttachments", 1); // Open database named "EntriesAttachments" (v1); if it doesn't exist then it should be created automatically apparently
    console.log(request);

    request.onerror = (event) => {
        console.error("An error occured with IndexedDB");
        console.error(event); // No Kournal experience for you :(
    }

    request.onupgradeneeded = () => {
        // so here I'll create the structure and shit which gets created when the database is created or upgraded to v2,3,4,5,6,7,8,...
        console.log("Creating database for attachments...");
        const db = request.result;
        db.createObjectStore("dates", { keyPath: "id" }); // Will probably use the date as id if that works
        // No need for indexes I thiiink?
    }

    request.onsuccess = () => {
        console.log("Request success");
        const db = request.result;
        const transaction = db.transaction("dates", "readonly");

        const store = transaction.objectStore("dates");

        const attachmentsQuery = store.get(date);
        
        attachmentsQuery.onsuccess = () => {
            console.log("attachmentsQuery apparently succeeded");
            console.log(attachmentsQuery.result);
            const attachmentsJSON = attachmentsQuery.result;
            const imagesJSON = attachmentsJSON.images;

            let imageElements = [];

            imagesJSON.forEach(element => {
                imageElements.push(Image(element));
            })

            return imageElements;
        }
    }
}