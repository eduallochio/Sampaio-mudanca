import { BRAZIL_STATES, BRAZIL_VIEWBOX } from "@/content/brazil-states"

// Estados onde a Sampaio já realizou mudanças interestaduais.
const ESTADOS_ATENDIDOS = new Set(["sp", "rj", "mg", "df", "ba"])

// Centroide aproximado do Espírito Santo no viewBox do mapa, para o marcador
// da sede em Vila Velha (calculado a partir do bounding box do path de "es").
const VILA_VELHA = { x: 518.9, y: 392.1 }

export function CoverageMap() {
  return (
    <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-xl border border-border bg-background sm:aspect-[4/3]">
      <svg viewBox={BRAZIL_VIEWBOX} className="h-full w-full" role="img" aria-label="Mapa do Brasil: São Paulo, Rio de Janeiro, Minas Gerais, Distrito Federal e Bahia já atendidos; Vila Velha/ES em destaque como sede.">
        {BRAZIL_STATES.map((state) => {
          const atendido = ESTADOS_ATENDIDOS.has(state.id)
          return (
            <path
              key={state.id}
              d={state.path}
              fill={atendido ? "var(--highlight, #ffc107)" : "var(--brand-700, #1976d2)"}
              fillOpacity={atendido ? 0.85 : 0.55}
              stroke="white"
              strokeOpacity="0.35"
              strokeWidth="1"
              strokeLinejoin="round"
              className={atendido ? "map-state-highlight" : undefined}
            >
              <title>{atendido ? `${state.name} — já atendido` : state.name}</title>
            </path>
          )
        })}

        <circle cx={VILA_VELHA.x} cy={VILA_VELHA.y} r="10" fill="var(--whatsapp, #25d366)" opacity="0.35" />
        <circle cx={VILA_VELHA.x} cy={VILA_VELHA.y} r="4" fill="var(--whatsapp, #25d366)" stroke="white" strokeWidth="1" />
        <text
          x={VILA_VELHA.x}
          y={VILA_VELHA.y - 14}
          textAnchor="middle"
          fontFamily="Poppins, sans-serif"
          fontWeight="700"
          fontSize="16"
          fill="white"
          stroke="var(--background, #2f2f2f)"
          strokeWidth="3"
          paintOrder="stroke"
        >
          Vila Velha/ES
        </text>
      </svg>

      <div className="absolute bottom-3 left-3 flex flex-wrap gap-x-4 gap-y-1 rounded-md bg-black/40 px-3 py-2 text-xs text-white backdrop-blur-sm">
        <span className="flex items-center gap-1.5">
          <span className="inline-block size-2.5 rounded-full bg-whatsapp" /> Sede
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block size-2.5 rounded-full bg-highlight" /> Já atendido
        </span>
      </div>
    </div>
  )
}
