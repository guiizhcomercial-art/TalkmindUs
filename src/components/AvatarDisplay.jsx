import React from "react";

export default function AvatarDisplay({ config, size = 160 }) {
  const { gender, skin, hair, outfit, accessories } = config;

  return (
    <div
      className="flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Skin / Face */}
        <circle cx="100" cy="80" r="40" fill={skin} />

        {/* Hair */}
        {hair === "short" && (
          <path
            d="M60 70 Q100 20 140 70"
            fill={skin}
            stroke="#000"
            strokeWidth="6"
          />
        )}

        {hair === "long" && (
          <path
            d="M55 60 Q100 10 145 60 L145 130 Q100 170 55 130Z"
            fill="#1a1a1a"
          />
        )}

        {/* Outfit */}
        <rect
          x="60"
          y="120"
          width="80"
          height="60"
          rx="20"
          fill={outfit}
        />

        {/* Accessories */}
        {accessories.includes("glasses") && (
          <>
            <circle cx="80" cy="80" r="14" stroke="#fff" strokeWidth="3" />
            <circle cx="120" cy="80" r="14" stroke="#fff" strokeWidth="3" />
            <line x1="94" y1="80" x2="106" y2="80" stroke="#fff" strokeWidth="3" />
          </>
        )}

        {accessories.includes("earring") && (
          <circle cx="138" cy="100" r="6" fill="#ffd700" />
        )}
      </svg>
    </div>
  );
}