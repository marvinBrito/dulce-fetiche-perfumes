import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { Home, ChevronRight, Menu, X, Calendar } from "lucide-react";
import { useState } from "react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const weeks = [1, 2, 3];
  const daysPerWeek = 5;

  const navItems = weeks.flatMap((week) =>
    Array.from({ length: daysPerWeek }, (_, i) => ({
      id: `w${week}d${i + 1}`,
      label: `Semana ${week} - Día ${i + 1}`,
      path: `/actividad/${week}/${i + 1}`,
    }))
  );

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Desktop & Mobile Header */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50 flex items-center justify-between px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-bold text-indigo-600 hover:opacity-80 transition-opacity">
          <Calendar className="w-6 h-6" />
          <span className="hidden sm:inline">Bitácora de 3 Semanas</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to="/"
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              location.pathname === "/" ? "bg-indigo-100 text-indigo-700" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Home className="w-4 h-4" />
            Inicio
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            title="Ver Actividades"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Slide-out Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-out Menu */}
      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed top-16 right-0 bottom-0 w-80 bg-white border-l border-slate-200 z-50 overflow-y-auto"
      >
        <div className="p-6">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Menú de Actividades</h2>
          {weeks.map((week) => (
            <div key={week} className="mb-6">
              <h3 className="text-lg font-bold text-slate-900 mb-3 ml-2">Semana {week}</h3>
              <div className="space-y-1">
                {navItems
                  .filter((item) => item.path.includes(`/actividad/${week}/`))
                  .map((item) => (
                    <Link
                      key={item.id}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm transition-all group ${
                        isActive(item.path)
                          ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronRight className={`w-4 h-4 transition-transform ${isActive(item.path) ? "rotate-90" : "group-hover:translate-x-1"}`} />
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </motion.aside>

      {/* Spacing for fixed header */}
      <div className="h-16" />
    </>
  );
}
