import { ComponentProps } from "react";

export function GoogleSheetsIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="6 2615 30 40"
      {...props}
    >
      <defs>
        <path
          id="a"
          d="m24 2616 9 9v24.5a2.5 2.5 0 0 1-2.5 2.5h-21a2.5 2.5 0 0 1-2.5-2.5v-31a2.5 2.5 0 0 1 2.5-2.5H24Z"
        />
        <path
          id="b"
          d="M9.5 2651.5h21a2.5 2.5 0 0 0 2.5-2.5v.5a2.5 2.5 0 0 1-2.5 2.5h-21a2.5 2.5 0 0 1-2.5-2.5v-.5c.75 1.67 1.58 2.5 2.5 2.5Z"
        />
        <path
          id="c"
          d="M24 2616v.5H9.5A2.5 2.5 0 0 0 7 2619v-.5a2.5 2.5 0 0 1 2.5-2.5H24Z"
        />
        <path id="d" d="m24.5 2624 8.5 8.5v-7.5" />
        <path id="f" d="M33 2625h-6.5a2.5 2.5 0 0 1-2.5-2.5v-6.5l9 9Z" />
        <path
          id="g"
          d="M27 2632v14H13v-14h14Zm-12 4h4v-2h-4v2Zm0 4h4v-2h-4v2Zm0 4h4v-2h-4v2Zm6-8h4v-2h-4v2Zm0 4h4v-2h-4v2Zm0 4h4v-2h-4v2Z"
        />
        <path
          id="h"
          d="m24 2616 9 9v24.5a2.5 2.5 0 0 1-2.5 2.5h-21a2.5 2.5 0 0 1-2.5-2.5v-31a2.5 2.5 0 0 1 2.5-2.5H24Z"
        />
        <radialGradient
          id="i"
          cx={7.82}
          cy={2616.71}
          r={17.3}
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0%"
            style={{
              stopColor: "#fff",
              stopOpacity: 0.1,
            }}
          />
          <stop
            offset="100%"
            style={{
              stopColor: "#fff",
              stopOpacity: 0,
            }}
          />
        </radialGradient>
        <linearGradient
          id="e"
          x1={28.75}
          x2={28.75}
          y1={2624.73}
          y2={2632.5}
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0%"
            style={{
              stopColor: "#1a237e",
              stopOpacity: 0.2,
            }}
          />
          <stop
            offset="100%"
            style={{
              stopColor: "#1a237e",
              stopOpacity: 0.02,
            }}
          />
        </linearGradient>
      </defs>
      <use xlinkHref="#a" fill="#0f9d58" />
      <use xlinkHref="#a" fillOpacity={0} stroke="#000" strokeOpacity={0} />
      <use xlinkHref="#b" fill="#263238" fillOpacity={0.1} />
      <use xlinkHref="#b" fillOpacity={0} stroke="#000" strokeOpacity={0} />
      <use xlinkHref="#c" fill="#fff" fillOpacity={0.2} />
      <use xlinkHref="#c" fillOpacity={0} stroke="#000" strokeOpacity={0} />
      <use xlinkHref="#d" fill="url(#e)" />
      <use xlinkHref="#d" fillOpacity={0} stroke="#000" strokeOpacity={0} />
      <use xlinkHref="#f" fill="#87ceac" />
      <use xlinkHref="#f" fillOpacity={0} stroke="#000" strokeOpacity={0} />
      <use xlinkHref="#g" fill="#f1f1f1" />
      <use xlinkHref="#g" fillOpacity={0} stroke="#000" strokeOpacity={0} />
      <use xlinkHref="#h" fill="url(#i)" />
      <use xlinkHref="#h" fillOpacity={0} stroke="#000" strokeOpacity={0} />
    </svg>
  );
}
