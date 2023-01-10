export const removeIfNotCDI = (t, showOnlyCDI) =>
  !showOnlyCDI || (showOnlyCDI && t.hasCDIRelation);

export const sortByTime = (a, b) =>
  new Date(b.date || null).getTime() - new Date(a.date || null).getTime();