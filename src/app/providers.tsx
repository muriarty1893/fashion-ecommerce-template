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
        <Toaster />
        {children}
      </ToastProvider>
    </LanguageProvider>
  </Provider>
);

export default Providers;
