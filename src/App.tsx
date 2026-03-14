import { useState } from "react"
import {
  Tabs, TabsContent, TabsList,
  TabsTrigger
} from "@/components/ui/tabs"

function App() {
  // Using React state explicitly to drive our sliding animation
  const [activeTab, setActiveTab] = useState("home")

  const tabs = ["home", "now", "writing"]
  const activeIndex = tabs.indexOf(activeTab)

  return (
    <main className="flex flex-col items-center justify-start min-h-screen bg-bg text-(--text-primary)">

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex flex-col items-center mt-6">

        {/* TOP NAVIGATION TABS */}
        <div className="fixed top-6 z-50 flex justify-center w-full px-4">
          <TabsList className="relative flex items-center p-1 bg-bg rounded-[12px] h-auto gap-1">

            {/* Sliding Outline Indicator - Pure CSS */}
            <div
              className="absolute left-1 top-1 bottom-1 w-[80px] rounded-[8px] bg-(--social-bg) pointer-events-none transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-20"
              style={{ transform: `translateX(${activeIndex * 80 + activeIndex * 4}px)` }}
            />

            <TabsTrigger
              value="home"
              className="relative z-10 w-[80px] h-8 rounded-[8px] text-[13px] font-medium text-[#888] hover:text-[#ccc] hover:bg-white/5 transition-colors data-[state=active]:text-white data-[state=active]:bg-transparent shadow-none"
            >
              Home
            </TabsTrigger>

            <TabsTrigger
              value="now"
              className="relative z-10 w-[80px] h-8 rounded-[8px] text-[13px] font-medium text-[#888] hover:text-[#ccc] hover:bg-white/5 transition-colors data-[state=active]:text-white data-[state=active]:bg-transparent shadow-none"
            >
              Now
            </TabsTrigger>

            <TabsTrigger
              value="writing"
              className="relative z-10 w-[80px] h-8 rounded-[8px] text-[13px] font-medium text-[#888] hover:text-[#ccc] hover:bg-white/5 transition-colors data-[state=active]:text-white data-[state=active]:bg-transparent shadow-none"
            >
              Writing
            </TabsTrigger>
          </TabsList>
        </div>

        {/* PAGE CONTENT */}
        <div className="max-w-[700px] w-full mt-32 px-6">
          <TabsContent value="home" className="animate-in fade-in zoom-in-95 duration-500 slide-in-from-bottom-2">
            <p>sdafsd

            </p>
          </TabsContent>

          <TabsContent value="now" className="animate-in fade-in zoom-in-95 duration-500 slide-in-from-bottom-2">
            <p>asdsdjkb</p>
          </TabsContent>

          <TabsContent value="writing" className="animate-in fade-in zoom-in-95 duration-500 slide-in-from-bottom-2">
            <p>asdfasdf</p>
          </TabsContent>
        </div>
      </Tabs>
    </main>
  )
}

export default App
