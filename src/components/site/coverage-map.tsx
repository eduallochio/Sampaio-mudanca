// Contorno real do Brasil (projeção geoMercator, resolução 110m via
// world-atlas/d3-geo, extraído uma única vez — ver instrução no fim do
// arquivo para regenerar). Vila Velha/ES marcada como a base da empresa,
// já que a Sampaio atende mudanças interestaduais para todo o país.
const BRAZIL_VIEWBOX = "0 0 300 300"
const BRAZIL_PATH =
  "M156.806,292L154.893,287.323L157.923,283.426L153.949,277.867L148.535,273.375L141.431,268.202L138.873,268.447L131.943,262.254L127.472,263.105L136.662,252.286L144.461,244.682L149.081,241.504L154.893,237.224L155.042,231.063L151.59,226.639L148.162,228.116L149.503,223.706L150.447,219.201L150.447,215.037L147.963,213.67L145.38,214.896L142.822,214.564L142.002,211.655L141.356,204.785L140.065,202.548L135.42,200.53L132.588,201.993L125.311,200.568L125.758,190.507L123.721,186.407L125.882,184.89L125.212,180.71L127.124,177.508L128.341,171.78L126.702,167.277L122.951,165.245L122.206,162.399L123.224,158.232L109.986,157.94L107.328,149.595L109.34,149.474L109.265,146.393L107.899,144.319L107.601,140.202L103.602,138.099L99.256,138.171L96.399,136.106L91.73,134.704L89.022,132.069L81.298,130.897L73.797,124.581L74.368,119.866L73.523,117.168L74.244,111.913L65.227,113.098L61.576,115.732L55.541,118.57L54.001,120.699L50.449,120.853L45.332,120.259L41.433,121.472L38.303,120.663L38.75,110.006L33.087,114.13L27.002,113.952L24.394,110.219L19.823,109.817L21.289,106.811L17.439,102.57L14.583,96.297L16.396,95.025L16.396,92.083L20.569,90.072L19.873,86.324L21.637,83.905L22.133,80.679L30.032,75.967L35.67,74.632L36.589,73.589L42.823,73.917L45.928,54.973L46.077,51.982L45.009,48.023L41.954,45.513L41.979,40.491L45.854,39.358L47.245,40.071L47.468,37.431L43.444,36.719L43.345,32.397L56.783,32.549L59.068,30.177L60.98,32.362L62.346,36.439L63.638,35.586L67.438,39.23L72.803,38.786L74.144,36.672L79.261,35.06L82.117,33.927L82.912,31.006L87.83,29.043L87.458,27.594L81.621,26.998L80.652,22.649L80.95,18.016L77.845,16.225L79.137,15.581L84.253,16.471L89.743,18.203L91.73,16.564L96.697,15.487L104.397,12.899L106.931,10.263L106.012,8.305L109.613,8L111.203,9.595L110.309,12.63L112.693,13.684L114.258,16.892L112.345,19.338L111.253,25.209L113.016,28.704L113.513,31.906L117.76,35.142L121.163,35.481L121.908,34.126L124.094,33.834L127.223,32.619L129.459,30.784L133.284,31.369L134.948,31.123L138.699,31.684L139.32,30.282L138.177,28.903L138.873,26.904L141.654,27.524L144.908,26.811L148.857,28.272L151.863,29.698L153.999,27.828L155.539,28.12L156.483,30.06L159.786,29.569L162.444,26.951L164.555,21.853L168.629,15.534L170.988,15.206L172.702,19.034L176.552,31.112L180.253,32.245L180.427,37.011L175.26,42.698L177.396,44.777L189.592,45.851L189.84,52.777L195.081,48.245L203.75,50.721L215.225,54.938L218.578,58.98L217.46,62.802L225.483,60.675L238.896,64.334L249.203,64.065L259.412,69.785L268.229,77.537L273.545,79.53L279.431,79.811L281.94,81.992L284.275,90.824L285.417,95.037L282.685,106.563L279.158,111.119L269.447,120.877L265.05,128.841L259.934,134.979L258.22,135.111L256.282,140.334L256.779,153.701L254.867,164.781L254.121,169.557L251.936,172.419L250.719,182.172L243.714,191.769L242.547,199.421L236.958,202.649L235.344,207.142L227.843,207.116L216.988,210L212.145,213.351L204.42,215.561L196.298,221.592L190.461,229.166L189.443,234.908L190.586,239.177L189.319,247.05L187.754,250.888L182.911,255.225L175.26,269.264L169.2,275.666L164.505,279.481L161.351,287.282Z"

// Posição projetada de Vila Velha/ES (-40.2925, -20.3297) no mesmo viewBox.
const VILA_VELHA = { x: 247.05, y: 187.53 }

export function CoverageMap() {
  return (
    <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-xl border border-border bg-background sm:aspect-[4/3]">
      <svg viewBox={BRAZIL_VIEWBOX} className="h-full w-full" role="img" aria-label="Mapa do Brasil com Vila Velha/ES em destaque">
        <path
          d={BRAZIL_PATH}
          fill="url(#brazil-gradient)"
          stroke="white"
          strokeOpacity="0.3"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id="brazil-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--brand-900, #0d47a1)" />
            <stop offset="1" stopColor="var(--brand-700, #1976d2)" />
          </linearGradient>
        </defs>

        <circle cx={VILA_VELHA.x} cy={VILA_VELHA.y} r="10" fill="var(--highlight, #ffc107)" opacity="0.3" />
        <circle cx={VILA_VELHA.x} cy={VILA_VELHA.y} r="4" fill="var(--highlight, #ffc107)" />
        <text
          x={VILA_VELHA.x}
          y={VILA_VELHA.y - 12}
          textAnchor="middle"
          fontFamily="Poppins, sans-serif"
          fontWeight="700"
          fontSize="10"
          fill="white"
        >
          Vila Velha/ES
        </text>
      </svg>
    </div>
  )
}

/*
 * Para regenerar BRAZIL_PATH (ex: trocar de resolução):
 *   npm i -D d3-geo topojson-client world-atlas
 *   node -e '
 *     const { readFileSync } = require("node:fs")
 *     const { feature } = require("topojson-client")
 *     const { geoMercator, geoPath } = require("d3-geo")
 *     const topo = JSON.parse(readFileSync("node_modules/world-atlas/countries-110m.json"))
 *     const geo = feature(topo, topo.objects.countries)
 *     const brazil = geo.features.find((f) => f.id === "076")
 *     const projection = geoMercator().fitExtent([[8,8],[292,292]], brazil)
 *     console.log(geoPath(projection)(brazil))
 *     console.log(projection([-40.2925, -20.3297])) // Vila Velha/ES
 *   '
 *   npm uninstall d3-geo topojson-client world-atlas
 */
