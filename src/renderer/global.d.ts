import type { IPC } from "../main/preload";

declare global {
  interface Window {
    ipc: IPC;
  }
}
