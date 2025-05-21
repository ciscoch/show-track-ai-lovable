import React from "react";

interface GoogleIconProps {
  className?: string;
}

const GoogleIcon = ({ className = "h-4 w-4" }: GoogleIconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M21.35 11.1h-9.17v2.9h5.34c-.23 1.54-.93 2.84-1.98 3.74l3.17 2.46c1.85-1.71 2.91-4.24 2.91-7.2 0-.72-.07-1.41-.2-2.08Z"
      fill="#4285F4"
    />
    <path
      d="M12.18 22c2.65 0 4.88-.88 6.5-2.39l-3.17-2.46c-.88.6-2.01.97-3.33.97-2.55 0-4.71-1.72-5.49-4.04l-3.23 2.5c1.3 3.83 4.89 6.42 9.72 6.42Z"
      fill="#34A853"
    />
    <path
      d="M6.69 14.08a5.96 5.96 0 0 1 0-3.76l-3.23-2.5a9.643 9.643 0 0 0 0 8.76l3.23-2.5Z"
      fill="#FBBC05"
    />
    <path
      d="M12.18 5.83c1.44 0 2.74.49 3.76 1.44l2.82-2.82A9.622 9.622 0 0 0 12.18 2 9.72 9.72 0 0 0 2.97 7.82l3.23 2.5c.78-2.32 2.94-4.04 5.48-4.04Z"
      fill="#EA4335"
    />
  </svg>
);

export default GoogleIcon;
