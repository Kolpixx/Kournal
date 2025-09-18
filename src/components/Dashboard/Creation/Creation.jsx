import './Creation.css'

import { EmojiPicker } from 'frimousse'
import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { saveDiary } from '../../../util/saveDiary';

export default function Creation({showCreationPage, currentEntryKey, editingMode, toggleEditingMode}) {
    const [showingEmojiPicker, toggleEmojiPicker] = useState(false);
    const [currentEmoji, setEmoji] = useState(null);

    const entries = JSON.parse(localStorage.getItem("entries"));
    const entry = entries[currentEntryKey];

    useEffect(() => {
        if (editingMode) {
            setEmoji(entry.emoji);
        }
    }, [])

    {/* TODO: Maybe make this a form later w/ proper submit handling to follow standards but too lazy to do that now */}

    const notifyMissingEmoji = () => toast.error("You need to select an emoji!", {
        position: "bottom-right",
        closeOnClick: true,
    })
    
    const notifyMissingContent = () => toast.error("You need to write smth...", {
        position: "bottom-right",
        closeOnClick: true,
    })

    return (
        <div className="creation">
            <div className="creation-input-container">
                <div className="creation-top">
                    <div className="emoji">
                        <button className="emoji-button" onClick={() => toggleEmojiPicker(!showingEmojiPicker)}>
                            {currentEmoji === null ? <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="#26262673" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-smile-icon lucide-smile"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg> : <span className="emoji-display">{currentEmoji}</span>}
                        </button>
                        {showingEmojiPicker ? <MyEmojiPicker setEmoji={setEmoji} toggleEmojiPicker={toggleEmojiPicker} /> : null}
                    </div>
                    <div className="creation-actions">
                        <button className="exit-button" onClick={() => {showCreationPage(false); toggleEditingMode(false)}}>
                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M33 3L3 33M3 3L33 33" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                        <button className="send-button" onClick={() => {editingMode ? saveDiary(notifyMissingEmoji, notifyMissingContent, currentEmoji, showCreationPage, entry.key, entry.fullDateClean, entry.date) : saveDiary(notifyMissingEmoji, notifyMissingContent, currentEmoji, showCreationPage); toggleEditingMode(false)}}>
                            <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.4631 22.5348C18.1047 22.1771 17.6777 21.8957 17.2076 21.7075L2.33887 15.745C2.16134 15.6737 2.00985 15.5499 1.90473 15.3901C1.79961 15.2303 1.7459 15.0421 1.7508 14.8509C1.75569 14.6597 1.81897 14.4745 1.93213 14.3203C2.0453 14.1661 2.20293 14.0502 2.38387 13.9881L38.0089 1.80061C38.175 1.7406 38.3548 1.72915 38.5272 1.76759C38.6996 1.80604 38.8575 1.89279 38.9824 2.01769C39.1073 2.1426 39.1941 2.30049 39.2325 2.4729C39.271 2.64531 39.2595 2.8251 39.1995 2.99123L27.012 38.6162C26.9499 38.7972 26.834 38.9548 26.6798 39.068C26.5256 39.1811 26.3404 39.2444 26.1492 39.2493C25.958 39.2542 25.7698 39.2005 25.61 39.0954C25.4502 38.9903 25.3264 38.8388 25.2551 38.6612L19.2926 23.7887C19.1036 23.319 18.8214 22.8925 18.4631 22.5348ZM18.4631 22.5348L38.9764 2.02561" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <textarea id="creation-input" name="creation-input" placeholder="Dear Diary..." required={true} defaultValue={editingMode ? entry.content : null} />
                <ToastContainer newestOnTop={true} />
            </div>
        </div>
    )
}

function MyEmojiPicker({ setEmoji, toggleEmojiPicker }) {
  return (
    <EmojiPicker.Root onEmojiSelect={({ emoji }) => {setEmoji(emoji); toggleEmojiPicker(false);}}>
      <EmojiPicker.Search />
      <EmojiPicker.Viewport>
        <EmojiPicker.Loading>Loading…</EmojiPicker.Loading>
        <EmojiPicker.Empty>No emoji found.</EmojiPicker.Empty>
        <EmojiPicker.List />
      </EmojiPicker.Viewport>
    </EmojiPicker.Root>
  );
}