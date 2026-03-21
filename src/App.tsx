import { useState } from "react";
import { Tabs } from "@/components/ui/tabs";
import { PATHS, type Page } from "./types";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "@/components/sections/Header";
import { SideWaves } from "@/components/sections/SideWaves";
import { PeacockDivider } from "@/components/sections/PeacockDivider";
import PageTriggers from "./components/pages/PageTriggers";
import BgGradient from "./components/sections/BgGradient";
import PageContent from "./components/pages/PageContent";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<Page>(location.pathname as Page);
  const tabs: Page[] = Object.values(PATHS);
  const activeIndex = tabs.indexOf(activeTab);

  const handlePageChange = (page: Page) => {
    setActiveTab(page);
    navigate(page);
  };

  return (
    <main className="relative overflow-hidden flex flex-col items-center justify-start min-h-screen bg-bg text-(--text-primary)">
      <BgGradient />
      <SideWaves />
      <Header />
      <PeacockDivider />
      <Tabs
        value={activeTab}
        className="relative z-10 w-full flex flex-col items-center mt-2"
      >
        <div className="z-50 justify-center w-full px-4 flex">
          <PageTriggers
            activeIndex={activeIndex}
            handlePageChange={handlePageChange}
          />
        </div>

        {/* PAGE CONTENT */}
        <div className="max-w-4xl w-full mt-4 px-6">
          <PageContent />
        </div>
      </Tabs>
    </main>
  );
}

export default App;
