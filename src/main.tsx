import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { store } from "./store.ts";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { LanguageProvider } from "./i18n.tsx";
import { ToastProvider } from "./components/ToastProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <LanguageProvider>
        <ToastProvider>
          <Toaster />
          <App />
        </ToastProvider>
      </LanguageProvider>
    </Provider>
  </React.StrictMode>
);
