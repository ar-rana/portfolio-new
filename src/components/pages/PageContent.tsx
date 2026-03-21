import { TabsContent } from "@/components/ui/tabs";
import { PAGES } from "@/types/pages";

export default function PageContent() {
  return (
    <>
      {PAGES.map((page) => (
        <TabsContent
          key={page.value}
          value={page.value}
          className="animate-in fade-in zoom-in-95 duration-500 slide-in-from-bottom-2"
        >
          {page.content}
        </TabsContent>
      ))}
    </>
  );
}
