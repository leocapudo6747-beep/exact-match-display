import { img } from "@/lib/product-images";

export type Category =
  | "Camisas"
  | "Polos"
  | "Tricôs"
  | "Jaquetas"
  | "Calçados"
  | "Tênis"
  | "Acessórios"
  | "Relógios";

export type Product = {
  slug: string;
  brand: string;
  name: string;
  price: number;
  category: Category;
  /** Primeira imagem é a principal; as demais formam a galeria. */
  images: string[];
  description: string;
  composition: string;
  origin: string;
  sizes: string[];
  colors?: string[];
  seal: "Original Importado" | "Curadoria Belmont";
  isNew?: boolean;
};

export const allCategories: Category[] = [
  "Camisas",
  "Polos",
  "Tricôs",
  "Jaquetas",
  "Calçados",
  "Tênis",
  "Acessórios",
  "Relógios",
];

export const featuredBrands = [
  "Polo Ralph Lauren",
  "Lacoste",
  "Tommy Hilfiger",
  "Brooks Brothers",
  "Loro Piana",
  "Moncler",
  "Birkenstock",
  "New Balance",
  "Fear of God Essentials",
];

const CLOTH = ["P", "M", "G", "GG"];
const SHOES = ["38", "39", "40", "41", "42", "43", "44"];
const ONE = ["Único"];

type Raw = Omit<Product, "slug" | "seal"> & { seal?: Product["seal"] };

