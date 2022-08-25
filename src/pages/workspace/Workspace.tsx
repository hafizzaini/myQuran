// import React, { useEffect, useState, useRef } from "react";
// // import {
// //   Excalidraw,
// //   exportToCanvas,
// //   exportToSvg,
// //   exportToBlob,
// // } from "@excalidraw/excalidraw";

// import initialData from "../../../lib/initialData";

// const renderTopRightUI = () => {
//   return (
//     <button onClick={() => alert("This is dummy top right UI")}>
//       {" "}
//       Click me{" "}
//     </button>
//   );
// };

// const renderFooter = () => {
//   return (
//     <button onClick={() => alert("This is dummy footer")}>
//       {" "}
//       custom footer{" "}
//     </button>
//   );
// };

// export default function Workspace({ Comp }) {
//   const excalidrawRef = useRef<ExcalidrawImperativeAPI>(null);

//   const { Excalidraw } = Comp || {};
//   console.log(Comp);
//   const [theme, setTheme] = useState<ExcalidrawProps["theme"]>("light");

//   return (
//     <div className="App">
//       <h1> Excalidraw Example</h1>
//       <div className="button-wrapper">
//         <button
//           className="reset-scene"
//           onClick={() => {
//             excalidrawRef.current!.resetScene();
//           }}
//         >
//           Reset Scene
//         </button>
//         <label>
//           <input
//             type="checkbox"
//             checked={theme === "dark"}
//             onChange={() => {
//               let newTheme: "light" | "dark" = "light";
//               if (theme === "light") {
//                 newTheme = "dark";
//               }
//               setTheme(newTheme);
//             }}
//           />
//           Switch to Dark Theme
//         </label>
//       </div>
//       <div className="excalidraw-wrapper">
//         {Comp ? (
//           <Excalidraw
//             ref={excalidrawRef}
//             initialData={initialData}
//             // onChange={(elements: readonly ExcalidrawElement[], state: AppState) =>
//             //   console.log("Elements :", elements, "State : ", state)
//             // }
//             // onPointerUpdate={(payload) => console.log(payload)}
//             onCollabButtonClick={() =>
//               window.alert("You clicked on collab button")
//             }
//             theme={theme}
//             name="Custom name of drawing"
//             renderFooter={renderFooter}
//             renderTopRightUI={renderTopRightUI}
//           />
//         ) : (
//           <div />
//         )}
//       </div>
//     </div>
//   );
// }

export const a = () => <div />;
