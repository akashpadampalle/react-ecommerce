import { toast } from "react-toastify";

export const successToast = (message) => {
    if (!message || typeof message != "string") {
        message = "done"
    }

    toast.success(message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

}


export const errorToast = (message) => {
    if (!message || typeof message != "string") {
        message = "wrong"
    }

    toast.error(message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

}