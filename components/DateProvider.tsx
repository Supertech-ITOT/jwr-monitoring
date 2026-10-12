"use client";

import type { ReactNode } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

type DateProviderProps = {
  children: ReactNode;
};

export default function DateProvider({ children }: DateProviderProps): React.JSX.Element {
  return <LocalizationProvider dateAdapter={AdapterDayjs}>{children}</LocalizationProvider>;
}
