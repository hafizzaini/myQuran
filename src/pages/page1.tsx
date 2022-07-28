import { useState, useEffect } from "react";
export default function IndexPage() {
  const [Comp, setComp] = useState(null);
  useEffect(() => {
    import("@excalidraw/excalidraw").then((comp) => setComp(comp.default));
  }, []);

  console.log("aa", Comp);
  return <>{Comp && <Comp />}</>;
}
