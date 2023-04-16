import React, { FC } from 'react';

interface Props {
  message: string;
};

const Loader: FC<Props> = ({ message }) => {
  return (
    <div className="loader p-10">
      <div className="loader__spinner"></div>
    </div>
  )
}

export default Loader