import { useEffect } from "react";

export function useIpc() {
  useEffect(() => {
    window.ipcRenderer.on("hello", (event, message) => {
      console.log(event);
      console.log(message);
    });
  }, []);
}
