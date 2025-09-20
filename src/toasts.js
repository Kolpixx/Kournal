import { toast } from "react-toastify";

export const notifyMissingEmoji = () => toast.error("You need to select an emoji!", {
    position: "bottom-right",
    closeOnClick: true,
})

export const notifyMissingContent = () => toast.error("You need to write smth...", {
    position: "bottom-right",
    closeOnClick: true,
})

export function sendToast(message, type = "info") {
    switch (type) {
        case "error":
            toast.error(message, {
                position: "bottom-right",
                closeOnClick: true,
            });
            break;
        case "success":
            toast.success(message, {
                position: "bottom-right",
                closeOnClick: true,
            });
            break;
        default:
            toast(message, {
                position: "bottom-right",
                closeOnClick: true,
            });
            break;
    }
}