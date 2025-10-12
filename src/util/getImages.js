import Image from "../components/Dashboard/Creation/AttachmentWindow/Images/Image/Image";

export function getImages(images, setImageComponents) {
    const imageComponents = [];

    images.forEach((image) => {
        imageComponents.push(Image(image));
    });

    setImageComponents(imageComponents);
    console.log(imageComponents);
    console.log(images);
}