"use client";

import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { LanguageProvider } from "../i18n";
import { store } from "../store";
import { ToastProvider } from "../components/ToastProvider";

const Providers = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>
    <LanguageProvider>
      <ToastProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4200,
            className: "app-hot-toast",
            success: {
              className: "app-hot-toast app-hot-toast-success",
            },
            error: {
              className: "app-hot-toast app-hot-toast-error",
            },
          }}
        />
        {children}
      </ToastProvider>
    </LanguageProvider>
  </Provider>
);

export default Providers;
