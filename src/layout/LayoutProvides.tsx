"use client";
import Header from "@/components/Header";
import WalletProvider from "@/contexts/WalletContext";
import { NextUIProvider } from "@nextui-org/react";
import * as React from "react";
import { useDisclosure } from "@nextui-org/react";
import DonateProjectModal from "@/components/Modal/DonateProjectModal";
import DonateSucessModal from "@/components/Modal/DonateSuccessModal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export interface ILayoutProvidesProps {
  children: React.ReactNode;
}

export const CartContext = React.createContext<any>(null);

export default function LayoutProvides({ children }: ILayoutProvidesProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const projectsCart: any =
    typeof window !== "undefined"
      ? ""
      : // ? JSON.parse(localStorage?.getItem("projects_in_cart") ?? "")
        [];

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

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCloseModal = () => {
    router.push(pathname);
    onClose();
  };

  React.useEffect(() => {
    if (searchParams && searchParams?.get("transactionHash")) {
      onOpen();
    }
  }, [onOpen, searchParams]);

  return (
    <NextUIProvider>
      <WalletProvider>
        <CartContext.Provider value={{ cart, updateCart }}>
          <DonateSucessModal isOpen={isOpen} onClose={handleCloseModal} />
          <Header />
          {children}
        </CartContext.Provider>
      </WalletProvider>
    </NextUIProvider>
  );
}
