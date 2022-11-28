import React from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
function createCtx<A extends {} | null>() {
  const ctx = React.createContext<A | undefined>(undefined);
  function useCtx() {
    const c = React.useContext(ctx);
    if (c === undefined)
      throw new Error(
        'SharedContentContext must be wrapper in the slug page with a value in this page: Page: ' +
          globalThis.location,
      );
    return c;
  }
  return [useCtx, ctx.Provider] as const; // 'as const' makes TypeScript infer a tuple
}

export const [useSharedContentContext, SharedContentContext] = createCtx<any>();
