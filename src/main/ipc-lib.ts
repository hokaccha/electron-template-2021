import type { BrowserWindow, IpcMainInvokeEvent, IpcRendererEvent } from "electron";
import { ipcMain, ipcRenderer } from "electron";

type Tail<T extends unknown[]> = T extends [unknown, ...infer Rest] ? Rest : [];
export type IpcFromRendererHandler = (...args: any[]) => Promise<unknown>;
export type IpcFromMainHandler<T extends unknown[] = unknown[]> = (
  listener: (event: IpcRendererEvent, ...args: T) => void
) => void;
export type ListenerArgs<T extends IpcFromMainHandler> = Tail<Parameters<Parameters<T>[0]>>;

export function createIpc<
  IpcFromRenderer extends Record<string, IpcFromRendererHandler>,
  IpcFromMain extends Record<string, IpcFromMainHandler>
>() {
  function invoke<T extends keyof IpcFromRenderer>(
    channel: T,
    ...args: Parameters<IpcFromRenderer[T]>
  ): ReturnType<IpcFromRenderer[T]> {
    return ipcRenderer.invoke(channel as string, ...args) as any;
  }

  function on<T extends keyof IpcFromMain>(
    channel: T,
    listener: Parameters<IpcFromMainHandler<ListenerArgs<IpcFromMain[T]>>>[0]
  ): void {
    ipcRenderer.on(channel as string, listener as Parameters<IpcFromMainHandler>[0]);
  }

  function handle<T extends keyof IpcFromRenderer>(
    channel: T,
    listener: (event: IpcMainInvokeEvent, ...args: Parameters<IpcFromRenderer[T]>) => ReturnType<IpcFromRenderer[T]>
  ) {
    ipcMain.handle(channel as string, listener as any);
  }

  function send<T extends keyof IpcFromMain>(window: BrowserWindow, channel: T, ...args: ListenerArgs<IpcFromMain[T]>) {
    window.webContents.send(channel as string, ...args);
  }

  return {
    ipcRenderer: {
      invoke,
      on,
    },
    ipcMain: {
      handle,
      send,
    },
  };
}
