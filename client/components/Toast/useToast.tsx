import { useContext, useEffect } from "react";
import { toastContext } from "./toastContext";

function useToast(duration = 2000) {
    const context = useContext(toastContext)
    
    const setAlert = (message: string, type: string) => {
        context.setMessage(message);
        context.setType(type);
        context.setShowToast(true);
    }

    useEffect(() => {
        if (context.showToast) {
            setTimeout(() => {
                context.setShowToast(false);
            }, duration)
        }
    }, [context.showToast])

    return setAlert;
}

export default useToast