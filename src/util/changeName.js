import { toast } from 'react-toastify';

export function changeName(name) {
    const notify = () => toast.error("You gotta enter a name... lmao", {
        position: "bottom-right",
        closeOnClick: true
    })

    if (name === "") {
        notify();
        return;
    }

    const userJSON = JSON.parse(localStorage.getItem("user"));

    userJSON["name"] = name;

    localStorage.setItem("user", JSON.stringify(userJSON));

    window.location.reload();
}