// vite-env.d.ts
/// <reference types="vite/client" />

declare module '*.hbs?raw' {
  const content: string;
  export default content;
}

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
