import { CSSProperties } from 'react';
import { Spinner } from 'react-bootstrap';
import { DotLoader } from 'react-spinners';

interface LoaderProps {
  options?: CSSProperties;
}

const Loader: React.FC<any> = ( {size, color}  ) => {
  return (
    // <Spinner
    //   animation="border"
    //   role="status"
    //   style={{
    //     width: '100px',
    //     height: '100px',
    //     margin: 'auto',
    //     display: 'block',
    //     ...options,
    //   }}
    // >
    //   <span className="sr-only">Loading</span>
    // </Spinner>

    <DotLoader
  color={!color? "#a2cca6" : color}
  size={!size? 80 : size }

/>
  );
};

export default Loader;
