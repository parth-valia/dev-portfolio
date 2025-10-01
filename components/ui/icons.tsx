import React from 'react';

type IconProps = {
  className?: string;
};

// X (Twitter) logo
export function IconXLogo({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        d="M18.244 2H21l-6.46 7.39L22 22h-6.873l-4.79-6.263L4.8 22H2l6.93-7.926L2 2h6.99l4.38 5.77L18.244 2Zm-1.2 18h2.045L7.03 4h-2.09l12.104 16Z"
      />
    </svg>
  );
}


