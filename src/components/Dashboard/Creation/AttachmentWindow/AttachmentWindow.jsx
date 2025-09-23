import './AttachmentWindow.css';

import AttachImageButton from './images/AttachImagesButton';
import { getImages } from '../../../../util/getImages';
import { useState, useEffect } from 'react';

export default function AttachmentWindow({toggleAttachmentWindow}) {
    const [images, setImages] = useState([]);

    const refreshImages = () => {
        setImages(getImages() || []);
    }

    useEffect(() => {
        refreshImages();
    }, []);

    return (
        <div id="attachment-window" onClick={(e) => {e.target.id === "attachment-window" && toggleAttachmentWindow(false)}}>
            <div id="attachment-window-container">
                <h2>Attachments</h2>
                <section id="attachment-window-images">
                    <h3>Images</h3>
                    <div id="attachment-window-images-list">
                        <AttachImageButton refreshImages={refreshImages} />
                        {images}
                    </div>
                </section>
            </div>
        </div>
    )
}