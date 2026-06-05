import { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import CategoryContent from "./_components/CategoryPage";

export const metadata = {
  title: "Category",
};

export default function CategoryPage() {
  return (
    <Suspense fallback={<Skeleton className="h-screen bg-background" />}>
      <CategoryContent />
    </Suspense>
  );
}
