"use client";

import type { ReactNode } from "react";
import { SidebarProvider } from "./ui/sidebar";

type SidebarStateBridgeProps = {
  defaultOpen?: boolean;
  children: ReactNode;
};

export default function SidebarStateBridge({ defaultOpen = true, children }: SidebarStateBridgeProps): React.JSX.Element {
  return <SidebarProvider defaultOpen={defaultOpen}>{children}</SidebarProvider>;
}
