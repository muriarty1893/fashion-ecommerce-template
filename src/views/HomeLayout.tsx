import type { ReactNode } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ScrollToTop } from "../components";

const HomeLayout = ({ children }: { children?: ReactNode }) => {
  return (
    <>
      <ScrollToTop />
      <Header />
      {children}
      <Footer />
    </>
  );
};
export default HomeLayout;
