import { useId } from "react";
import type { Product } from "@/data/menu";
export function CoffeeArt({
  kind = "latte",
  hero = false,
}: {
  kind?: Product["art"];
  hero?: boolean;
}) {
  const id = useId().replace(/:/g, "");
  if (kind === "croissant")
    return (
      <svg viewBox="0 0 400 320" className="coffee-art" aria-hidden="true">
        <defs>
          <linearGradient id={id} x2=".6" y2="1">
            <stop stopColor="#edbc6b" />
            <stop offset="1" stopColor="#9e541f" />
          </linearGradient>
        </defs>
        <ellipse
          cx="200"
          cy="238"
          rx="134"
          ry="27"
          fill="#422a1a"
          opacity=".12"
        />
        <path
          d="M68 218 Q28 112 132 114 Q196 58 269 119 Q370 112 335 219 L282 202 Q285 164 257 174 Q201 148 148 175 Q104 164 117 204Z"
          fill={`url(#${id})`}
          stroke="#b27636"
          strokeWidth="3"
        />
        {[125, 162, 205, 248, 285].map((x, i) => (
          <path
            key={x}
            d={`M${x} ${i === 0 || i === 4 ? 127 : 100} Q${x - 22} 152 ${x + 7} 189`}
            fill="none"
            stroke="#79411e"
            strokeWidth="7"
            opacity=".5"
          />
        ))}
        <path
          d="M79 149 Q65 169 84 203 M318 154 Q336 180 321 205"
          fill="none"
          stroke="#f6d194"
          strokeWidth="9"
          strokeLinecap="round"
        />
      </svg>
    );
  if (kind === "iced")
    return (
      <svg viewBox="0 0 400 320" className="coffee-art" aria-hidden="true">
        <defs>
          <linearGradient id={id} x1="0" y1="1" x2="0" y2="0">
            <stop stopColor="#e2c6a1" />
            <stop offset=".6" stopColor="#c49d72" />
            <stop offset=".8" stopColor="#6b3821" />
            <stop offset="1" stopColor="#af794d" />
          </linearGradient>
        </defs>
        <ellipse
          cx="201"
          cy="267"
          rx="83"
          ry="15"
          fill="#3a271a"
          opacity=".12"
        />
        <path
          d="M130 69 H272 L253 257 Q201 275 149 257Z"
          fill={`url(#${id})`}
          stroke="#fcf0d8"
          strokeWidth="4"
        />
        {[
          [150, 95],
          [205, 88],
          [176, 132],
          [227, 135],
        ].map(([x, y]) => (
          <rect
            key={x}
            x={x}
            y={y}
            width="31"
            height="29"
            rx="5"
            fill="#eadcca"
            fillOpacity=".58"
            transform={`rotate(12 ${x} ${y})`}
          />
        ))}
        <path
          d="M230 110 L258 30"
          stroke="#595438"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M141 83 L158 247"
          stroke="white"
          opacity=".4"
          strokeWidth="5"
        />
      </svg>
    );
  const green = kind === "matcha";
  const dark = kind === "espresso" || kind === "filter";
  return (
    <svg
      viewBox="0 0 400 320"
      className={`coffee-art ${hero ? "hero-art" : ""}`}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`${id}-s`}>
          <stop stopColor="#fffcf3" />
          <stop offset=".8" stopColor="#e2dacb" />
          <stop offset="1" stopColor="#c9bca6" />
        </radialGradient>
        <radialGradient id={`${id}-c`} cx=".4" cy=".35">
          <stop stopColor={green ? "#99aa64" : dark ? "#955c2e" : "#c38a4b"} />
          <stop offset=".8" stopColor={green ? "#657b37" : "#8e542d"} />
          <stop offset="1" stopColor={green ? "#4d6326" : "#5e321e"} />
        </radialGradient>
        <filter
          id={`${id}-shadow`}
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feDropShadow
            dx="7"
            dy="14"
            stdDeviation="12"
            floodColor="#3b2416"
            floodOpacity=".24"
          />
        </filter>
      </defs>
      <g filter={`url(#${id}-shadow)`}>
        <ellipse cx="196" cy="179" rx="137" ry="112" fill={`url(#${id}-s)`} />
        <ellipse
          cx="195"
          cy="178"
          rx="109"
          ry="89"
          fill="none"
          stroke="#c8bdac"
          strokeWidth="2"
        />
        <path
          d="M291 137 C353 120 357 201 298 205"
          fill="none"
          stroke="#ede3d1"
          strokeWidth="21"
        />
        <ellipse cx="195" cy="163" rx="102" ry="86" fill="#f9f0de" />
        <ellipse cx="195" cy="162" rx="91" ry="76" fill={`url(#${id}-c)`} />
        {!dark && (
          <g fill="#f6e8cc" transform="translate(195 155) rotate(-20)">
            <path d="M0 49 C-83 2 -48 -63 -7 -22 C12 -66 72 -21 0 49Z" />
            <path
              d="M0 34 C-58 4 -35 -37 -4 -10 C12 -43 53 -11 0 34Z"
              fill={green ? "#829450" : "#b78149"}
            />
            <path d="M0 24 C-38 3 -22 -23 -2 -4 C12 -25 36 -7 0 24Z" />
            <path
              d="M1 36 L5 -22"
              stroke="#f7edd9"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </g>
        )}
        {dark && (
          <ellipse
            cx="173"
            cy="135"
            rx="43"
            ry="25"
            fill="#d6a25d"
            opacity=".4"
          />
        )}
      </g>
    </svg>
  );
}
