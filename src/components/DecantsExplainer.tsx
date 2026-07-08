import { Sparkles, HelpCircle } from "lucide-react";
import { Perfume } from "../types";

interface DecantsExplainerProps {
  portionName: string;
  perfumes: Perfume[];
  onSelectPerfume: (p: Perfume) => void;
}

export default function DecantsExplainer({ portionName }: DecantsExplainerProps) {
  return (
    <div id="decants-explainer-section" className="bg-[#FAF6EE] border border-[#E1D9C6] rounded-3xl p-6 relative overflow-hidden shadow-sm mb-12 animate-fade-in">
      <div className="absolute top-0 right-0 w-44 h-44 bg-[#C5B39A]/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="pb-6 border-b border-[#E1D9C6]/60">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#8E7860]/10 text-[#8E7860] rounded-full text-[10px] font-black uppercase tracking-widest mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#A88C6F]" />
          Formato Fraccionado
        </span>
        <h2 className="text-2xl font-black text-[#2E251E] tracking-tight leading-none mb-1">
          Método de Venta Especial: <span className="text-[#A18262] underline decoration-[#A18262]/30 decoration-wavy">{portionName}</span>
        </h2>
        <p className="text-[#5C4D40] text-xs mt-1.5">
          Prueba fragancias de nicho de alto costo en envases de menor escala antes de adquirir una botella entera.
        </p>
      </div>

      <div className="pt-6">
        <h3 className="text-xs font-black text-[#2E251E] uppercase tracking-widest mb-5 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-[#A18262]" /> ¿Cómo preparamos tu porción?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#FAF9F6] border border-[#DECFC0]/50 p-5 rounded-2xl hover:border-[#8E7860]/40 transition-colors shadow-sm">
            <div className="w-8 h-8 rounded-xl bg-[#6E5D4F] text-[#FAF7F2] border border-[#5C4E42] flex items-center justify-center text-sm font-bold leading-none mb-3.5 shadow-sm">
              1
            </div>
            <h4 className="text-xs font-extrabold text-[#2E251E] uppercase tracking-wide mb-1.5">Extracción Aséptica</h4>
            <p className="text-xs text-[#5C4D40] leading-relaxed">
              Extraemos el líquido de forma higiénica del frasco original de fábrica utilizando instrumentos esterilizados de alta precisión cosmética.
            </p>
          </div>
          <div className="bg-[#FAF9F6] border border-[#DECFC0]/50 p-5 rounded-2xl hover:border-[#8E7860]/40 transition-colors shadow-sm">
            <div className="w-8 h-8 rounded-xl bg-[#6E5D4F] text-[#FAF7F2] border border-[#5C4E42] flex items-center justify-center text-sm font-bold leading-none mb-3.5 shadow-sm">
              2
            </div>
            <h4 className="text-xs font-extrabold text-[#2E251E] uppercase tracking-wide mb-1.5">Encapsulado Hermético</h4>
            <p className="text-xs text-[#5C4D40] leading-relaxed">
              El perfume se sella herméticamente en frasquitos atomizadores de vidrio premium para mantener su estela y fijación intactas.
            </p>
          </div>
          <div className="bg-[#FAF9F6] border border-[#DECFC0]/50 p-5 rounded-2xl hover:border-[#8E7860]/40 transition-colors shadow-sm">
            <div className="w-8 h-8 rounded-xl bg-[#6E5D4F] text-[#FAF7F2] border border-[#5C4E42] flex items-center justify-center text-sm font-bold leading-none mb-3.5 shadow-sm">
              3
            </div>
            <h4 className="text-xs font-extrabold text-[#2E251E] uppercase tracking-wide mb-1.5">Garantía Certificada</h4>
            <p className="text-xs text-[#5C4D40] leading-relaxed">
              Cada entrega incluye una tarjeta protectora del aroma con su pirámide y familia olfativa exacta, certificando autenticidad boutique.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
