import { useState, useEffect } from "react";
export default function IndexPage() {
  const [Comp, setComp] = useState(null);

  console.log("aa", Comp);
  return <>{Comp && <Comp />}</>;
}
