import { Prop } from "@/components/Prop";
//import { ExtendedHop } from "@/types/Ingredient";
import { HopSensoryPanel } from "@prisma/client";
//import { Hop } from "@prisma/client";

export type HopSensoryChartProps = {
  data?: HopSensoryPanel | null;
  size?: number;
};
const flavorNames = {
  sweetAromatic: "Sweet Aromatic",
  berry: "Berry",
  stoneFruit: "Stone Fruit",
  pomme: "Pomme",
  melon: "Melon",
  tropical: "Tropical",
  citrus: "Citrus",
  floral: "Floral",
  herbal: "Herbal",
  vegetal: "Vegetal",
  grassy: "Grassy",
  earthy: "Earthy",
  woody: "Woody",
  spicy: "Spicy",
};
export function HopSensoryChart({ size = 620, data }: HopSensoryChartProps) {
  const midPt = size / 2;
  const radiusIncrement = midPt / 6;
  const radianIncrement = (Math.PI * 2) / Object.keys(flavorNames).length;
  return (
    <div className="text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        stroke="red"
        fill={"black"}
        className="bi bi-google"
        viewBox="-15 -15 650 650"
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <circle
            key={`circle-${i}`}
            className="circles"
            fillOpacity="0"
            strokeWidth="2"
            cx={midPt}
            cy={midPt}
            r={i === 0 ? 5 : i * radiusIncrement}
          ></circle>
        ))}
        {Object.entries(flavorNames).map(([flavor, label], i) => (
          <text
            key={flavor}
            width="200"
            height="auto"
            textAnchor="middle"
            x={295 * Math.sin(i * radianIncrement) + midPt + 5}
            y={285 * Math.cos(i * radianIncrement) + midPt}
          >
            {label}
          </text>
        ))}
      </svg>
      <Prop label="Name">{JSON.stringify(data)}</Prop>
    </div>
  );
}

export default HopSensoryChart;
