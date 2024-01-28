"use client";
import Header from "@/components/Header";
import WalletProvider from "@/contexts/WalletContext";
import { NextUIProvider } from "@nextui-org/react";
import * as React from "react";

export interface ILayoutProvidesProps {
  children: React.ReactNode;
}

export const CartContext = React.createContext<any>(null);

export default function LayoutProvides({ children }: ILayoutProvidesProps) {
  const projectsCart: any =
    typeof window !== "undefined"
      ? JSON?.parse(localStorage?.getItem("projects_in_cart") ?? "")
      : [];

  const [cart, setCart] = React.useState<any[]>(projectsCart);
  const updateCart = (data: any) => {
    if (!cart.length) {
      setCart([...cart, data]);
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "projects_in_cart",
          JSON.stringify([...cart, data]),
        );
      }
    } else {
      if (!cart.find((item) => item.id === data.id)) {
        setCart([...cart, data]);
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "projects_in_cart",
            JSON.stringify([...cart, data]),
          );
        }
      }
    }
  };
  return (
    <NextUIProvider>
      <WalletProvider>
        <CartContext.Provider value={{ cart, updateCart }}>
          <Header />
          {children}
        </CartContext.Provider>
      </WalletProvider>
    </NextUIProvider>
  );
}
