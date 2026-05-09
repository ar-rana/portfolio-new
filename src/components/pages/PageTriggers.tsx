import { TABS, type Page } from "@/types";
import { TabsList, TabsTrigger } from "../ui/tabs";

interface PageTriggerProps {
    activeIndex: number;
    handlePageChange: (page: Page) => void;
}

export default function PageTriggers({ activeIndex, handlePageChange }: PageTriggerProps) {
    const padding = 8;
    const gap = 4;
    const gapsTotal = (TABS.length - 1) * gap;
    const widthCalc = `calc((100% - ${padding + gapsTotal}px) / ${TABS.length})`;

    return (
        <>
            <TabsList className="relative flex items-center p-1 bg-bg rounded-[12px] h-auto gap-1 w-full max-w-[424px]">

                {/* Sliding Indicator */}
                <div
                    className="absolute left-1 top-1 bottom-1 rounded-[8px] bg-(--social-bg) pointer-events-none transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-20"
                    style={{
                        width: widthCalc,
                        transform: `translateX(calc(${activeIndex} * 100% + ${activeIndex * 4}px))`
                    }}
                />

                {
                    TABS.map((tab) => (
                        <TabsTrigger
                            key={tab.value}
                            value={tab.value}
                            onClick={() => handlePageChange(tab.value)}
                            className="relative z-10 flex-1 h-8 rounded-[8px] text-[12px] sm:text-[13px] font-medium text-(--light-text) hover:text-(--text) hover:bg-white/5 transition-colors data-[state=active]:text-white data-[state=active]:bg-transparent shadow-none px-0"
                        >
                            {tab.label}
                        </TabsTrigger>
                    ))
                }
            </TabsList>
        </>
    )
}