import * as React from "react";

export interface IIconSuccessfulProps {}

export default function IconSuccessful(props: IIconSuccessfulProps) {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_i_5679_15912)">
        <rect
          width="64"
          height="64"
          rx="32"
          fill="url(#paint0_radial_5679_15912)"
        />
        <g filter="url(#filter1_dd_5679_15912)">
          <path
            d="M27.385 37.87L21.13 31.615L19 33.73L27.385 42.115L45.385 24.115L43.27 22L27.385 37.87Z"
            fill="white"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_i_5679_15912"
          x="0"
          y="0"
          width="64"
          height="64"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_5679_15912"
          />
        </filter>
        <filter
          id="filter1_dd_5679_15912"
          x="16"
          y="17.5"
          width="34.3848"
          height="29.6152"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="2" dy="2" />
          <feGaussianBlur stdDeviation="1.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.325192 0 0 0 0 0.0548077 0 0 0 0 0.0822115 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_5679_15912"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="-1.5" />
          <feGaussianBlur stdDeviation="1.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.971292 0 0 0 0 0.828708 0 0 0 0 0.844019 0 0 0 0.45 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_5679_15912"
            result="effect2_dropShadow_5679_15912"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow_5679_15912"
            result="shape"
          />
        </filter>
        <radialGradient
          id="paint0_radial_5679_15912"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(32 1.5) rotate(90) scale(62.5)"
        >
          <stop stop-color="#E84A5B" />
          <stop offset="1" stop-color="#C02031" />
        </radialGradient>
      </defs>
    </svg>
  );
}
