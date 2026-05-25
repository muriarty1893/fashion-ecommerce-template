"use client";

import Header from "./Header";
import Footer from "./Footer";
import { ScrollToTop } from "./index";

const StoreLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <ScrollToTop />
    <Header />
    {children}
    <Footer />
  </>
);

export default StoreLayout;
