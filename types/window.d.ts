// types/window.d.ts
export {};

declare global {
  interface Window {
    dataLayer: any[]; // You can refine 'any[]' to a specific type if you know the structure of dataLayer
  }
}