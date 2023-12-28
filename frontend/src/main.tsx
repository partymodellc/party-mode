import React, {StrictMode} from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import "./index.css";
import ScrollToTop from "./component/General/ScrollToTop";
import {AuthProvider} from "./context/AuthProvider";
import {EventProvider} from "./context/EventProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    // <StrictMode>
    <BrowserRouter>
        <AuthProvider>
            <EventProvider>
                <ScrollToTop/>
                <App/>
            </EventProvider>
        </AuthProvider>
    </BrowserRouter>
    // </StrictMode>
);
