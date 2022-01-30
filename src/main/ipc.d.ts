import type { IPC } from "./ipc";

declare global {
  interface Window {
    ipc: IPC;
  }
}
