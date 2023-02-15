import React from 'react';

interface Props {
  text: string;
}

export const TextBoxGroup: React.FC<Props> = ({ text }) => {
  return (
    <div>
      <p>{text}</p>
    </div>
  );
};
