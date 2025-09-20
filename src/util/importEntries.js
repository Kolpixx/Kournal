export function importEntries(showSettings) {
    console.log("Trying to import entries");

    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    
    input.onchange = () => {
        const selectedFile = input.files[0];

        const reader = new FileReader();

        reader.addEventListener("load", () => {
            localStorage.setItem("entries", reader.result);
            showSettings(false);
        });

        if (selectedFile) {
            reader.readAsText(selectedFile);
        }
    }
    
    input.click();
}