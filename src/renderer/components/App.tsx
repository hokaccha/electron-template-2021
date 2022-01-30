import type { FC } from "react";
import { useEffect } from "react";
import { ipc } from "~/lib/ipc";

export const App: FC = () => {
  useEffect(() => {
    ipc.on.showAlert((_event, message, now) => {
      alert(`${message}, now: ${now}`);
    });

    ipc.on.showConfirm((_event, message) => {
      confirm(message);
    });
  }, []);

  const sendHello = async () => {
    const response = await ipc.invoke.sendHello("world!");
    alert(response);
  };

  const hey = () => {
    ipc.invoke.hey();
  };

  return (
    <div>
      <p>
        sendHello <button onClick={sendHello}>Send IPC</button>
      </p>
      <p>
        hey <button onClick={hey}>Send IPC</button>
      </p>
    </div>
  );
};
