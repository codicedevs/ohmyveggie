import { CSSProperties } from 'react';
import { Spinner } from 'react-bootstrap';

interface LoaderProps {
  options?: CSSProperties;
}

const Loader: React.FC<LoaderProps> = ({ options }) => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        width: '80px',
        height: '80px',
        margin: 'auto',
        display: 'block',
        borderRadius: '100px',
        ...options,
      }}
    >
      <span className="sr-only">Loading</span>
    </Spinner>
  );
};

export default Loader;
