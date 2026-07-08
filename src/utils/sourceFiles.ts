// Boutique Source Code Files for Easy Offline/Development Downloads
export const SOURCE_FILES = {
  types_ts: `export interface Perfume {
  id: string;
  name: string;
  brand: string;
  description: string;
  family: string;
  notes: {
    top: string;
    heart: string;
    base: string;
  };
  intensity: number;
  priceFull: number;
  priceDecant?: number;
  decantMl?: number;
  hasDecant: boolean;
  boxColor: string;
  bottleColor: string;
  accentColor: string;
  rating: number;
}`,

  decantsExplainer_tsx: `import { useState } from "react";
import { Sparkles, Edit3, HelpCircle, Check, Info } from "lucide-react";
import { Perfume } from "../types";

interface DecantsExplainerProps {
  portionName: string;
  setPortionName: (val: string) => void;
  perfumes: Perfume[];
  onSelectPerfume: (p: Perfume) => void;
}

export default function DecantsExplainer({ portionName, setPortionName, perfumes, onSelectPerfume }: DecantsExplainerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(portionName);

  const handleSave = () => {
    setPortionName(tempName || "Decant");
    setIsEditing(false);
  };

  const portionPerfumes = perfumes.filter((p) => p.hasDecant);

  return (
    <div className="bg-[#FAF6EE] border border-[#E1D9C6] rounded-3xl p-6 relative overflow-hidden shadow-sm mb-12">
      <div className="absolute top-0 right-0 w-44 h-44 bg-[#C5B39A]/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-[#E1D9C6]/60">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#8E7860]/10 text-[#8E7860] rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3 h-3 text-[#A88C6F]" />
            Formato Fraccionado
          </span>
          <h2 className="text-2xl font-black text-[#2E251E] tracking-tight leading-none mb-1">
            Método de Venta Especial: <span className="text-[#A18262] underline decoration-[#A18262]/30 decoration-wavy">{portionName}</span>
          </h2>
          <p className="text-[#5C4D40] text-xs mt-1">
            Prueba fragancias de nicho de alto costo en envases de menor escala antes de adquirir una botella entera.
          </p>
        </div>

        <div className="bg-[#FAF9F6] border border-[#DECFC0] p-4 rounded-2xl w-full md:w-auto min-w-[300px] shadow-inner">
          <label className="block text-[10px] font-bold text-[#8C7B6E] uppercase tracking-widest mb-1.5 animate-pulse">
            Escribe el nombre de esta modalidad aquí:
          </label>
          {isEditing ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="bg-white border border-[#D9CDA9] focus:border-[#8C3E21] rounded-xl px-3 py-2 text-xs text-[#2E251E] focus:outline-none focus:ring-1 focus:ring-[#8E7860]/35 w-full font-bold"
                placeholder="Ej. Decants o Mini-Vial"
              />
              <button
                onClick={handleSave}
                className="bg-[#6E5D4F] hover:bg-[#5C4E42] text-[#FAF7F2] font-semibold px-4 rounded-xl text-xs transition-colors flex items-center justify-center cursor-pointer"
              >
                <Check className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-3 bg-white px-3 py-2.5 rounded-xl border border-[#DECFC0]">
              <span className="text-xs font-black text-[#8E7860] uppercase tracking-wider">{portionName}</span>
              <button
                onClick={() => setIsEditing(true)}
                className="text-[#8E7860] hover:text-[#5C4D40] transition-colors flex items-center gap-1.5 text-[11px] font-semibold cursor-pointer underline"
              >
                <Edit3 className="w-3.5 h-3.5" />
                Personalizar Nombre
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
        <div>
          <h3 className="text-sm font-bold text-[#2E251E] uppercase tracking-wider mb-4 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#A18262]" /> ¿Cómo preparamos tu porción?
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-lg bg-[#6E5D4F] text-[#FAF7F2] border border-[#5C4E42] flex items-center justify-center text-xs font-bold leading-none shrink-0 mt-0.5">
                1
              </div>
              <p className="text-xs text-[#5C4D40] leading-relaxed">
                Extraemos el líquido de forma aséptica del frasco original de fábrica utilizando instrumentos esterilizados de alta precisión cosmética.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-lg bg-[#6E5D4F] text-[#FAF7F2] border border-[#5C4E42] flex items-center justify-center text-xs font-bold leading-none shrink-0 mt-0.5">
                2
              </div>
              <p className="text-xs text-[#5C4D40] leading-relaxed">
                El perfume se encapsula herméticamente en frasquitos atomizadores de vidrio premium para mantener su estela y fijación intactas.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-lg bg-[#6E5D4F] text-[#FAF7F2] border border-[#5C4E42] flex items-center justify-center text-xs font-bold leading-none shrink-0 mt-0.5">
                3
              </div>
              <p className="text-xs text-[#5C4D40] leading-relaxed">
                Cada entrega incluye una tarjeta protectora del aroma con su pirámide y familia olfativa exacta, certificando autenticidad boutique.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-[#2E251E] uppercase tracking-wider mb-4 flex items-center gap-2">
            <Info className="w-4 h-4 text-[#A18262]" /> Catálogo disponible en envase <strong className="text-[#8E7860]">{portionName}</strong>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {portionPerfumes.map((p) => (
              <div 
                key={p.id}
                onClick={() => onSelectPerfume(p)}
                className="bg-[#FAF9F6] border border-[#DECFC0]/80 p-3.5 rounded-2xl hover:border-[#8E7860] cursor-pointer hover:bg-white transition-all group flex items-center justify-between shadow-sm hover:shadow"
              >
                <div>
                  <h4 className="text-xs font-bold text-[#2E251E] group-hover:text-[#8E7860] transition-colors">{p.name}</h4>
                  <p className="text-[10px] text-[#8C7B6E] font-mono mt-0.5 uppercase tracking-wider">{p.brand}</p>
                </div>
                <div className="text-right flex flex-col items-end">
                  <span className="text-[10px] bg-[#8E7860]/10 text-[#8E7860] px-2 py-0.5 rounded-full font-mono font-bold leading-none">
                    {p.decantMl || 10}ml
                  </span>
                  <span className="text-xs text-[#2E251E] font-black font-mono mt-1">S/. {p.priceDecant?.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}`,

  threeDViewer_tsx: `import { useState, useRef, useEffect } from "react";
import { Move, Layers, Rotate3d, HelpCircle, Code, Sparkles, Link, CheckCircle2 } from "lucide-react";
import { Perfume } from "../types";

interface ThreeDViewerProps {
  perfume: Perfume;
  portionName: string;
}

export default function ThreeDViewer({ perfume, portionName }: ThreeDViewerProps) {
  const [activeTab, setActiveTab] = useState<"box" | "bottle" | "decant">("box");
  const [isPhotoMode, setIsPhotoMode] = useState(false);
  const [rotation, setRotation] = useState({ x: -12, y: 25 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const startRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (activeTab === "decant" && !perfume.hasDecant) {
      setActiveTab("box");
    }
  }, [perfume, activeTab]);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex bg-[#EFECE3] border border-[#DCD6C5] p-1 rounded-xl items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#6A5A4A] pl-2 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-[#A38D75]" /> Visualización:
        </span>
        <div className="flex gap-1">
          <button onClick={() => setIsPhotoMode(false)} className={\`px-3 py-1.5 rounded-lg text-xs font-bold transitions \${!isPhotoMode ? 'bg-[#6E5D4F] text-[#FAF7F2]' : 'text-[#6A5A4A]'}\`}>Giro 3D</button>
          <button onClick={() => setIsPhotoMode(true)} className={\`px-3 py-1.5 rounded-lg text-xs font-bold transitions \${isPhotoMode ? 'bg-[#6E5D4F] text-[#FAF7F2]' : 'text-[#6A5A4A]'}\`}>Foto</button>
        </div>
      </div>
      {/* 3D Canvas rendering */}
      <div className="h-72 w-full relative bg-[#F6F3EB] rounded-2xl border border-[#DECFC0] overflow-hidden flex items-center justify-center">
         <p className="text-xs text-[#6A5A4A] font-bold uppercase">Luxe 3D Canvas / Photoreference</p>
      </div>
    </div>
  );
}`,

  singleFileGoogleSites_html: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Luxe Parfums - Google Sites Embed</title>
  
  <!-- Tailwind CSS & Lucide Icons -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            vintageBg: '#FDFBF7',
            vintageCard: '#FAF6EE',
            vintageInk: '#2E251E',
            vintageBrass: '#8E7860',
            vintageGreen: '#3F5144',
            vintageSage: '#5C4E42',
          }
        }
      }
    }
  </script>
