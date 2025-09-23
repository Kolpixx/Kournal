import './AttachmentWindow.css';

import AttachImageButton from './images/AttachImagesButton';
import { getImages } from '../../../../util/getImages';
import { useState, useEffect } from 'react';
import { getCurrentDate } from '../../../../util/getCurrentDate';

export default function AttachmentWindow({toggleAttachmentWindow}) {
    // const [images, setImages] = useState([]);

    // const refreshImages = () => {
    //     setImages(getImages() || []);
    // }

    // useEffect(() => {
    //     refreshImages();
    // }, []);

    return (
        <div id="attachment-window" onClick={(e) => {e.target.id === "attachment-window" && toggleAttachmentWindow(false)}}>
            <div id="attachment-window-container">
                <h2>Attachments</h2>
                <section id="attachment-window-images">
                    <h3>Images</h3>
                    <div id="attachment-window-images-list">
                        {/* <AttachImageButton refreshImages={refreshImages} />
                        {images} */}
                        <button onClick={addImage}>Add Image</button>
                        <button onClick={retrieveImages}>Retrieve Images</button>
                    </div>
                </section>
            </div>
        </div>
    )
}

function addImage() {
    console.log("Running addImage...");
    
    // Get current date
    const date = getCurrentDate("YYYYMMDD");
    console.log("Current Date:", date);

    const indexedDB =
        window.indexedDB ||
        window.mozIndexedDB ||
        window.webkitIndexedDB ||
        window.msIndexedDB ||
        window.shimIndexedDB;

    if (!indexedDB) {
        console.error("Your browser doesn't seem to support indexedDB :/");
    }

    // Create input
    const input = document.createElement("input");
    input.type = "file";

    input.onchange = () => {
        // Get selectedFile object
        const selectedFile = input.files[0];

        // Get base64 of file
        const fileReader = new FileReader();
        fileReader.readAsDataURL(selectedFile);

        fileReader.onload = () => {
            const base64 = fileReader.result;
            console.log("Base64:", base64);

            // Fun Part: IndexedDB!!
            // Create Database if it doesn't exist yet
            const request = indexedDB.open("EntriesAttachments", 1);

            // Catch error
            request.onerror = (e) => {
                console.log("Failed to create/open database", e);
            }

            // Create basic structure
            request.onupgradeneeded = () => {
                console.log("Creating basic database structure");
                const db = request.result;
                db.createObjectStore()
            }
        }
    }

    input.click();

}

function retrieveImages() {
    console.log("retrieveImages");
}