import Toast from "react-bootstrap/Toast";
import { AlertTypes } from "./toastContext";
import { Alert, ToastContainer, ToastHeader } from "react-bootstrap";

interface ToastOMVProps {
  type: AlertTypes;
  message: string;
}

function ToastOMV({ message, type }: ToastOMVProps) {
  return (
    <Alert 
      id="caramba" 
      key={type} 
      variant={type}
      style={{left: 800}}
      >
      {message}
    </Alert>
    // <ToastContainer 
    // className="p-4"
    // style={{zIndex: 1 }}
    // position="top-center"
    // >
    //   <Toast key={type}>
    //     <p>{message}</p>
    //   </Toast>
    // </ToastContainer>
  );
}

export default ToastOMV;
