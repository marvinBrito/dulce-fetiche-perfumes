import { useParams, Navigate, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Calendar, Info, Target, Lightbulb } from "lucide-react";

export default function ActivityDetail() {
  const { week, day } = useParams<{ week: string; day: string }>();

  const weekNum = parseInt(week || "0");
  const dayNum = parseInt(day || "0");

  if (isNaN(weekNum) || isNaN(dayNum) || weekNum < 1 || weekNum > 3 || dayNum < 1 || dayNum > 5) {
    return <Navigate to="/" replace />;
  }

  // Next and previous buttons logic
  const prevPath = dayNum > 1 
    ? `/actividad/${weekNum}/${dayNum - 1}` 
    : weekNum > 1 
      ? `/actividad/${weekNum - 1}/5` 
      : "/";

  const nextPath = dayNum < 5 
    ? `/actividad/${weekNum}/${dayNum + 1}` 
    : weekNum < 3 
      ? `/actividad/${weekNum + 1}/1` 
      : null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8"
      >
        <Link 
          to="/" 
          className="inline-flex items-center text-slate-500 hover:text-indigo-600 font-medium transition-colors mb-4 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Volver al Inicio
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <Calendar className="w-6 h-6 text-indigo-500" />
          <span className="text-indigo-600 font-bold uppercase tracking-widest text-sm">Semana {week} • Día {day}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
          Actividad del Día {day}: <span className="text-indigo-600 underline decoration-indigo-200 decoration-8 underline-offset-4">Tema Central</span>
        </h1>
      </motion.div>

      <div className="space-y-8">
        {/* Sections of the activity */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-4 text-indigo-600">
            <Target className="w-5 h-5" />
            <h2 className="text-xl font-bold">Objetivo de Hoy</h2>
          </div>
          <p className="text-slate-600 text-lg leading-relaxed">
            En esta sesión nos enfocaremos en desarrollar las habilidades necesarias para completar el desafío de la semana. 
            Aprenderás conceptos clave y los pondrás en práctica mediante ejercicios guiados.
          </p>
        </motion.section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-900 text-white p-8 rounded-3xl"
          >
            <div className="flex items-center gap-2 mb-4 text-indigo-400">
              <Info className="w-5 h-5" />
              <h3 className="text-lg font-bold">Instrucciones</h3>
            </div>
            <ul className="space-y-4 text-slate-300">
              <li className="flex items-start gap-3">
                <span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">1</span>
                Lee el material de apoyo adjunto.
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">2</span>
                Realiza el cuestionario de diagnóstico.
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">3</span>
                Sube tu evidencia al portal web.
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-amber-50 border border-amber-100 p-8 rounded-3xl"
          >
            <div className="flex items-center gap-2 mb-4 text-amber-600">
              <Lightbulb className="w-5 h-5" />
              <h3 className="text-lg font-bold">Tip del Día</h3>
            </div>
            <p className="text-amber-800 leading-relaxed italic">
              "Recuerda tomar descansos de 5 minutos cada 25 minutos de trabajo concentrado (técnica Pomodoro) para mantener tu mente fresca y receptiva."
            </p>
          </motion.div>
        </div>

        {/* Navigation Buttons */}
        <div className="pt-12 flex items-center justify-between border-t border-slate-200">
          <Link
            to={prevPath}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-5 h-5" />
            Anterior
          </Link>

          {nextPath ? (
            <Link
              to={nextPath}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100"
            >
              Siguiente
              <ArrowRight className="w-5 h-5" />
            </Link>
          ) : (
            <div className="px-6 py-3 text-slate-400 font-bold">Fin de la Bitácora</div>
          )}
        </div>
      </div>
    </div>
  );
}
