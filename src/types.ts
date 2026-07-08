export interface DecantOption {
  ml: number;
  price: number;
}

export interface Perfume {
  id: string;
  name: string;
  brand: string;
  description: string;
  family: string; // e.g. "Amaderado Especiado"
  notes: {
    top: string; // Notas de salida
    heart: string; // Notas de corazón
    base: string; // Notas de fondo
  };
  intensity: number; // 1 to 5 stars
  priceFull: number;
  priceDecant?: number;
  decantMl?: number; // e.g. 10ml, 5ml
  decantOptions?: DecantOption[]; // List of multiple decant options (e.g. 10ml, 5ml, 3ml)
  hasDecant: boolean;
  boxColor: string; // Gradiente CSS para la caja 3D
  bottleColor: string; // Gradiente CSS para el frasco 3D
  accentColor: string; // Hex color for icons and accents
  rating: number;
  imageBox?: string; // Opcional: URL o ruta de la foto de la caja
  imageBottle?: string; // Opcional: URL o ruta de la foto del frasco
  imageDecant?: string; // Opcional: URL o ruta de la foto del decant/porción
}
