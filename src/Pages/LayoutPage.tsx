import SiteHeader from "@/components/siteHeader";
import { Outlet } from "react-router";

const LayoutPage = () => {
  return (
    <main className="flex flex-col min-h-screen">
      <SiteHeader />
      <Outlet />
    </main>
  );
};

export default LayoutPage;
