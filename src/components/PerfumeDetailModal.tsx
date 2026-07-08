import { useState } from "react";
import { X, MessageCircle, Truck, Gift, Star, CheckCircle } from "lucide-react";
import { Perfume, DecantOption } from "../types";
import ThreeDViewer from "./ThreeDViewer";

interface PerfumeDetailModalProps {
  perfume: Perfume;
  onClose: () => void;
  portionName: string;
  contactPhone: string;
}

export default function PerfumeDetailModal({ perfume, onClose, portionName, contactPhone }: PerfumeDetailModalProps) {
  const [format, setFormat] = useState<"full" | "decant">(perfume.hasDecant ? "decant" : "full");
  const quantity = 1;

  // Generate dynamic decants if not pre-defined
  const decantOpts: DecantOption[] = perfume.decantOptions || (perfume.priceDecant ? [
    { ml: 10, price: perfume.priceDecant },
    { ml: 5, price: perfume.priceDecant === 8.99 ? 3.99 : perfume.priceDecant === 9.99 ? 4.99 : perfume.priceDecant === 10.99 ? 5.99 : perfume.priceDecant === 11.99 ? 5.99 : perfume.priceDecant === 13.99 ? 6.99 : 4.99 },
    { ml: 3, price: perfume.priceDecant === 8.99 ? 1.99 : perfume.priceDecant === 9.99 ? 2.99 : perfume.priceDecant === 10.99 ? 2.99 : perfume.priceDecant === 11.99 ? 3.99 : perfume.priceDecant === 13.99 ? 4.99 : 2.99 }
  ] : []);

  const [selectedDecant, setSelectedDecant] = useState<DecantOption>(
    decantOpts[0] || { ml: 10, price: perfume.priceDecant || 0 }
  );

  const price = format === "full" ? perfume.priceFull : selectedDecant.price;
  const total = price * quantity;

  const handleWhatsAppRedirect = () => {
    const formatText = format === "full" ? "Frasco Completo (100ml)" : `Porción de Perfume (${portionName} - ${selectedDecant.ml}ml)`;
    const message = `Hola! Me gustaría adquirir el siguiente perfume de tu catálogo:
-------------------------------------
🌟 Producto: ${perfume.name} (${perfume.brand})
🧪 Formato: ${formatText}
📦 Cantidad: ${quantity} unidad(es)
💵 Total estimado: S/. ${total.toFixed(2)}
-------------------------------------
Por favor, confírmame disponibilidad para coordinar la entrega segura o envío a domicilio de mi pedido. Gracias!`;

    const encodedText = encodeURIComponent(message);
    const cleanPhone = contactPhone.replace(/\D/g, "");
    window.open(`https://wa.me/${cleanPhone}?text=${encodedText}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1C1714]/85 backdrop-blur-sm flex items-center justify-center p-4">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-[#FAF8F2] border border-[#DECFC0] rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 bg-[#FAF8F2] border border-[#D9CDA9] text-[#6E5D4F] hover:bg-[#EBE5D3] rounded-full transition-colors cursor-pointer shadow-sm"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Column Left: Draggable 3D Sandbox or Photo Mode */}
        <div className="md:col-span-5 bg-[#FAF7EF] p-6 flex flex-col justify-center border-b md:border-b-0 md:border-r border-[#DECFC0]">
          <ThreeDViewer perfume={perfume} portionName={portionName} />
        </div>

        {/* Column Right: Details & Custom Boutique Options */}
        <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-between bg-white text-[#2E251E]">
          <div>
            {/* Brand Rating Badges */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8E7860] font-mono">
                {perfume.brand}
              </span>
              <div className="flex items-center gap-1 bg-[#8E7860]/10 text-[#8E7860] px-2.5 py-1 rounded-full text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-current text-[#C5A27A]" />
                {perfume.rating}
              </div>
            </div>

            <h1 className="text-3xl font-black text-[#2E251E] tracking-tight mb-2">
              {perfume.name}
            </h1>
            
            <p className="text-[#5C4D40] text-sm leading-relaxed mb-6">
              {perfume.description}
            </p>

            {/* Olfactory Notes Card */}
            <div className="bg-[#FAF7EF] border border-[#E5DEC7] rounded-2xl p-4.5 mb-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#5C4D40] mb-3 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#8E7860]" />
                Pirámide y Composición Olfativa
              </h3>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-2.5 rounded-xl bg-white border border-[#E1D9C6]">
                  <div className="text-[10px] font-bold text-[#8E7860] uppercase tracking-wider">Salida</div>
                  <div className="text-xs text-[#2E251E] font-bold mt-1 truncate" title={perfume.notes.top}>{perfume.notes.top}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-[#E1D9C6]">
                  <div className="text-[10px] font-bold text-[#8E7860] uppercase tracking-wider">Corazón</div>
                  <div className="text-xs text-[#2E251E] font-bold mt-1 truncate" title={perfume.notes.heart}>{perfume.notes.heart}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-[#E1D9C6]">
                  <div className="text-[10px] font-bold text-[#8E7860] uppercase tracking-wider">Fondo</div>
                  <div className="text-xs text-[#2E251E] font-bold mt-1 truncate" title={perfume.notes.base}>{perfume.notes.base}</div>
                </div>
              </div>
              <div className="mt-3.5 pt-3.5 border-t border-[#DECFC0]/50 text-[11px] text-[#5C4D40] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span>Familia de Fragancia: <strong className="text-[#8E7860] uppercase font-bold text-xs">{perfume.family}</strong></span>
                <span className="flex items-center gap-0.5">
                  Fijación: 
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3.5 h-3.5 ${i < perfume.intensity ? "text-[#C29E75] fill-current" : "text-[#DFD8C4]"}`} 
                    />
                  ))}
                </span>
              </div>
            </div>

            {/* Buying Form Format Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              {/* Option 1: Fragmented Portion */}
              {perfume.hasDecant && (
                <button
                  onClick={() => setFormat("decant")}
                  className={`relative p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    format === "decant"
                      ? "border-[#8E7860] bg-[#8E7860]/5 ring-1 ring-[#8E7860]"
                      : "border-[#DCD6C5] bg-[#FAF9F6] hover:bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between w-full">
                    <span className="text-[10px] font-black text-[#8E7860] uppercase tracking-wider">Porción ({portionName})</span>
                    {format === "decant" && <CheckCircle className="w-4 h-4 text-[#8E7860]" />}
                  </div>
                  <div className="mt-2.5">
                    <span className="text-[#2E251E] text-lg font-black">{selectedDecant.ml}ml</span>
                    <span className="text-[#7A6D60] text-xs font-bold ml-1.5 font-mono">seleccionado</span>
                  </div>
                  <div className="mt-1 text-sm font-black text-[#8E7860]">
                    S/. {selectedDecant.price.toFixed(2)}
                  </div>
                </button>
              )}

              {/* Option 2: Full Bottle */}
              <button
                onClick={() => setFormat("full")}
                className={`relative p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  format === "full"
                    ? "border-[#8E7860] bg-[#8E7860]/5 ring-1 ring-[#8E7860]"
                    : "border-[#DCD6C5] bg-[#FAF9F6] hover:bg-white"
                }`}
              >
                <div className="flex items-start justify-between w-full">
                  <span className="text-[10px] font-black text-[#8E7860] uppercase tracking-wider">Envase Completo</span>
                  {format === "full" && <CheckCircle className="w-5 h-5 text-[#8E7860]" />}
                </div>
                <div className="mt-2.5">
                  <span className="text-[#2E251E] text-lg font-black">100ml</span>
                  <span className="text-[#7A6D60] text-xs font-bold ml-1.5 font-mono">sellado original</span>
                </div>
                <div className="mt-1 text-sm font-black text-[#2E251E]">
                  S/. {perfume.priceFull.toFixed(2)}
                </div>
              </button>
            </div>

            {/* Multiple Decant Sizes Selector */}
            {format === "decant" && decantOpts.length > 0 && (
              <div className="bg-[#FAF8F3] border border-[#DECFC0]/80 rounded-2xl p-4 mb-6 animate-fade-in">
                <span className="text-[10px] font-black text-[#8E7860] uppercase tracking-widest block mb-2.5">
                  Medida disponible de tu porción ({portionName}):
                </span>
                <div className="grid grid-cols-3 gap-2.5">
                  {decantOpts.map((opt) => (
                    <button
                      key={opt.ml}
                      onClick={() => setSelectedDecant(opt)}
                      className={`py-3.5 px-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                        selectedDecant.ml === opt.ml
                          ? "border-[#8E7860] bg-white ring-1 ring-[#8E7860] shadow-sm font-black"
                          : "border-[#DCD6C5] bg-white/40 hover:bg-white text-[#7A6D60]"
                      }`}
                    >
                      <span className="text-xs font-black text-[#2E251E]">{opt.ml} ml</span>
                      <span className="text-[10px] font-mono font-bold text-[#8E7860]">S/. {opt.price.toFixed(2)}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* WHAT'S IN THE BAG CHECKLIST (Vintage Colors) */}
            <div className="border-t border-[#DECFC0] pt-4.5 mb-6">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#5C4D40] mb-3.5 flex items-center gap-1.5">
                <Gift className="w-4 h-4 text-[#8E7860]" /> ¿Qué se te entregará en la bolsa protectora?
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#5C4D40]">
                {format === "decant" ? (
                  <>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#526255]" />
                      Vial de vidrio sellado de {selectedDecant.ml}ml
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#526255]" />
                      Funda protectora & etiqueta personalizada
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#526255]" />
                      Frasco sellado original de 100ml
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#526255]" />
                      Caja oficial termo-sellada de origen
                    </li>
                  </>
                )}
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#526255]" />
                  Malla de satín de lujo protectora
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#526255]" />
                  Tarjeta de autenticidad Dulce Fetiche
                </li>
              </ul>
            </div>

            {/* SECURE DELIVERY NOTICE */}
            <div className="bg-[#FAF7EF] rounded-2xl border border-[#DECFC0] p-4 mb-6">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#405445] mb-2 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#405445]" /> Despacho a Domicilio y Puntos Seguros
              </h4>
              <p className="text-xs text-[#5C4C3E] leading-relaxed">
                📍 Ofrecemos <strong>entregas certificadas a domicilio</strong> para tu total seguridad. También organizamos encuentros presenciales custodiados en <strong>puntos específicos previamente coordinados y seguros</strong> (como centros comerciales con vigilancia privada o plazas principales) para garantizar tu tranquilidad.
              </p>
            </div>
          </div>

          {/* Checkout & WhatsApp Button bar */}
          <div className="border-t border-[#DECFC0] pt-5 flex flex-row items-center justify-between gap-4">
            
            <div className="text-left">
              <div className="text-[10px] uppercase font-bold text-[#8C7B6E] tracking-wider">Total estimado</div>
              <div className="text-2xl font-black text-[#8E7860] font-mono">
                S/. {total.toFixed(2)}
              </div>
            </div>

            <button
              onClick={handleWhatsAppRedirect}
              className="bg-[#3F5144] hover:bg-[#2C3B30] text-[#FAF7F2] font-black px-6 py-4 rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-wider"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              Ordenar su compra
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
