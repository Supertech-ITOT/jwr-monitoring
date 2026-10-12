"use client";

import { createContext, useContext, useState, type ReactNode, type Dispatch, type SetStateAction } from "react";

interface FilterContextType {
  roomCategory: string;
  setRoomCategory: Dispatch<SetStateAction<string>>;
  parameter: string;
  setParameter: Dispatch<SetStateAction<string>>;
  selectedRoom: string;
  setSelectedRoom: Dispatch<SetStateAction<string>>;
}

interface FilterProviderProps {
  children: ReactNode;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: FilterProviderProps): React.JSX.Element => {
  const [roomCategory, setRoomCategory] = useState<string>("+veRoom");
  const [parameter, setParameter] = useState<string>("Temperature");
  const [selectedRoom, setSelectedRoom] = useState<string>("");

  return (
    <FilterContext.Provider
      value={{
        roomCategory,
        setRoomCategory,
        parameter,
        setParameter,
        selectedRoom,
        setSelectedRoom,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = (): FilterContextType => {
  const context = useContext(FilterContext);

  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider");
  }

  return context;
};
