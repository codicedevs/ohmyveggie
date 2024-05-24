import { Dispatch, PropsWithChildren, SetStateAction, createContext, useState } from "react";
import ToastOMV from ".";

interface ToastContext {
    setMessage: Dispatch<SetStateAction<any>>;
    setType: Dispatch<SetStateAction<any>>;
    setShowToast: Dispatch<SetStateAction<any>>;
    showToast: boolean
}

export const toastContext = createContext<ToastContext>({
    setMessage: () => {},
    setType: () => {},
    setShowToast: () => {},
    showToast: false
});

export type AlertTypes = "error" | "success";

export const ToastProvider = ({ children }: PropsWithChildren<any>) => {
  const [message, setMessage] = useState("");
  const [type, setType] = useState<AlertTypes>("success");
  const [showToast, setShowToast] = useState(false);

  return (
    <toastContext.Provider
      value={{
        setMessage,
        setType,
        setShowToast,
        showToast
      }}
    >
      <>
      {children}
      <div style={{ position: "fixed", bottom: 10 }}>
        { showToast ? <ToastOMV {...{message, type }}></ToastOMV>: null}
      </div>
      </>
    </toastContext.Provider>
  );
};
