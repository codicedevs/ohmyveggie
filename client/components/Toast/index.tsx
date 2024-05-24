import Toast from "react-bootstrap/Toast";
import { AlertTypes } from "./toastContext";
import { Alert } from "react-bootstrap";

interface ToastOMVProps {
  type: AlertTypes;
  message: string;
}

function ToastOMV({ message, type }: ToastOMVProps) {
  return (
    <Alert key={type} variant={type}>
      {message}
    </Alert>
  );
}

export default ToastOMV;
