import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { PlayCircle, ShieldCheck, Globe, HandMetal } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32 bg-white dark:bg-slate-950 transition-colors">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 blur-3xl opacity-20 dark:opacity-10 pointer-events-none">
        <div className="w-[500px] h-[500px] bg-blue-600 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-4 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-6">
              Acessibilidade Digital em Libras
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight mb-8">
              Transforme seus vídeos em <span className="text-blue-600 dark:text-blue-500">acessibilidade real</span> com o UnifyLibras.
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
              Utilizamos avatares 3D realistas para traduzir seus conteúdos digitais automaticamente, proporcionando inclusão para a comunidade surda em todo o mundo.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/auth"
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg dark:shadow-blue-900/40"
              >
                Começar Agora
              </Link>
              <button className="w-full sm:w-auto px-8 py-4 flex items-center justify-center gap-2 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-900 transition-all rounded-xl border border-slate-200 dark:border-slate-800">
                <PlayCircle size={24} className="text-blue-600 dark:text-blue-500" />
                Ver Demonstração
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-left"
          >
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center mb-4">
                <Globe size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">Tradução Global</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Tradução automática de conteúdos de áudio e vídeo em diversos idiomas para Libras.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center mb-4">
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">Precisão Gramatical</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Nossos modelos respeitam as nuances gramaticais e a estrutura visual da Libras.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center mb-4">
                <HandMetal size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">100% Acessível</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Plataforma desenvolvida seguindo as diretrizes WCAG para máxima inclusão.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
