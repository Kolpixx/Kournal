import { sendToast } from "./sendToast";

export function changeTheme(theme) {
    const userJSON = JSON.parse(localStorage.getItem("user"));

    switch (theme) {
        case "default":
            document.body.className = theme;
            userJSON["theme"] = theme;
            localStorage.setItem("user", JSON.stringify(userJSON));
            break;
        case "dark":
            document.body.className = theme;
            userJSON["theme"] = theme;
            localStorage.setItem("user", JSON.stringify(userJSON));
            break;
        case "system":
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.body.className = "dark";
                userJSON["theme"] = "dark";
                localStorage.setItem("user", JSON.stringify(userJSON));
            } else {
                userJSON["theme"] = "default";
                localStorage.setItem("user", JSON.stringify(userJSON));
                document.body.className = "default"
            }
            break;
        default:
            document.body.className = "default";
            break;
    }

    sendToast("Updated theme! :P", "success");
}