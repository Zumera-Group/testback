import create from 'zustand';

export const useCareerRef = create<{
  sectionRef: React.MutableRefObject<HTMLDivElement>;
  setSectionRef(ref: React.MutableRefObject<HTMLDivElement>): void;
}>((set) => ({
  sectionRef: null,
  setSectionRef: (ref: React.MutableRefObject<HTMLDivElement>) =>
    set({ sectionRef: ref }),
}));
