import React from 'react';

interface Props {
  title: string;
}

export const TimeEstimationBox: React.FC<Props> = ({ title }) => {
  return <div> {title}</div>;
};
