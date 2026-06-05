import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import PowerContent from "./_components/PowerContent";

export const metadata = {
  title: "Power",
};

export default function PowerPage() {
  return (
    <Suspense fallback={<Skeleton className="h-screen bg-background" />}>
      <PowerContent />
    </Suspense>
  );
}
