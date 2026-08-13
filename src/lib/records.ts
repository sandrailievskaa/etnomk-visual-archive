import record1 from "@/assets/record-1.jpg";
import record2 from "@/assets/record-2.jpg";
import record3 from "@/assets/record-3.jpg";
import record4 from "@/assets/record-4.jpg";

export type EtnoRecord = {
  id: string;
  title: string;
  region: string;
  category: string;
  material: string;
  technique: string;
  period: string;
  inventory: string;
  description: string;
  image: string;
};

export const REGIONS = [
  "Kumanovo",
  "Ohrid",
  "Miyak (Debar)",
  "Skopska Blatija",
  "Mariovo",
  "Strumica",
];

export const CATEGORIES = ["Garment", "Carpet / Rug", "Ornament", "Textile fragment"];

export const MATERIALS = ["Linen", "Wool", "Cotton", "Silk", "Metal thread"];

export const TECHNIQUES = ["Cross-stitch", "Satin stitch", "Kilim weave", "Gold couching"];

export const RECORDS: EtnoRecord[] = [
  {
    id: "km-0142",
    title: "Women's chemise with shoulder embroidery",
    region: "Kumanovo",
    category: "Garment",
    material: "Linen",
    technique: "Cross-stitch",
    period: "Late 19th century",
    inventory: "EMK-KM-0142",
    description:
      "A hand-woven linen chemise with dense crimson cross-stitch across the shoulders and central placket. The floral-geometric repeat is characteristic of the Kumanovo plain, where deep madder red dominates the palette and white ground is left deliberately open.",
    image: record1,
  },
  {
    id: "mr-0088",
    title: "Woollen kilim with diamond field",
    region: "Mariovo",
    category: "Carpet / Rug",
    material: "Wool",
    technique: "Kilim weave",
    period: "Early 20th century",
    inventory: "EMK-MR-0088",
    description:
      "A flat-woven wool rug organised around three columns of stepped diamonds. Natural dyes give the field its saturated wine tone; the black outlining and ochre accents mark a workshop tradition documented across the Mariovo highlands.",
    image: record2,
  },
  {
    id: "my-0231",
    title: "Gold-couched rosette from a ceremonial apron",
    region: "Miyak (Debar)",
    category: "Ornament",
    material: "Metal thread",
    technique: "Gold couching",
    period: "c. 1910",
    inventory: "EMK-MY-0231",
    description:
      "A single rosette worked in couched metal thread on black wool, taken from a bridal apron of the Miyak region. The raised relief of the petals is achieved by padding the ground before the gold is laid and stitched down.",
    image: record3,
  },
  {
    id: "sb-0057",
    title: "Sleeve panel with lattice border",
    region: "Skopska Blatija",
    category: "Textile fragment",
    material: "Cotton",
    technique: "Satin stitch",
    period: "Mid 20th century",
    inventory: "EMK-SB-0057",
    description:
      "A detached sleeve panel showing a lattice motif framed by a scalloped border. The piece was catalogued as a study fragment and is used as a reference sample for patch-level embedding comparisons.",
    image: record4,
  },
  {
    id: "oh-0019",
    title: "Black-ground festive vest",
    region: "Ohrid",
    category: "Garment",
    material: "Wool",
    technique: "Gold couching",
    period: "Late 19th century",
    inventory: "EMK-OH-0019",
    description:
      "A short festive vest on black wool with restrained gold ornament along the front edges, typical of the Ohrid lakeside tradition where dark grounds prevail over the crimson of the eastern regions.",
    image: record3,
  },
  {
    id: "st-0104",
    title: "Household runner with zigzag bands",
    region: "Strumica",
    category: "Carpet / Rug",
    material: "Wool",
    technique: "Kilim weave",
    period: "Early 20th century",
    inventory: "EMK-ST-0104",
    description:
      "A narrow household runner built from alternating zigzag bands. The rhythm of the bands is repeated at three scales, a structure that shows clearly in patch-level embedding maps.",
    image: record2,
  },
  {
    id: "km-0177",
    title: "Bridal shirt hem, crimson repeat",
    region: "Kumanovo",
    category: "Garment",
    material: "Linen",
    technique: "Cross-stitch",
    period: "c. 1890",
    inventory: "EMK-KM-0177",
    description:
      "The embroidered hem of a bridal shirt, worked in a single crimson thread over counted linen ground. Wear along the lower edge indicates the garment was used rather than kept as a dowry piece.",
    image: record4,
  },
  {
    id: "my-0245",
    title: "Chest panel with rosette cluster",
    region: "Miyak (Debar)",
    category: "Ornament",
    material: "Silk",
    technique: "Satin stitch",
    period: "c. 1920",
    inventory: "EMK-MY-0245",
    description:
      "Silk satin stitch forming a cluster of rosettes around a central medallion. Documented during the 2024 field campaign and digitised at 600 dpi for embedding extraction.",
    image: record1,
  },
];

export function getRecord(id: string) {
  return RECORDS.find((record) => record.id === id);
}
