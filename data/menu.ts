export type Category = "All" | "Coffee" | "Iced" | "Matcha" | "Bakery";
export type Product = {
  id: string;
  name: string;
  note: string;
  price: number;
  category: Exclude<Category, "All">;
  art: "espresso" | "latte" | "iced" | "filter" | "matcha" | "croissant";
  label?: string;
};
export const categories: Category[] = [
  "All",
  "Coffee",
  "Iced",
  "Matcha",
  "Bakery",
];
export const products: Product[] = [
  {
    id: "flat-white",
    name: "Flat white",
    note: "Double espresso, silky steamed milk.",
    price: 450,
    category: "Coffee",
    art: "latte",
    label: "HOUSE FAVOURITE",
  },
  {
    id: "espresso",
    name: "Espresso",
    note: "A small cup. A beautifully bold beginning.",
    price: 300,
    category: "Coffee",
    art: "espresso",
  },
  {
    id: "iced-latte",
    name: "Iced oat latte",
    note: "Espresso, oat milk, a little cool.",
    price: 550,
    category: "Iced",
    art: "iced",
    label: "SLOW DOWN, COOL OFF",
  },
  {
    id: "pour-over",
    name: "Pour-over",
    note: "Hand-brewed, bright and full of character.",
    price: 500,
    category: "Coffee",
    art: "filter",
  },
  {
    id: "matcha",
    name: "Matcha latte",
    note: "Ceremonial-style green tea, creamy oat milk.",
    price: 550,
    category: "Matcha",
    art: "matcha",
  },
  {
    id: "croissant",
    name: "Butter croissant",
    note: "Golden layers. Baked for slow mornings.",
    price: 400,
    category: "Bakery",
    art: "croissant",
  },
];
export function money(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}
