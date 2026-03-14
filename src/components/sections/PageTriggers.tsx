import { PATHS, type Page } from "@/types";
import { TabsList, TabsTrigger } from "../ui/tabs";

interface PageTriggerProps {
    activeIndex: number;
    handlePageChange: (page: Page) => void;
}

const TABS = [
    { value: PATHS.HOME, label: "Home" },
    { value: PATHS.ABOUT, label: "About" },
    { value: PATHS.BLOG, label: "Writings" },
];

export default function PageTriggers({ activeIndex, handlePageChange }: PageTriggerProps) {
    return (
        <>
            <TabsList className="relative flex items-center p-1 bg-bg rounded-[12px] h-auto gap-1">

                {/* Sliding Indicator */}
                <div
                    className="absolute left-1 top-1 bottom-1 w-[80px] rounded-[8px] bg-(--social-bg) pointer-events-none transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-20"
                    style={{ transform: `translateX(${activeIndex * 80 + activeIndex * 4}px)` }}
                />

                {
                    TABS.map((tab) => (
                        <TabsTrigger
                            key={tab.value}
                            value={tab.value}
                            onClick={() => handlePageChange(tab.value)}
                            className="relative z-10 w-[80px] h-8 rounded-[8px] text-[13px] font-medium text-(--light-text) hover:text-(--text) hover:bg-white/5 transition-colors data-[state=active]:text-white data-[state=active]:bg-transparent shadow-none"
                        >
                            {tab.label}
                        </TabsTrigger>
                    ))
                }
            </TabsList>
        </>
    )
}