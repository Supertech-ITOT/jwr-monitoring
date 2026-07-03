import { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import Content from "./_components/Content";

export const metadata = {
  title: "Multiple Room",
};

export default function CommonPage() {
  return (
    <Suspense fallback={<Skeleton className="h-screen bg-background" />}>
      <div className="h-full w-full bg-cardbackground rounded-xl shadow-xl p-6">
        <h1 className="font-bold sm:text-6xl text-3xl text-primary tracking-[2px] uppercase animate-in slide-in-from-top-100 duration-1200">
          Multiple Room
        </h1>
        <Content />
      </div>
    </Suspense>
  );
}
