// Mapa estilizado (não geográfico) da área de cobertura, em SVG puro — sem
// depender de uma API paga de mapas. Mostra Vila Velha em destaque, ligada
// às demais cidades atendidas da Grande Vitória.
const cidades = [
  { nome: "Serra", x: 62, y: 14 },
  { nome: "Vitória", x: 68, y: 42 },
  { nome: "Cariacica", x: 30, y: 46 },
  { nome: "Vila Velha", x: 46, y: 68, destaque: true },
  { nome: "Guarapari", x: 40, y: 92 },
]

export function CoverageMap() {
  const base = cidades.find((c) => c.destaque)!

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-gradient-to-br from-brand-900 to-brand-700 sm:aspect-[16/10]">
      <svg viewBox="0 0 100 100" className="h-full w-full" role="img" aria-label="Mapa da área de cobertura na Grande Vitória">
        {/* Linhas conectando Vila Velha às demais cidades atendidas */}
        {cidades
          .filter((c) => !c.destaque)
          .map((c) => (
            <line
              key={c.nome}
              x1={base.x}
              y1={base.y}
              x2={c.x}
              y2={c.y}
              stroke="white"
              strokeOpacity="0.25"
              strokeWidth="0.6"
              strokeDasharray="2 2"
            />
          ))}

        {cidades.map((c) => (
          <g key={c.nome}>
            {c.destaque && <circle cx={c.x} cy={c.y} r="6" fill="var(--highlight, #ffc107)" opacity="0.25" />}
            <circle cx={c.x} cy={c.y} r={c.destaque ? 3 : 1.8} fill={c.destaque ? "var(--highlight, #ffc107)" : "white"} />
            <text
              x={c.x}
              y={c.y - (c.destaque ? 6 : 4)}
              textAnchor="middle"
              fontFamily="Poppins, sans-serif"
              fontWeight={c.destaque ? 700 : 500}
              fontSize={c.destaque ? 5 : 3.6}
              fill="white"
            >
              {c.nome}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}
