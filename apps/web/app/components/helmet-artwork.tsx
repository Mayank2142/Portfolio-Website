import { Cpu, Cloud, Smartphone, ArrowRight } from 'lucide-react';

export function HelmetArtwork({ detail = false }: { detail?: boolean }) {
  return (
    <figure className={`helmet-artwork ${detail ? 'helmet-detail' : ''}`}>
      <div className="helmet-drawing" aria-hidden="true">
        <svg viewBox="0 0 360 210" fill="none">
          <circle cx="180" cy="110" r="94" stroke="currentColor" opacity=".1" />
          <circle
            cx="180"
            cy="110"
            r="73"
            stroke="currentColor"
            strokeDasharray="3 8"
            opacity=".2"
          />
          <path
            d="M92 132C92 73 127 35 180 35c52 0 88 38 88 91v13h-72l-19 37h-49l-36-44Z"
            fill="currentColor"
            fillOpacity=".05"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M177 80h78c8 14 12 32 13 46h-76l-15-46Z"
            fill="currentColor"
            fillOpacity=".12"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="m96 138 65-8 17 15M129 176l-12-37M135 54c12 10 19 24 21 43"
            stroke="currentColor"
            strokeWidth="2"
          />
          <rect
            x="120"
            y="101"
            width="30"
            height="28"
            rx="5"
            fill="#111c24"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M128 115h14M135 108v14M150 115h30l20-56h36"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="240" cy="59" r="4" fill="currentColor" />
          <path d="M89 191h182" stroke="currentColor" opacity=".2" />
        </svg>
      </div>
      <div className="helmet-pipeline">
        <span>
          <Cpu size={17} /> ESP32
        </span>
        <ArrowRight size={14} />
        <span>
          <Cloud size={17} /> Firebase
        </span>
        <ArrowRight size={14} />
        <span>
          <Smartphone size={17} /> Flutter
        </span>
      </div>
      {detail && (
        <figcaption>
          System illustration · Sensor telemetry, realtime data, and mobile monitoring.
        </figcaption>
      )}
    </figure>
  );
}
