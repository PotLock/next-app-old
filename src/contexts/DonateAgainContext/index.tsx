"use client";

import { ReactNode, createContext, useState } from "react";

export const DonateAgainContext = createContext<any>(null);

export default function DonateAgainProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [donateAgain, setDonateAgain] = useState<boolean>(false);

  return (
    <DonateAgainContext.Provider value={{ donateAgain, setDonateAgain }}>
      {children}
    </DonateAgainContext.Provider>
  );
}
