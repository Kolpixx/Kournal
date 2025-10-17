import { sendToast } from "./sendToast";

export function changeTheme(theme) {
    let userJSON;

    if (localStorage.getItem("user") !== null) {
        userJSON = JSON.parse(localStorage.getItem("user"));
    } else {
        userJSON = JSON.parse("{}");
    }

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
            userJSON["theme"] = theme;
            localStorage.setItem("user", JSON.stringify(userJSON));
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.body.className = "dark";
            } else {
                document.body.className = "default"
            }
            break;
        default:
            document.body.className = "default";
            break;
    }

    sendToast("Updated theme! :P", "success");
}