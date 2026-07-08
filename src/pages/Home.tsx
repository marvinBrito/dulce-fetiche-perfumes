import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { BookOpen, CheckCircle, Clock, Sparkles } from "lucide-react";

export default function Home() {
  const weeks = [1, 2, 3];
  
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
          <Sparkles className="w-3 h-3" />
          Proceso Formativo
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
          Bienvenido a tu Bitácora
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Explora las actividades diseñadas para acompañar tu crecimiento y aprendizaje durante las próximas tres semanas. 
          Selecciona una etapa para comenzar.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {weeks.map((week, idx) => (
          <motion.div
            key={week}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-100 group-hover:scale-110 transition-transform">
              {week === 1 ? <BookOpen /> : week === 2 ? <CheckCircle /> : <Clock />}
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Semana {week}</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
              {week === 1 
                ? "Fundamentos e Introducción. Establece las bases de lo que aprenderás."
                : week === 2 
                ? "Profundización y Práctica. Aplica los conceptos en escenarios reales."
                : "Consolidación y Cierre. Repasa tus logros y planifica los siguientes pasos."}
            </p>
            
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((day) => (
                <Link
                  key={day}
                  to={`/actividad/${week}/${day}`}
                  className="flex items-center justify-between text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors p-2 hover:bg-slate-50 rounded-lg"
                >
                  <span>Día {day}</span>
                  <div className="h-1 w-1 rounded-full bg-slate-300" />
                </Link>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <footer className="mt-20 border-t border-slate-200 pt-10 text-center text-slate-400 text-sm">
        &copy; {new Date().getFullYear()} Bitácora de Aprendizaje - 3 Semanas
      </footer>
    </div>
  );
}
