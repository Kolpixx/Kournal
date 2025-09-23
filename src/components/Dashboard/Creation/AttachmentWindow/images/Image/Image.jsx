import './Image.css';

export default function Image(image) {
    return (
        <div className="entries-attachment-window-images-list-image" style={{backgroundImage: `url(${image})`}} />
    )
}