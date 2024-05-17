import React from 'react';
import { DotLoader } from 'react-spinners';

interface LoaderProps {
  size?: number;
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({ size, color }) => {
  return (
    <DotLoader
      color={color || "#a2cca6"}
      size={size || 80}
    />
  );
};

export default Loader;


