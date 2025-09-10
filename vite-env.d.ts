// FIX: Removed `/// <reference types="vite/client" />` because the type definition file could not be found.
// The interfaces below manually provide the necessary typings for `import.meta.env` for this project.

interface ImportMetaEnv {
  readonly VITE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
