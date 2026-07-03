"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import Content from "./Content";

export default function CategoryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoryId = Number(searchParams.get("categoryId"));
  const roomId = Number(searchParams.get("roomId"));

  useEffect(() => {
    if (!categoryId || !roomId) {
      router.replace("/Category?categoryId=1&roomId=1");
    }
  }, [categoryId, roomId, router]);

  if (!categoryId || !roomId) {
    return null;
  }

  return (
    <div className="h-full w-full bg-cardbackground rounded-xl shadow-xl p-6">
      <h1 className="font-bold sm:text-6xl text-3xl text-primary tracking-[2px] uppercase animate-in slide-in-from-top-100 duration-1200">
        Single Room
      </h1>

      <Content categoryId={categoryId} roomId={roomId} />
    </div>
  );
}
