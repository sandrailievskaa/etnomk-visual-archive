import record1 from "@/assets/record-1.jpg";
import record2 from "@/assets/record-2.jpg";
import record3 from "@/assets/record-3.jpg";
import record4 from "@/assets/record-4.jpg";
import type { Locale } from "./i18n/locale";
import {
  REGIONS,
  CATEGORIES,
  MATERIALS,
  TECHNIQUES,
  type RegionSlug,
  type CategorySlug,
  type MaterialSlug,
  type TechniqueSlug,
} from "./i18n/vocab";

export { REGIONS, CATEGORIES, MATERIALS, TECHNIQUES };
export type { RegionSlug, CategorySlug, MaterialSlug, TechniqueSlug };

export type LocalizedText = Record<Locale, string>;

export type EtnoRecord = {
  id: string;
  title: LocalizedText;
  region: RegionSlug;
  category: CategorySlug;
  material: MaterialSlug;
  technique: TechniqueSlug;
  period: LocalizedText;
  inventory: string;
  description: LocalizedText;
  image: string;
};

export function localize(text: LocalizedText, locale: Locale): string {
  return text[locale];
}

export const RECORDS: EtnoRecord[] = [
  {
    id: "km-0142",
    title: {
      en: "Women's chemise with shoulder embroidery",
      mk: "Женска кошула со везени рамења",
      sq: "Këmishë grash me qëndisje në supe",
    },
    region: "kumanovo",
    category: "garment",
    material: "linen",
    technique: "cross-stitch",
    period: { en: "Late 19th century", mk: "Крај на 19 век", sq: "Fundi i shekullit XIX" },
    inventory: "EMK-KM-0142",
    description: {
      en: "A hand-woven linen chemise with dense crimson cross-stitch across the shoulders and central placket. The floral-geometric repeat is characteristic of the Kumanovo plain, where deep madder red dominates the palette and white ground is left deliberately open.",
      mk: "Рачно ткаена ленена кошула со густ темноцрвен крстест бод на рамењата и на средниот прорез. Цветно-геометриското повторување е карактеристично за кумановската рамнина, каде длабоката темноцрвена боја доминира во палетата, а белата основа е намерно оставена отворена.",
      sq: "Këmishë prej liri e endur me dorë, me qëndisje të dendur me pikë kryq në ngjyrë të kuqe të thellë nëpër supe dhe hapjen qendrore. Motivi i përsëritur lulor-gjeometrik është karakteristik për fushën e Kumanovës, ku e kuqja e thellë mbizotëron paletën, ndërsa sfondi i bardhë lihet qëllimisht i hapur.",
    },
    image: record1,
  },
  {
    id: "mr-0088",
    title: {
      en: "Woollen kilim with diamond field",
      mk: "Волнен килим со ромбоидно поле",
      sq: "Qilim leshi me fushë rombesh",
    },
    region: "mariovo",
    category: "carpet-rug",
    material: "wool",
    technique: "kilim-weave",
    period: { en: "Early 20th century", mk: "Почеток на 20 век", sq: "Fillimi i shekullit XX" },
    inventory: "EMK-MR-0088",
    description: {
      en: "A flat-woven wool rug organised around three columns of stepped diamonds. Natural dyes give the field its saturated wine tone; the black outlining and ochre accents mark a workshop tradition documented across the Mariovo highlands.",
      mk: "Рамно ткаена волнена черга организирана околу три колони скалести ромбови. Природните бои му даваат на полето заситен винско-црвен тон; црното контурирање и охрените акценти означуваат работилничка традиција документирана низ мариовските ридови.",
      sq: "Tapet leshi i endur rrafsh, i organizuar rreth tre shtyllave me rombe të shkallëzuara. Bojrat natyrale i japin fushës një ton të ngopur vishnje; konturimi i zi dhe theksimet oker shënojnë një traditë punishteje të dokumentuar nëpër kodrat e Mariovës.",
    },
    image: record2,
  },
  {
    id: "my-0231",
    title: {
      en: "Gold-couched rosette from a ceremonial apron",
      mk: "Златовезена розета од свечена престилка",
      sq: "Rozetë e qëndisur me fill ari nga një përparëse ceremoniale",
    },
    region: "miyak-debar",
    category: "ornament",
    material: "metal-thread",
    technique: "gold-couching",
    period: { en: "c. 1910", mk: "околу 1910", sq: "rreth 1910" },
    inventory: "EMK-MY-0231",
    description: {
      en: "A single rosette worked in couched metal thread on black wool, taken from a bridal apron of the Miyak region. The raised relief of the petals is achieved by padding the ground before the gold is laid and stitched down.",
      mk: "Единечна розета изработена во златовез со метален конец на црна волна, симната од невестинска престилка од Мијачко. Испакнатиот рељеф на ливчињата се постигнува со подложување на основата пред златото да се положи и прошие.",
      sq: "Një rozetë e vetme e punuar me fill metalik të qëndisur mbi lesh të zi, marrë nga një përparëse nuseje e rajonit Mijak. Reliefi i ngritur i petaleve arrihet duke mbushur bazën para se ari të vendoset dhe të qepet.",
    },
    image: record3,
  },
  {
    id: "sb-0057",
    title: {
      en: "Sleeve panel with lattice border",
      mk: "Ракавен панел со решеткест бордур",
      sq: "Panel mëngësh me kufi rrjetë",
    },
    region: "skopska-blatija",
    category: "textile-fragment",
    material: "cotton",
    technique: "satin-stitch",
    period: { en: "Mid 20th century", mk: "Средина на 20 век", sq: "Mesi i shekullit XX" },
    inventory: "EMK-SB-0057",
    description: {
      en: "A detached sleeve panel showing a lattice motif framed by a scalloped border. The piece was catalogued as a study fragment and is used as a reference sample for patch-level embedding comparisons.",
      mk: "Одделен ракавен панел со мотив од решетка, врамен со назабен бордур. Парчето е каталогизирано како студиски фрагмент и се користи како референтен примерок за споредби на ниво на исечок.",
      sq: "Një panel i shkëputur mëngësh me motiv rrjetë, i kornizuar me një kufi të dhëmbëzuar. Pjesa u katalogizua si fragment studimi dhe përdoret si mostër referimi për krahasimet e trupëzimeve në nivel fragmenti.",
    },
    image: record4,
  },
  {
    id: "oh-0019",
    title: {
      en: "Black-ground festive vest",
      mk: "Свечен елек на црна основа",
      sq: "Jelek festiv me sfond të zi",
    },
    region: "ohrid",
    category: "garment",
    material: "wool",
    technique: "gold-couching",
    period: { en: "Late 19th century", mk: "Крај на 19 век", sq: "Fundi i shekullit XIX" },
    inventory: "EMK-OH-0019",
    description: {
      en: "A short festive vest on black wool with restrained gold ornament along the front edges, typical of the Ohrid lakeside tradition where dark grounds prevail over the crimson of the eastern regions.",
      mk: "Краток свечен елек на црна волна со воздржан златен орнамент по предните рабови, типичен за охридската езерска традиција каде темните основи преовладуваат наспроти темноцрвената боја на источните региони.",
      sq: "Një jelek i shkurtër festiv mbi lesh të zi me zbukurim të përmbajtur prej ari përgjatë skajeve të përparme, tipik për traditën bregliqenore të Ohrit, ku sfondet e errëta mbizotërojnë mbi të kuqen e thellë të rajoneve lindore.",
    },
    image: record3,
  },
  {
    id: "st-0104",
    title: {
      en: "Household runner with zigzag bands",
      mk: "Домашна патека со цик-цак ленти",
      sq: "Rrugicë shtëpiake me shirita zigzag",
    },
    region: "strumica",
    category: "carpet-rug",
    material: "wool",
    technique: "kilim-weave",
    period: { en: "Early 20th century", mk: "Почеток на 20 век", sq: "Fillimi i shekullit XX" },
    inventory: "EMK-ST-0104",
    description: {
      en: "A narrow household runner built from alternating zigzag bands. The rhythm of the bands is repeated at three scales, a structure that shows clearly in patch-level embedding maps.",
      mk: "Тесна домашна патека составена од наизменични цик-цак ленти. Ритамот на лентите се повторува на три размери, структура која јасно се гледа на картите со вградувања на ниво на исечок.",
      sq: "Një rrugicë e ngushtë shtëpiake e ndërtuar nga shirita zigzag të alternuar. Ritmi i shiritave përsëritet në tre shkallë, një strukturë që duket qartë në hartat e trupëzimeve në nivel fragmenti.",
    },
    image: record2,
  },
  {
    id: "km-0177",
    title: {
      en: "Bridal shirt hem, crimson repeat",
      mk: "Раб на невестинска кошула, темноцрвено повторување",
      sq: "Cep këmishe nusërie, motiv i përsëritur ngjyrë vishnje",
    },
    region: "kumanovo",
    category: "garment",
    material: "linen",
    technique: "cross-stitch",
    period: { en: "c. 1890", mk: "околу 1890", sq: "rreth 1890" },
    inventory: "EMK-KM-0177",
    description: {
      en: "The embroidered hem of a bridal shirt, worked in a single crimson thread over counted linen ground. Wear along the lower edge indicates the garment was used rather than kept as a dowry piece.",
      mk: "Извезениот раб на невестинска кошула, изработен со еден темноцрвен конец врз бројана ленена основа. Истрошеноста по долниот раб покажува дека облеката била носена, а не чувана само како дел од чеиз.",
      sq: "Cepi i qëndisur i një këmishe nusërie, i punuar me një fill të vetëm ngjyrë vishnje mbi bazë liri të numëruar. Konsumimi përgjatë skajit të poshtëm tregon se veshja është përdorur, e jo mbajtur vetëm si pjesë prikë.",
    },
    image: record4,
  },
  {
    id: "my-0245",
    title: {
      en: "Chest panel with rosette cluster",
      mk: "Нагрден панел со група розети",
      sq: "Panel gjoksi me grup rozetash",
    },
    region: "miyak-debar",
    category: "ornament",
    material: "silk",
    technique: "satin-stitch",
    period: { en: "c. 1920", mk: "околу 1920", sq: "rreth 1920" },
    inventory: "EMK-MY-0245",
    description: {
      en: "Silk satin stitch forming a cluster of rosettes around a central medallion. Documented during the 2024 field campaign and digitised at 600 dpi for embedding extraction.",
      mk: "Свилен сатенски бод што формира група розети околу централен медалјон. Документирано за време на теренската кампања во 2024 година и дигитализирано на 600 dpi за извлекување вградувања.",
      sq: "Qëndisje sateni mëndafshi që formon një grup rozetash rreth një medaljoni qendror. Dokumentuar gjatë fushatës në terren të vitit 2024 dhe digjitalizuar në 600 dpi për nxjerrjen e trupëzimeve.",
    },
    image: record1,
  },
];

export function getRecord(id: string) {
  return RECORDS.find((record) => record.id === id);
}
