import { toast } from "react-toastify";

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