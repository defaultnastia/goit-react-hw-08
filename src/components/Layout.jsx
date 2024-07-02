import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import AppBar from "./AppBar/AppBar";

const Layout = ({ children }) => {
  return (
    <>
      <Toaster />
      <AppBar />
      <Suspense fallback={null}>{children}</Suspense>
    </>
  );
};

export default Layout;
