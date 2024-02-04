"use client";
import Header from "@/components/Header";
import DonateSuccessModal from "@/components/Modal/DonateSuccessModal";
import MultiDonateSuccessModal from "@/components/Modal/MultiDonateSuccessModal";
import DonateAgainProvider from "@/contexts/DonateAgainContext";
import WalletProvider from "@/contexts/WalletContext";
import { NextUIProvider } from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode, createContext, useEffect, useState } from "react";

export interface ILayoutProvidesProps {
  children: ReactNode;
}

export const CartContext = createContext<any>(null);

export default function LayoutProvides({ children }: ILayoutProvidesProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const projectsCart: any =
    typeof window !== "undefined" && localStorage?.getItem("projects_in_cart")
      ? JSON?.parse(localStorage?.getItem("projects_in_cart") ?? "")
      : [];

  const [cart, setCart] = useState<any[]>(projectsCart);
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

  const {
    isOpen: isOpenSingleDonate,
    onOpen: onOpenSingleDonate,
    onClose: onCloseSingleDonate,
  } = useDisclosure();
  const {
    isOpen: isOpenMultiDonate,
    onOpen: onOpenMultiDonate,
    onClose: onCloseMultiDonate,
  } = useDisclosure();

  const handleCloseModal = (path: string, donateAgain?: boolean) => {
    onCloseSingleDonate();
    onCloseMultiDonate();
    router.push(path);
    // if (donateAgain) {
    // }
  };

  useEffect(() => {
    if (searchParams && searchParams?.get("transactionHashes")) {
      const searchParamsList = searchParams
        .get("transactionHashes")
        ?.split(",");
      if (searchParamsList && searchParamsList?.length > 1) {
        onOpenMultiDonate();
      } else {
        onOpenSingleDonate();
      }
    }
  }, [onOpenSingleDonate, onOpenMultiDonate, searchParams]);

  return (
    <NextUIProvider>
      <WalletProvider>
        <DonateAgainProvider>
          <CartContext.Provider value={{ cart, updateCart }}>
            <DonateSuccessModal
              isOpen={isOpenSingleDonate}
              onClose={(path: string, donateAgain: boolean) => {
                handleCloseModal(path, donateAgain);
              }}
            />
            <MultiDonateSuccessModal
              isOpen={isOpenMultiDonate}
              onClose={(path: string) => {
                handleCloseModal(path);
              }}
            />
            <Header />
            {children}
          </CartContext.Provider>
        </DonateAgainProvider>
      </WalletProvider>
    </NextUIProvider>
  );
}
