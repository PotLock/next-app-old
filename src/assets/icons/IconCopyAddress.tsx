import * as React from "react";

export interface IIconCopyAddressProps {
  onClick: () => void;
}

export default function IconCopyAddress({ onClick }: IIconCopyAddressProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="16"
      viewBox="0 0 15 16"
      fill="none"
      className="cursor-pointer transition-transform transform group hover:scale-110 focus:scale-110 active:scale-110"
      onClick={onClick}
    >
      <path
        d="M7.11232 2.10745L4.75529 4.46448L5.9338 5.64299L8.29083 3.28597C9.2631 2.31369 10.8541 2.31369 11.8264 3.28597C12.7986 4.25824 12.7986 5.84923 11.8264 6.8215L9.46934 9.17852L10.6479 10.357L13.0049 8.00001C14.6312 6.37367 14.6312 3.7338 13.0049 2.10745C11.3785 0.481109 8.73866 0.481109 7.11232 2.10745ZM8.29083 10.357L5.9338 12.7141C4.96153 13.6863 3.37054 13.6863 2.39827 12.7141C1.426 11.7418 1.426 10.1508 2.39827 9.17852L4.75529 6.8215L3.57678 5.64299L1.21976 8.00001C-0.406586 9.62636 -0.406586 12.2662 1.21976 13.8926C2.8461 15.5189 5.48597 15.5189 7.11232 13.8926L9.46934 11.5355L8.29083 10.357ZM4.16604 9.76778L8.88008 5.05373L10.0586 6.23224L5.34455 10.9463L4.16604 9.76778Z"
        fill="#7B7B7B"
      />
    </svg>
  );
}
