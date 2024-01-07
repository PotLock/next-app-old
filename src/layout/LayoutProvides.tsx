"use client"
import { NextUIProvider } from '@nextui-org/react';
import * as React from 'react';

export interface ILayoutProvidesProps {
  children: React.ReactNode
}

export default function LayoutProvides ({children}: ILayoutProvidesProps) {
  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  );
}
