import { useState } from "react";
import { 
  Sparkles, 
  Search, 
  MapPin, 
  ShieldCheck, 
  MessageSquare, 
  Filter, 
  Star, 
  HelpCircle
} from "lucide-react";
import { Perfume } from "./types";
import DecantsExplainer from "./components/DecantsExplainer";
import PerfumeDetailModal from "./components/PerfumeDetailModal";

import { INITIAL_PERFUMES } from "./utils/perfumesData";

export default function App() {
  const [perfumes] = useState<Perfume[]>(() =>
    INITIAL_PERFUMES.map((p) => {
      if (!p.hasDecant || !p.priceDecant) return p;
      const price10 = p.priceDecant;
      const price3 = price10 === 8.99 ? 1.99 : price10 === 9.99 ? 2.99 : price10 === 10.99 ? 2.99 : price10 === 11.99 ? 3.99 : price10 === 13.99 ? 4.99 : 2.99;
      return {
        ...p,
        decantOptions: [
          { ml: 10, price: price10 },
          { ml: 3, price: price3 }
        ]
      };
    })
  );
  
  // Customization Variables
  const [portionName, setPortionName] = useState<string>("Decants");
  const [contactPhone, setContactPhone] = useState<string>("+593 97 952 6685");
  const [isEditingPhone, setIsEditingPhone] = useState<boolean>(false);
  const [tempPhone, setTempPhone] = useState<string>(contactPhone);

  // Filter Variables
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFamily, setSelectedFamily] = useState("all");
  const [portionOnly, setPortionOnly] = useState<boolean>(false);

  // Selected Perfume for Modal
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);

  const handlePhoneSave = () => {
    setContactPhone(tempPhone || "+593 97 952 6685");
    setIsEditingPhone(false);
  };

  const families = ["all", "Ámbar", "Aromática", "Frutal", "Amaderada", "Cítrica", "Floral", "Gourmand", "Oriental"];

  const filteredPerfumes = perfumes.filter((p) => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFamily = 
      selectedFamily === "all" || 
      p.family.toLowerCase().includes(selectedFamily.toLowerCase());

    const matchesPortion = !portionOnly || p.hasDecant;

    return matchesSearch && matchesFamily && matchesPortion;
  });

  return (
    <div className="bg-[#FDFBF7] min-h-screen text-[#2E251E] selection:bg-[#E2D6BF] selection:text-[#2E251E] font-sans pb-16">
      
      {/* Decent Header Announcement in natural vintage tones */}
      <div className="bg-[#8E7860] py-3 px-4 text-center border-b border-[#725F4C]">
        <p className="text-[#FAF7F2] text-xs font-bold tracking-wide flex items-center justify-center gap-1.5 flex-wrap">
          <Sparkles className="w-3.5 h-3.5 text-[#E6CDAA] animate-pulse" />
          ENTREGAS EXCLUSIVAS Y SEGURAS: Despachos directos a domicilio y entregas en puntos coordinados transitados.
        </p>
      </div>

      {/* Retro Classic Navigation Header */}
      <header className="border-b border-[#DECFC0] bg-[#FDFBF7]/90 backdrop-blur-md sticky top-0 z-40 px-6 py-4.5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
          {/* Logo Identity */}
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#6E5D4F] rounded-2xl shadow-sm text-[#FAF7F2]">
              <span className="text-[15px] font-black tracking-widest uppercase">DF</span>
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-[#2E251E] uppercase leading-none">
                DULCE FETICHE
              </h1>
              <p className="text-[10px] uppercase font-bold tracking-widest text-[#8C7B6E] mt-1">Alta Perfumería en Porciones</p>
            </div>
          </div>

          {/* Static Contact Badge linking directly to WhatsApp */}
          <a 
            href={`https://wa.me/${contactPhone.replace(/\D/g, "")}`}
            target="_blank"
            rel="noreferrer"
            className="bg-[#FAF6EE] hover:bg-[#EBE5D3] border border-[#DECFC0] px-4 py-2 rounded-2xl flex items-center gap-2 text-xs text-[#2E251E] font-bold transition-all shadow-sm shrink-0"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[#8C7B6E] font-extrabold uppercase text-[9px] tracking-widest">WhatsApp:</span>
            <span className="font-mono">{contactPhone}</span>
          </a>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">

        {/* SEARCH AND VINTAGE FILTERS */}
        <section className="bg-[#FAF6EE] border border-[#DECFC0] p-6 rounded-3xl mb-8">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Elegant Search bar */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C7B6E]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar perfume por nombre, marca o nota de olor..."
                className="w-full bg-white border border-[#DECFC0] focus:border-[#8E7860] rounded-2xl pl-11 pr-4 py-3.5 text-xs text-[#2E251E] placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#8E7860]/20 transition-all font-medium"
              />
            </div>

            {/* Vintage style pill filters */}
            <div className="flex flex-wrap items-center gap-2">
              {families.map((family) => (
                <button
                  key={family}
                  onClick={() => setSelectedFamily(family)}
                  className={`px-4 py-2.5 rounded-xl text-[10px] font-black tracking-wider uppercase transition-all cursor-pointer ${
                    selectedFamily === family
                      ? "bg-[#6E5D4F] text-[#FAF7F2] shadow-sm"
                      : "bg-[#FAF9F5] border border-[#DECFC0] text-[#6E5D4F] hover:bg-white"
                  }`}
                >
                  {family === "all" ? "Todas las Familias" : family}
                </button>
              ))}
            </div>

            {/* Quick portions checkbox toggler */}
            <button
              onClick={() => setPortionOnly(!portionOnly)}
              className={`px-4 py-2.5 rounded-xl text-[10px] font-black tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer border ${
                portionOnly
                  ? "bg-[#8E7860]/15 border-[#8E7860] text-[#6E5D4F]"
                  : "bg-[#FAF9F5] border-[#DECFC0] text-[#8C7B6E] hover:text-[#2E251E]"
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              Solo {portionName}
            </button>

          </div>
        </section>

        {/* PRODUCTS LIST GRID */}
        <section className="mb-12">
          {filteredPerfumes.length === 0 ? (
            <div className="text-center py-16 bg-[#FAF6EE]/40 rounded-3xl border border-[#DECFC0]">
              <HelpCircle className="w-10 h-10 text-[#8C7B6E] mx-auto mb-3 animate-bounce" />
              <p className="text-[#5C4D40] text-xs font-bold leading-none">No encontramos perfumes que coincidan con tu búsqueda.</p>
              <button 
                onClick={() => { setSearchQuery(""); setSelectedFamily("all"); setPortionOnly(false); }}
                className="text-[#8E7860] underline text-[10px] font-black uppercase mt-2 hover:text-[#6E5D4F] cursor-pointer"
              >
                Limpiar Filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPerfumes.map((p) => (
                <div 
                  key={p.id}
                  onClick={() => setSelectedPerfume(p)}
                  className="group relative bg-white border border-[#E2DCBE] rounded-3xl p-6 hover:border-[#8E7860] transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-sm hover:shadow"
                >
                  <div>
                    {/* Header Card line */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#8C7B6E]">
                        {p.brand}
                      </span>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-[#8E7860] bg-[#8E7860]/10 px-2.5 py-0.5 rounded-full">
                        <Star className="w-3 h-3 fill-current text-[#C4A078]" />
                        {p.rating}
                      </div>
                    </div>

                    {/* Perfume image preview */}
                    <div 
                      className="h-56 w-full rounded-2xl relative mb-4 overflow-hidden flex items-end justify-start border border-[#EBE4D5]"
                      style={{ background: p.boxColor }}
                    >
                      {p.imageBox ? (
                        <img
                          src={p.imageBox}
                          alt={p.name}
                          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0" />
                          <span className="text-4xl text-white/10 group-hover:scale-125 transition-transform duration-300 font-bold select-none absolute inset-0 flex items-center justify-center">
                            ⚜️
                          </span>
                        </>
                      )}

                      {/* Overlay con nombre del perfume */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      <div className="relative z-10 p-3 w-full">
                        <div className="inline-block mb-1">
                          <span className="bg-[#1C1714]/80 px-2 py-0.5 rounded text-[8px] font-mono tracking-widest text-[#FAF7F2] border border-white/5">
                            CLAVE 3D
                          </span>
                        </div>
                        <h4 className="text-sm font-black text-white uppercase tracking-wider leading-tight">{p.name}</h4>
                        <span className="text-[7px] font-mono text-white/75 uppercase block tracking-widest mt-0.5">EST. HISTÓRICO</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-black text-[#2E251E] group-hover:text-[#8E7860] transition-colors leading-tight mb-2">
                      {p.name}
                    </h3>
                    
                    <p className="text-[#5C4D40] text-xs leading-relaxed mb-4 line-clamp-2">
                      {p.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      <span className="bg-[#FAF7EF] text-[#8C7B6E] text-[9px] font-bold px-2 py-1 rounded-lg border border-[#DECFC0]/60">
                        👃 {p.family}
                      </span>
                      {p.hasDecant && (
                        <span className="bg-[#8E7860]/10 text-[#8E7860] text-[9px] font-black px-2 py-1 rounded-lg border border-[#8E7860]/20">
                          🧪 {portionName} (10ml, 5ml, 3ml)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Prices & Action Button footer */}
                  <div className="border-t border-[#DECFC0]/60 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      {p.hasDecant && p.decantOptions && (
                        <div className="flex flex-wrap items-center gap-1">
                          <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#8E7860] shrink-0">{portionName}:</span>
                          <div className="flex flex-wrap gap-1">
                            {p.decantOptions.map((opt) => (
                              <span key={opt.ml} className="bg-[#8E7860]/5 border border-[#8E7860]/20 text-[#5C4D40] px-1.5 py-0.5 rounded-md text-[9px] font-mono whitespace-nowrap">
                                <strong>{opt.ml}ml</strong> ${opt.price.toFixed(2)}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="text-[10px] text-[#5C4D3E]">
                        Frasco 100ml: <strong className="text-[#8E7860] font-black">${p.priceFull.toFixed(2)}</strong>
                      </div>
                    </div>

                    <span className="bg-[#6E5D4F] hover:bg-[#5C4E42] text-[#FAF7F2] font-semibold text-[10px] uppercase px-4 py-2.5 rounded-xl transition-all shadow-sm shrink-0 self-end sm:self-center">
                      Ver Detalles
                    </span>
                  </div>

                </div>
              ))}
            </div>
          )}
        </section>

        {/* HERO COVER STAGE */}
        <section className="relative rounded-3xl overflow-hidden mb-12 bg-[#FAF6EE] border border-[#DECFC0] p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#8E7860]/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-xl">
            <span className="text-[9px] font-black tracking-widest text-[#8E7860] uppercase bg-[#8E7860]/10 px-3.5 py-1.5 rounded-full inline-block mb-4 border border-[#8E7860]/20">
              ⚜️ Perfumes de Diseñador & Muestras Fraccionadas
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-[#2E251E] leading-none tracking-tight mb-4">
              La Esencia del Lujo, <br className="hidden md:block" /> a tu Alcance
            </h2>
            <p className="text-sm text-[#5C4D40] leading-relaxed mb-6">
              Explora místicas y legendarias fragancias en envase tradicional completo, o adquiérelas en cómodas porciones <strong className="text-[#8E7860]">{portionName}</strong> preparadas asépticamente bajo estándares de alta clase. Lujo accesible y con total garantía.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div className="bg-white/60 p-3 rounded-2xl border border-[#DECFC0]">
                <div className="text-[#4E6254] font-bold text-xs uppercase tracking-wider mb-0.5 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#4E6254]" /> 100% Auténtico
                </div>
                <p className="text-[10px] text-[#7A6D60]">Líquidos originales extraídos de forma directa.</p>
              </div>
              <div className="bg-white/60 p-3 rounded-2xl border border-[#DECFC0]">
                <div className="text-[#8E7860] font-bold text-xs uppercase tracking-wider mb-0.5 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> Entregas Seguras
                </div>
                <p className="text-[10px] text-[#7A6D60]">Envíos programados ó entrega resguardada.</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#DECFC0] rounded-3xl p-6 w-full max-w-sm flex flex-col gap-4 shadow-sm">
            <h3 className="text-xs uppercase tracking-widest text-[#8C7B6E] font-bold pb-2 border-b border-[#EBE4D5]">
              💬 Asesoría y Consultas
            </h3>
            <p className="text-xs text-[#5C4D3E] leading-relaxed">
              ¿Quieres un catálogo en PDF, buscas una fragancia específica de nicho que no está listada, o deseas coordinar un pedido al instante? 
            </p>
            <a 
              href={`https://wa.me/${contactPhone.replace(/\D/g, "")}`}
              target="_blank"
              rel="noreferrer"
              className="bg-[#3F5144] hover:bg-[#2C3B30] text-[#FAF7F2] font-semibold tracking-wider uppercase py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-[11px] font-bold"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              Chatear Directo por WhatsApp
            </a>
          </div>
        </section>

        {/* DECANT EDUCATIONAL EXPLAINER */}
        <DecantsExplainer 
          portionName={portionName} 
          perfumes={perfumes}
          onSelectPerfume={(perfume) => setSelectedPerfume(perfume)}
        />

      </main>

      {/* DETAIL MODAL SANDBOX */}
      {selectedPerfume && (
        <PerfumeDetailModal
          perfume={selectedPerfume}
          onClose={() => setSelectedPerfume(null)}
          portionName={portionName}
          contactPhone={contactPhone}
        />
      )}

      {/* RETRO CLASSIC HERITAGE FOOTER */}
      <footer className="max-w-7xl mx-auto border-t border-[#DECFC0] pt-12 mt-16 px-6 text-center">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#E1D9C6]">
          <div className="text-left">
            <h3 className="text-sm font-black tracking-widest text-[#2E251E] uppercase mb-1">DULCE FETICHE</h3>
            <p className="text-xs text-[#8C7B6E]">Distribuidor certificado independiente de fragancias legítimas fraccionadas.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-xs text-[#5C4D40]">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#526255]" /> Perfumes Genuinos Garantizados</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-[#8E7860]" /> Puntos de Encuentro Seguros</span>
          </div>
        </div>
        <p className="text-[11px] text-[#8C7B6E] mt-8 font-mono">
          &copy; {new Date().getFullYear()} Dulce Fetiche. Diseñado con fina estética heritage y retro vintage. Todos los derechos reservados.
        </p>
      </footer>

    </div>
  );
}