const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const raw: Raw[] = [
  { brand: "Polo Ralph Lauren", name: "Custom Slim Fit Mesh Polo", price: 549, category: "Polos", images: [img.polo, img.oxford, img.tee], description: "Piquê de algodão com caimento ajustado e o pônei bordado no peito. O polo que definiu um século de estilo americano.", composition: "100% algodão piquê", origin: "Peru", sizes: CLOTH, colors: ["Branco", "Navy", "Verde"], isNew: true },
  { brand: "Polo Ralph Lauren", name: "Classic Fit Oxford Shirt", price: 699, category: "Camisas", images: [img.oxford, img.polo], description: "Oxford em azul suave com colarinho button-down. A base do guarda-roupa de Ivy League.", composition: "100% algodão oxford", origin: "Índia", sizes: CLOTH, colors: ["Azul", "Branco"] },
  { brand: "Polo Ralph Lauren", name: "Cable-Knit Cotton Sweater", price: 1290, category: "Tricôs", images: [img.knit, img.oxford], description: "Tricô de tranças em algodão macio, inspirado nos suéteres de críquete ingleses.", composition: "100% algodão", origin: "China", sizes: CLOTH, colors: ["Creme", "Navy"] },
  { brand: "Polo Ralph Lauren", name: "Slim Fit Stretch Chino Polo", price: 899, category: "Polos", images: [img.polo, img.knit], description: "Polo de manga longa em piquê encorpado, para dias de outono na costa.", composition: "97% algodão, 3% elastano", origin: "Peru", sizes: CLOTH },
  { brand: "Lacoste", name: "L.12.12 Classic Fit Polo", price: 649, category: "Polos", images: [img.polo, img.tee], description: "O polo original de René Lacoste, 1933. Petit piqué respirável e o crocodilo bordado.", composition: "100% algodão petit piqué", origin: "França", sizes: CLOTH, colors: ["Branco", "Navy", "Marinho"], isNew: true },
  { brand: "Lacoste", name: "Crew Neck Pima Cotton Tee", price: 399, category: "Camisas", images: [img.tee, img.polo], description: "Camiseta em algodão pima de fibra longa, toque sedoso e gola canelada.", composition: "100% algodão pima", origin: "Peru", sizes: CLOTH },
  { brand: "Tommy Hilfiger", name: "Th Flex Oxford Shirt", price: 599, category: "Camisas", images: [img.oxford], description: "Oxford com leve elasticidade e bandeira bordada no punho. Preppy com conforto.", composition: "98% algodão, 2% elastano", origin: "Bangladesh", sizes: CLOTH },
  { brand: "Tommy Hilfiger", name: "Pima Cotton Cashmere Crew", price: 899, category: "Tricôs", images: [img.knit], description: "Mistura de algodão pima e cashmere em ponto fino. Leve, versátil, sóbrio.", composition: "90% algodão pima, 10% cashmere", origin: "China", sizes: CLOTH },
  { brand: "GANT", name: "Regular Fit Oxford Shirt", price: 749, category: "Camisas", images: [img.oxford], description: "A camisa que nasceu em New Haven, 1949. Colarinho button-down com o célebre locker loop.", composition: "100% algodão oxford", origin: "Portugal", sizes: CLOTH },
  { brand: "GANT", name: "Lambswool Crew Neck", price: 1190, category: "Tricôs", images: [img.knit], description: "Lã de cordeiro escocesa em tricô clássico, pensada para camadas.", composition: "100% lã de cordeiro", origin: "Escócia", sizes: CLOTH },
  { brand: "Brooks Brothers", name: "Original Polo Button-Down Shirt", price: 899, category: "Camisas", images: [img.oxford], description: "A inventora do colarinho button-down, desde 1896. Oxford sem passadoria.", composition: "100% algodão Supima", origin: "Estados Unidos", sizes: CLOTH, seal: "Curadoria Belmont" },
  { brand: "Brooks Brothers", name: "Madison Fit Navy Blazer", price: 3490, category: "Jaquetas", images: [img.jacket, img.oxford], description: "Blazer navy de dois botões em sarja de lã. O uniforme silencioso de Manhattan.", composition: "100% lã", origin: "Itália", sizes: ["48", "50", "52", "54"] },
  { brand: "Fred Perry", name: "M12 Twin Tipped Polo", price: 599, category: "Polos", images: [img.polo], description: "O polo com frisos duplos que Wimbledon eternizou. Feito na Inglaterra.", composition: "100% algodão piquê", origin: "Inglaterra", sizes: CLOTH },
  { brand: "Barbour", name: "Bedale Waxed Jacket", price: 2890, category: "Jaquetas", images: [img.jacket, img.trench], description: "Algodão encerado, gola de veludo cotelê e forro tartan. Feita para o campo inglês.", composition: "100% algodão encerado", origin: "Inglaterra", sizes: CLOTH, colors: ["Sage", "Navy"] },
  { brand: "Burberry", name: "Kensington Heritage Trench Coat", price: 14900, category: "Jaquetas", images: [img.trench], description: "Gabardine de algodão tecida em Castleford. O trench coat em sua forma definitiva.", composition: "100% gabardine de algodão", origin: "Inglaterra", sizes: CLOTH, seal: "Curadoria Belmont" },
  { brand: "Burberry", name: "Vintage Check Cashmere Scarf", price: 3900, category: "Acessórios", images: [img.trench], description: "Cashmere escocês com o xadrez de 1924. Franjas feitas à mão.", composition: "100% cashmere", origin: "Escócia", sizes: ONE },
  { brand: "Loro Piana", name: "Baby Cashmere Crew Neck", price: 4500, category: "Tricôs", images: [img.knit], description: "Fibras de filhotes de cabra hircus da Mongólia, uma única vez na vida do animal.", composition: "100% baby cashmere", origin: "Itália", sizes: CLOTH, isNew: true },
  { brand: "Brunello Cucinelli", name: "Cashmere Turtleneck", price: 6900, category: "Tricôs", images: [img.knit], description: "Tricotado em Solomeo, Úmbria. Gola alta em cashmere de fio duplo.", composition: "100% cashmere", origin: "Itália", sizes: CLOTH, seal: "Curadoria Belmont" },
  { brand: "Moncler", name: "Cardere Short Down Jacket", price: 9800, category: "Jaquetas", images: [img.jacket], description: "Plumas de ganso em nylon laqué, leve como um suéter e quente como um casaco.", composition: "100% poliamida, enchimento de plumas", origin: "Romênia", sizes: CLOTH, isNew: true },
  { brand: "Stone Island", name: "Garment Dyed Crinkle Reps Jacket", price: 5400, category: "Jaquetas", images: [img.jacket], description: "Nylon com textura amassada, tingido na peça. A bússola removível no braço.", composition: "100% poliamida", origin: "Itália", sizes: CLOTH },
  { brand: "C.P. Company", name: "Chrome-R Goggle Overshirt", price: 3900, category: "Jaquetas", images: [img.jacket], description: "A lente icônica no capuz, em nylon técnico leve. Herança de Massimo Osti.", composition: "100% poliamida", origin: "Itália", sizes: CLOTH },
  { brand: "Fear of God Essentials", name: "Pullover Hoodie", price: 1290, category: "Tricôs", images: [img.hoodie, img.tee], description: "Moletom pesado em tom areia, modelagem ampla e ombro caído.", composition: "80% algodão, 20% poliéster", origin: "Vietnã", sizes: CLOTH, colors: ["Areia", "Oatmeal"] },
  { brand: "Fear of God Essentials", name: "Essential Tee", price: 590, category: "Camisas", images: [img.tee, img.hoodie], description: "Algodão pesado em off-white, gola reforçada e caimento reto.", composition: "100% algodão", origin: "Vietnã", sizes: CLOTH },
  { brand: "Birkenstock", name: "Arizona Suede Taupe", price: 899, category: "Calçados", images: [img.sandal, img.clog], description: "Camurça taupe sobre palmilha anatômica de cortiça. Feita na Alemanha.", composition: "Camurça e cortiça", origin: "Alemanha", sizes: SHOES },
  { brand: "Birkenstock", name: "Boston Soft Footbed", price: 1090, category: "Calçados", images: [img.clog, img.sandal], description: "Clog em camurça marrom com palmilha macia. Elegância despretensiosa.", composition: "Camurça e cortiça", origin: "Alemanha", sizes: SHOES, isNew: true },
  { brand: "New Balance", name: "Made in USA 990v6 Grey", price: 1899, category: "Tênis", images: [img.sneaker], description: "O tênis cinza de pai, montado em Massachusetts. Camurça e mesh.", composition: "Camurça e mesh", origin: "Estados Unidos", sizes: SHOES, isNew: true },
  { brand: "New Balance", name: "Made in USA 993 Grey", price: 2090, category: "Tênis", images: [img.sneaker], description: "O clássico de 2008 com amortecimento ABZORB. Discreto e indestrutível.", composition: "Camurça e mesh", origin: "Estados Unidos", sizes: SHOES },
  { brand: "Veja", name: "Campo Chromefree Leather", price: 999, category: "Tênis", images: [img.sneaker], description: "Couro curtido sem cromo e borracha amazônica. Produzido no Brasil.", composition: "Couro e borracha natural", origin: "Brasil", sizes: SHOES },
  { brand: "Common Projects", name: "Original Achilles Low", price: 3900, category: "Tênis", images: [img.sneaker], description: "Couro napa italiano e a numeração dourada no calcanhar. O mínimo absoluto.", composition: "Couro napa", origin: "Itália", sizes: SHOES, seal: "Curadoria Belmont" },
  { brand: "Alden", name: "Shell Cordovan Plain Toe Blucher", price: 7900, category: "Calçados", images: [img.loafer], description: "Couro cordovan da Horween, construção Goodyear. Feito em Middleborough desde 1884.", composition: "Couro shell cordovan", origin: "Estados Unidos", sizes: SHOES },
  { brand: "Church's", name: "Shannon Polished Binder Derby", price: 5900, category: "Calçados", images: [img.loafer], description: "Couro polido e sola dupla, montado à mão em Northampton.", composition: "Couro polished binder", origin: "Inglaterra", sizes: SHOES },
  { brand: "Tod's", name: "Gommino Suede Driving Loafer", price: 4900, category: "Calçados", images: [img.loafer], description: "133 pinos de borracha na sola. O mocassim da Riviera italiana.", composition: "Camurça", origin: "Itália", sizes: SHOES, colors: ["Marrom", "Navy"] },
  { brand: "Persol", name: "PO0649 Tortoise", price: 1690, category: "Acessórios", images: [img.sunglasses], description: "A armação dos anos 1950 com a seta de prata nas hastes. Feita à mão em Turim.", composition: "Acetato", origin: "Itália", sizes: ONE },
  { brand: "Ray-Ban", name: "Wayfarer Classic Havana", price: 1190, category: "Acessórios", images: [img.sunglasses], description: "O formato de 1952 em acetato havana e lentes cristal G-15.", composition: "Acetato", origin: "Itália", sizes: ONE },
  { brand: "Longines", name: "Master Collection 40mm", price: 19900, category: "Relógios", images: [img.watch], description: "Mostrador prateado e movimento automático. Relojoaria suíça desde 1832.", composition: "Aço e couro de jacaré", origin: "Suíça", sizes: ONE, seal: "Curadoria Belmont" },
  { brand: "Tag Heuer", name: "Carrera Date 39mm", price: 29900, category: "Relógios", images: [img.watch], description: "A linha nascida nas corridas de 1963, em versão três ponteiros refinada.", composition: "Aço e couro", origin: "Suíça", sizes: ONE },
  { brand: "Montblanc", name: "Meisterstück Wallet 6cc", price: 2490, category: "Acessórios", images: [img.loafer], description: "Couro de bezerro europeu com o emblema da estrela branca. Feito em Florença.", composition: "Couro de bezerro", origin: "Itália", sizes: ONE },
];

export const products: Product[] = raw.map((p) => ({
  ...p,
  slug: slugify(`${p.brand} ${p.name}`),
  seal: p.seal ?? "Original Importado",
}));

export const allBrands = Array.from(new Set(products.map((p) => p.brand)));

export const formatPrice = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const categoryImage: Record<Category, string> = {
  Camisas: img.oxford,
  Polos: img.polo,
  Tricôs: img.knit,
  Jaquetas: img.trench,
  Calçados: img.loafer,
  Tênis: img.sneaker,
  Acessórios: img.sunglasses,
  Relógios: img.watch,
};
