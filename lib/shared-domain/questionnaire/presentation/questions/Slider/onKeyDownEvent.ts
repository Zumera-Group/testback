import { KeyboardEvent } from 'react';

const onKeyDownEvent = (evt: KeyboardEvent<HTMLDivElement>) => {
  if (evt.key === 'Enter') (document?.activeElement as HTMLElement).blur();
};

export default onKeyDownEvent;
