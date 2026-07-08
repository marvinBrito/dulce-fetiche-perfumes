import { useState, useRef } from "react";
import { Layers, Rotate3d, HelpCircle, ZoomIn, ZoomOut, Maximize2, ArrowRight } from "lucide-react";
import { Perfume } from "../types";

interface ThreeDViewerProps {
  perfume: Perfume;
  portionName: string;
}

export default function ThreeDViewer({ perfume, portionName }: ThreeDViewerProps) {
  const [activeTab, setActiveTab] = useState<"box" | "bottle" | "decant">("box");
  const [zoomLevel, setZoomLevel] = useState<number>(1); // 1 = normal, 1.8 = zoom
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Default elegant fallback photos so they are never empty or blank.
  // The user can customize these directly inside /src/App.tsx by adding imageBox, imageBottle, or imageDecant properties!
  const defaultPhotos: Record<string, Record<"box" | "bottle" | "decant", string>> = {
    "golden-elixir": {
      box: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&q=80",
      bottle: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80",
      decant: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80",
    },
    "ajwaa": {
      box: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=600&q=80",
      bottle: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80",
      decant: "https://images.unsplash.com/photo-1588405748373-122b2321bc31?auto=format&fit=crop&w=600&q=80",
    },
    "royal-amber": {
      box: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80",
      bottle: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80",
      decant: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80",
    },
    "bade-e-al-oud-amethyst": {
      box: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=600&q=80",
      bottle: "https://images.unsplash.com/photo-1587017539504-67cfb94d2215?auto=format&fit=crop&w=600&q=80",
      decant: "https://images.unsplash.com/photo-1588405748373-122b2321bc31?auto=format&fit=crop&w=600&q=80",
    },
    "bade-e-al-oud-honor-and-glory": {
      box: "https://images.unsplash.com/photo-1515688594390-b649af70d282?auto=format&fit=crop&w=600&q=80",
      bottle: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80",
      decant: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80",
    }
  };

  // Resolve current active image, checking first the customized perfume fields, then the default mappings, then general elegant fallback
  const getActiveImage = () => {
    if (activeTab === "box" && perfume.imageBox) return perfume.imageBox;
    if (activeTab === "bottle" && perfume.imageBottle) return perfume.imageBottle;
    if (activeTab === "decant" && perfume.imageDecant) return perfume.imageDecant;

    const key = perfume.id;
    const mapped = defaultPhotos[key];
    if (mapped) {
      return mapped[activeTab];
    }

    // Default general luxury fallback
    if (activeTab === "box") return "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&q=80";
    if (activeTab === "bottle") return "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80";
    return "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80";
  };

  const activeImage = getActiveImage();

  // Amazon-style interactive hover zoom & pan handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const toggleZoom = () => {
    setZoomLevel(zoomLevel === 1 ? 1.8 : 1);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Tab Selectors */}
      <div className="flex bg-[#F5F2EA] border border-[#EBE5D5] p-1 rounded-2xl shadow-inner">
        <button
          onClick={() => { setActiveTab("box"); setZoomLevel(1); }}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all cursor-pointer ${
            activeTab === "box" 
              ? "bg-white text-[#2E251E] border border-[#DECFC0] shadow-sm" 
              : "text-[#7A6A5E] hover:text-[#2E251E]"
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-[#8E7860]" />
          Ver Caja
        </button>
        <button
          onClick={() => { setActiveTab("bottle"); setZoomLevel(1); }}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all cursor-pointer ${
            activeTab === "bottle" 
              ? "bg-white text-[#2E251E] border border-[#DECFC0] shadow-sm" 
              : "text-[#7A6A5E] hover:text-[#2E251E]"
          }`}
        >
          <Rotate3d className="w-3.5 h-3.5 text-[#8E7860]" />
          Ver Frasco
        </button>
        {perfume.hasDecant && (
          <button
            onClick={() => { setActiveTab("decant"); setZoomLevel(1); }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all cursor-pointer ${
              activeTab === "decant" 
                ? "bg-white text-[#2E251E] border border-[#DECFC0] shadow-sm" 
                : "text-[#7A6A5E] hover:text-[#2E251E]"
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#8E7860]" />
            Ver {portionName}
          </button>
        )}
      </div>

      {/* INTERACTIVE GALLERY VIEWPORT (With Smooth Amazon-style Zoom & Pan on Hover) */}
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setZoomLevel(1.8)}
        onMouseLeave={() => setZoomLevel(1)}
        onClick={toggleZoom}
        className="h-[340px] w-full relative bg-white rounded-3xl border border-[#DECFC0] overflow-hidden select-none flex items-center justify-center cursor-zoom-in shadow-sm group"
      >
        {/* Soft elegant warm vintage background vignette pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/10 to-[#EAE3D2]/15 pointer-events-none z-10" />

        {/* Dynamic Image with Scale & Translate Origin based on mouse position */}
        <img 
          src={activeImage}
          alt={`${perfume.name} - ${activeTab}`}
          className="max-h-[290px] max-w-[90%] object-contain transition-transform duration-200 ease-out pointer-events-none"
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: `${mousePos.x}% ${mousePos.y}%`
          }}
          referrerPolicy="no-referrer"
        />

        {/* Amazon-style interaction guidance banner */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-[#2E251E]/80 backdrop-blur-sm text-white text-[9px] font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <Maximize2 className="w-3 h-3 text-amber-400" />
          <span>Pasa el cursor para ampliar y mover</span>
        </div>

        {/* Corner Indicator */}
        <div className="absolute top-3 right-3 bg-[#FAF8F3]/95 border border-[#DECFC0] px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest text-[#8C7B6E] z-10 flex items-center gap-1">
          {activeTab === "box" ? "Empaque Oficial" : activeTab === "bottle" ? "Frasco 100ml" : portionName}
        </div>
      </div>

    </div>
  );
}
