import type { FC } from "react";
import { useIpc } from "~/lib/ipc";

export const App: FC = () => {
  useIpc();
  return <div>hello electron</div>;
};
