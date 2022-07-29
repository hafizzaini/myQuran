import { useEffect, useState } from "react";
import Workspace from "./Workspace";

const Index = () => {
  const [Comp, setComp] = useState(null);
  useEffect(() => {
    import("@excalidraw/excalidraw").then((comp) => setComp(comp));
  }, []);

  if (!Comp) return <div />;

  return <Workspace Comp={Comp} />;
};

export default Index;
