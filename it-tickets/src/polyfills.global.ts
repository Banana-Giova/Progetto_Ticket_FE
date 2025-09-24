// src/polyfills.global.ts
// definisce global in modo TypeScript-friendly
(window as any).global = window;
(window as any).globalThis = window;
