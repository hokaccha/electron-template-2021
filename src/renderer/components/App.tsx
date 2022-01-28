import type { FC } from "react";
import { useEffect } from "react";
import { ipc } from "~/lib/ipc";

export const App: FC = () => {
  useEffect(() => {
    ipc.onClickMenuItem((_event, message) => {
      alert(message);
    });
  }, []);

  const handleClick = async () => {
    const response = await ipc.sendHello("world!");
    alert(response);
  };

  return (
    <div>
      <button onClick={handleClick}>Send IPC</button>
    </div>
  );
};
