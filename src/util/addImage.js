export function addImage(images, setImages) {
    // Input
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = true;

    input.onchange = () => {
        const imagesArray = input.files;

        Array.from(imagesArray).forEach((image) => {
            const reader = new FileReader();

            reader.addEventListener("load", () => {
                const base64 = reader.result;

                setImages((images) => [...images, base64])
            })

            reader.readAsDataURL(image);
        })
    }

    input.click();
}