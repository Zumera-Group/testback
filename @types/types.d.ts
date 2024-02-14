// types.d.ts
declare global {
  interface Window {
    Calendly?: {
      closePopupWidget: () => void;
      showPopupWidget: (url: string) => void;
      // ... other Calendly methods
    };
  }
}

export {};