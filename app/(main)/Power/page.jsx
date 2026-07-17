import { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import Content from "./_components/Content";

export const metadata = {
  title: "Energy Room",
};

export default function EnergyPage() {
  return (
    <Suspense fallback={<Skeleton className="h-screen bg-background" />}>
      <div className="h-full w-full overflow-x-hidden bg-cardbackground rounded-xl shadow-xl p-1.5 xl:p-6">
        <h1 className="sm:text-4xl font-bold tracking-[2px] text-2xl text-primary">
          Energy Room
        </h1>
        <Content />
      </div>
    </Suspense>
  );
}
