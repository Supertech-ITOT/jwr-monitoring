import { Suspense } from "react";
import type { Metadata } from "next";

import { Skeleton } from "@/components/ui/skeleton";
import Content from "./_components/Content";

export const metadata: Metadata = {
  title: "Energy Room",
};

export default function EnergyPage(): React.JSX.Element {
  return (
    <Suspense fallback={<Skeleton className="h-screen bg-background" />}>
      <div className="h-full w-full overflow-x-hidden rounded-xl bg-cardbackground p-1.5 shadow-xl xl:p-6">
        <h1 className="text-2xl font-bold tracking-[2px] text-primary sm:text-4xl">Energy Room</h1>

        <Content />
      </div>
    </Suspense>
  );
}
