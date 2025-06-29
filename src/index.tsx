import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";

import "@mantine/core/styles.css";
import App from "./App";

const rootEl = document.getElementById("root");
if (rootEl) {
    const root = ReactDOM.createRoot(rootEl);
    root.render(
        <React.StrictMode>
            <MantineProvider>
                <App />
            </MantineProvider>
        </React.StrictMode>,
    )
}
