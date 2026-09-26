import poloCustomSlim from "@/assets/polo-custom-slim.jpg";
import birkenstockArizona from "@/assets/birkenstock-arizona.jpg";
import essentialsHoodie from "@/assets/essentials-hoodie.jpg";
import oxfordShirt from "@/assets/oxford-shirt.jpg";
import bostonClog from "@/assets/boston-clog.jpg";
import essentialsTee from "@/assets/essentials-tee.jpg";

export type Category = "Camisas" | "Camisetas" | "Moletons" | "Calçados";

export type Product = {
  slug: string;
  brand: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  description: string;
  sizes: string[];
};

export const categories: Array<"Todas" | Category> = [
  "Todas",
  "Camisas",
  "Camisetas",
  "Moletons",
  "Calçados",
];

export const products: Product[] = [
  {
    slug: "polo-ralph-lauren-custom-slim",
    brand: "Polo Ralph Lauren",
    name: "Custom Slim",
    price: 549.9,
    category: "Camisas",
    image: poloCustomSlim,
    description:
      "Piquê de algodão com caimento ajustado ao corpo, gola trabalhada e acabamento manual. Uma peça que atravessa estações sem pedir licença.",
    sizes: ["P", "M", "G", "GG"],
  },
  {
    slug: "birkenstock-arizona-suede",
    brand: "Birkenstock",
    name: "Arizona Suede",
    price: 899.0,
    category: "Calçados",
    image: birkenstockArizona,
    description:
      "Camurça macia em tom taupe sobre palmilha anatômica de cortiça. Conforto silencioso, desenho que não envelhece.",
    sizes: ["38", "39", "40", "41", "42", "43"],
  },
  {
    slug: "fear-of-god-essentials-hoodie",
    brand: "Fear of God",
    name: "Essentials Hoodie",
    price: 1290.0,
    category: "Moletons",
    image: essentialsHoodie,
    description:
      "Moletom pesado em tom areia, modelagem ampla e ombro caído. Discrição em forma de volume.",
    sizes: ["P", "M", "G", "GG"],
  },
  {
    slug: "polo-ralph-lauren-oxford-shirt",
    brand: "Polo Ralph Lauren",
    name: "Oxford Shirt",
    price: 699.9,
    category: "Camisas",
    image: oxfordShirt,
    description:
      "Tecido oxford em azul suave, colarinho button-down e bolso aplicado. O clássico definitivo do guarda-roupa masculino.",
    sizes: ["P", "M", "G", "GG"],
  },
  {
    slug: "birkenstock-boston-clog",
    brand: "Birkenstock",
    name: "Boston Clog",
    price: 1090.0,
    category: "Calçados",
    image: bostonClog,
    description:
      "Camurça marrom profunda em formato fechado, fivela discreta e solado leve. Elegância despretensiosa para o dia inteiro.",
    sizes: ["38", "39", "40", "41", "42", "43"],
  },
  {
    slug: "fear-of-god-essentials-tee",
    brand: "Fear of God",
    name: "Essentials Tee",
    price: 590.0,
    category: "Camisetas",
    image: essentialsTee,
    description:
      "Algodão pesado em off-white, gola reforçada e caimento reto. A base neutra sobre a qual tudo se constrói.",
    sizes: ["P", "M", "G", "GG"],
  },
];

export const formatPrice = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
