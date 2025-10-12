import { useEffect, useState } from 'react';
import { getImages } from '../../../../util/getImages';
import './AttachmentWindow.css';
import AttachImageButton from './Images/AttachImageButton';

export default function AttachmentWindow({toggleAttachmentWindow, images, setImages}) {
    const [imageComponents, setImageComponents] = useState([]);

    // Update imageComponents when images Array updates
    useEffect(() => {
        getImages(images, setImageComponents);
    }, [images]);

    return (
        <div id="attachment-window" onClick={(e) => {e.target.id === "attachment-window" && toggleAttachmentWindow(false)}}>
            <div id="attachment-window-container">
                <h2>Attachments</h2>
                <section id="attachment-window-images">
                    <h3>Images <span id="images-ram-warning">⚠️</span></h3>
                    <div id="attachment-window-images-list">
                        <AttachImageButton images={images} setImages={setImages} />
                        {imageComponents}
                    </div>
                </section>
            </div>
        </div>
    )
}