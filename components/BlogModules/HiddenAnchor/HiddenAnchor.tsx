import React from 'react';
import { stripSpacesFromString } from 'lib/stripSpacesFromString';

interface HiddenAnchorLocationProps {
  top?: number;
  id: string;
}

export const HiddenAnchor = ({ top = 130, id }: HiddenAnchorLocationProps) => {
  const trimmedId = stripSpacesFromString(id)
  if (!trimmedId) {
    return null;
  }
  return (
    <div
      id={trimmedId}
      style={{ position: 'relative', display: 'block', visibility: 'hidden', top: `-${top}px` }}
    />
  );
};

