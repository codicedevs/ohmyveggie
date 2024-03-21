import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


const Toast: React.FC<{ mode?: string, msje: string }> = ({
    mode = 'success',
    msje,
  }) => {
    return (
        toast.success({msje})
    )    
  };
  
  export default Toast;