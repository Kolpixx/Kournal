export function importEntries() {
    console.log("Trying to import entries");

    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    
    input.onchange = () => {
        const selectedFile = input.files[0];

        const reader = new FileReader();

        reader.addEventListener("load", () => {
            localStorage.setItem("entries", reader.result);
            window.location.reload();
        });

        if (selectedFile) {
            reader.readAsText(selectedFile);
        }
    }
    
    input.click();
}