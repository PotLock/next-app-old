"use client";
import Header from "@/components/Header";
import { NextUIProvider } from "@nextui-org/react";
import * as React from "react";

export interface ILayoutProvidesProps {
  children: React.ReactNode;
}

export const CartContext = React.createContext<any>(null);

export default function LayoutProvides({ children }: ILayoutProvidesProps) {
  const [cart, setCart] = React.useState<any[]>([]);
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
      <CartContext.Provider value={{ cart, updateCart }}>
        <Header />
        {children}
      </CartContext.Provider>
    </NextUIProvider>
  );
}
