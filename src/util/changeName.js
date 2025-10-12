import { sendToast } from "./sendToast";

export function changeName(name) {
    if (name === "") {
        sendToast("You gotta enter a name silly :3", "error");
        return;
    }

    const userJSON = JSON.parse(localStorage.getItem("user"));

    userJSON["name"] = name;

    localStorage.setItem("user", JSON.stringify(userJSON));
    document.getElementById("dashboard-username").innerText = name;

    sendToast("Updated ya name!! (≧∇≦)/", "success");
}