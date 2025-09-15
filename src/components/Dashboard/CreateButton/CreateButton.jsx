import './CreateButton.css';

export default function CreateButton({showing, setShowing}) {
    return (
        <>
            <div title="Create Journal Entry" className="create-button" onClick={() => {setShowing(!showing)}}>
                <svg width="111" height="111" viewBox="0 0 111 111" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.875 55.5H107.125M55.5 3.875V107.125" stroke="black" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
        </>
    )
}