import { createRoot } from "react-dom/client";
import "@radix-ui/themes/styles.css";
import App from "./App";
import { Theme } from "@radix-ui/themes";

const root = createRoot(document.querySelector("#root"));

root.render(
  <Theme accentColor="green" panelBackground="solid">
    <App />
  </Theme>
);
