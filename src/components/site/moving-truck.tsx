// Animação leve em SVG + CSS puro (sem dependência externa) de um caminhão-baú
// em movimento, para a seção "Conheça a Sampaio". Desliga sozinha com
// prefers-reduced-motion (ver globals.css).
export function MovingTruck() {
  return (
    <div className="truck-scene relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-gradient-to-b from-brand-900 to-brand-700 sm:aspect-[16/10]">
      {/* Céu com "nuvens" simples */}
      <div className="truck-cloud truck-cloud-1" aria-hidden="true" />
      <div className="truck-cloud truck-cloud-2" aria-hidden="true" />

      {/* Estrada */}
      <div className="absolute right-0 bottom-0 left-0 h-[22%] bg-[#1a1a1a]">
        <div className="truck-road-line absolute top-1/2 h-1 w-full -translate-y-1/2" />
      </div>

      {/* Caminhão */}
      <div className="truck-bounce absolute bottom-[17%] left-1/2 w-[86%] -translate-x-1/2 sm:w-[74%]">
        <svg viewBox="0 0 220 110" className="w-full drop-shadow-lg" role="img" aria-label="Caminhão de mudança em movimento">
          {/* Baú */}
          <rect x="6" y="18" width="118" height="62" rx="4" fill="#f5f5f5" />
          <rect x="6" y="18" width="118" height="62" rx="4" fill="none" stroke="#c9c9c9" strokeWidth="2" />
          <rect x="16" y="30" width="98" height="3" fill="#e0e0e0" />
          <rect x="16" y="45" width="98" height="3" fill="#e0e0e0" />
          <rect x="16" y="60" width="98" height="3" fill="#e0e0e0" />
          {/* Logo estilizada no baú */}
          <text x="65" y="55" textAnchor="middle" fontFamily="Poppins, sans-serif" fontWeight="700" fontSize="13" fill="var(--brand-900, #0d47a1)">
            SAMPAIO
          </text>

          {/* Cabine */}
          <path d="M124 44 h34 a8 8 0 0 1 8 8 v28 h-42 z" fill="var(--brand-700, #1976d2)" />
          <path d="M132 44 h20 a6 6 0 0 1 6 6 v10 h-26 z" fill="#bde3ff" />
          <rect x="124" y="72" width="42" height="8" fill="var(--brand-900, #0d47a1)" />

          {/* Para-choque e detalhes */}
          <rect x="6" y="80" width="160" height="6" rx="2" fill="#333" />
          <circle cx="160" cy="86" r="3" fill="var(--highlight, #ffc107)" />

          {/* Rodas */}
          <g className="truck-wheel" style={{ transformOrigin: "34px 88px" }}>
            <circle cx="34" cy="88" r="14" fill="#222" />
            <circle cx="34" cy="88" r="6" fill="#888" />
          </g>
          <g className="truck-wheel" style={{ transformOrigin: "150px 88px" }}>
            <circle cx="150" cy="88" r="14" fill="#222" />
            <circle cx="150" cy="88" r="6" fill="#888" />
          </g>

          {/* Fumacinha do escapamento */}
          <circle className="truck-smoke truck-smoke-1" cx="2" cy="70" r="4" fill="#ddd" />
          <circle className="truck-smoke truck-smoke-2" cx="2" cy="70" r="3" fill="#ddd" />
          <circle className="truck-smoke truck-smoke-3" cx="2" cy="70" r="5" fill="#ddd" />
        </svg>
      </div>
    </div>
  )
}
