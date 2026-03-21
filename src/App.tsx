import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { PATHS, type Page } from "./types";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "@/components/sections/Header";
import { SideWaves } from "@/components/sections/SideWaves";
import { PeacockDivider } from "@/components/sections/PeacockDivider";
import PageTriggers from "./components/sections/PageTriggers";
import Home from "./components/pages/Home";
import BgGradient from "./components/sections/BgGradient";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<Page>(location.pathname as Page);
  const tabs: Page[] = [PATHS.HOME, PATHS.ABOUT, PATHS.BLOG];
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
          <TabsContent
            value={PATHS.HOME}
            className="animate-in fade-in zoom-in-95 duration-500 slide-in-from-bottom-2"
          >
            <Home />
          </TabsContent>

          <TabsContent
            value={PATHS.ABOUT}
            className="animate-in fade-in zoom-in-95 duration-500 slide-in-from-bottom-2"
          >
            <p>asdsdjkb</p>
          </TabsContent>

          <TabsContent
            value={PATHS.BLOG}
            className="animate-in fade-in zoom-in-95 duration-500 slide-in-from-bottom-2"
          >
            <p>asdfasdf</p>
          </TabsContent>
        </div>
      </Tabs>
    </main>
  );
}

export default App;
