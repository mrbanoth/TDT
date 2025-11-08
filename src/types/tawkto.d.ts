interface TawkAPI {
  showWidget: () => void;
  hideWidget: () => void;
  toggle: () => void;
  maximize: () => void;
  minimize: () => void;
  getWindow: () => Window;
  onLoad: (callback: () => void) => void;
  onStatusChange: (status: string) => void;
  onBeforeLoad: (callback: () => void) => void;
  visitor: {
    name: string;
    email: string;
  };
}

declare global {
  interface Window {
    Tawk_API?: TawkAPI;
    Tawk_LoadStart?: Date;
  }
}