</head>
<body class="bg-[#FDFBF7] text-[#2E251E] font-sans antialiased p-4">

  <!-- TOP DECORATION BANNER -->
  <div class="bg-[#8E7860] text-[#FAF7F2] py-2 px-3 text-center text-xs font-bold rounded-xl mb-6">
    🔱 BOUTIQUE DE FRAGANCIAS DE LUJO ORIGINALES FRACCIONADAS (Puntos seguros y envíos directos)
  </div>

  <!-- HEADLINE HEADER -->
  <div class="text-center mb-8">
    <h1 class="text-3xl font-extrabold tracking-tight text-[#2E251E]">LUXE PARFUMS</h1>
    <p class="text-[10px] uppercase font-bold tracking-widest text-[#8E7860] mt-1">Gourmet Perfume & Portions Decants</p>
  </div>

  <!-- SITES MESSAGE BOX -->
  <div class="bg-[#FAF6EE] border border-[#DECFC0] p-6 rounded-3xl max-w-xl mx-auto text-center shadow-sm">
    <h2 class="text-lg font-bold text-[#2E251E] mb-2">¡Bienvenido a tu Espacio Integrado!</h2>
    <p class="text-xs text-[#5C4D40] leading-relaxed mb-4">
      Este archivo HTML consolidado está especialmente diseñado para ser insertado con 1 clic en tus secciones de <strong>Google Sites</strong>. Puedes copiar este código fuente o descargarlo directamente para personalizar tus listados con total facilidad.
    </p>
    <div class="inline-flex gap-2.5 items-center justify-center bg-white border border-[#E1D9C6] px-4 py-2 rounded-xl text-xs font-mono font-bold text-[#8E7860]">
      📍 WhatsApp Pedidos: +593 97 952 6685
    </div>
  </div>

  <footer class="text-center text-[10px] text-[#8E7860] mt-12 border-t border-[#DECFC0]/50 pt-4">
    &copy; Luxe Parfums. Diseñado con Amor y Elegancia Vintage.
  </footer>

  <script>
    // Initialize icons
    lucide.createIcons();
  </script>
</body>
</html>`
};
