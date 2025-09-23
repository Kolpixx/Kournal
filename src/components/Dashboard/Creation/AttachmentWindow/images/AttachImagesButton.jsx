import { addImage } from '../../../../../util/addImage';
import './AttachImageButton.css';

export default function AttachImageButton({ refreshImages }) {
    return (
        <button id="attach-image-button" onClick={() => addImage(refreshImages)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus-icon lucide-plus">
                <path d="M5 12h14"/><path d="M12 5v14"/>
            </svg>
        </button>
    )
}