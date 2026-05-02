import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Send, Mail, MapPin, Phone, MessageSquare } from 'lucide-react';

const faqs = [
  {
    question: 'Como funciona a tradução para Libras?',
    answer: 'Nossa plataforma utiliza algoritmos de processamento de linguagem natural para transcrever o áudio do seu vídeo e, em seguida, mapear esse texto para movimentos gramaticalmente corretos em Libras, executados pelo nosso avatar 3D.'
  },
  {
    question: 'Quais formatos de vídeo são suportados?',
    answer: 'Atualmente suportamos os formatos MP4, MOV e AVI. Recomendamos vídeos com áudio nítido para uma transcrição mais precisa.'
  },
  {
    question: 'Posso baixar os vídeos traduzidos?',
    answer: 'Sim! Dependendo do seu plano, você pode baixar o vídeo com o avatar sobreposto ou a trilha de tradução separada para edição profissional.'
  },
  {
    question: 'O UnifyLibras funciona em tempo real?',
    answer: 'Para eventos ao vivo, oferecemos o plano Enterprise com integração especial via API e latência reduzida.'
  }
];

export default function Support() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeSupportTab, setActiveSupportTab] = useState<'faq' | 'contact'>('faq');

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-950 py-12 transition-colors">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Como podemos ajudar?</h1>
            <p className="text-slate-600 dark:text-slate-400">Encontre respostas rápidas ou entre em contato com nosso time de especialistas.</p>
        </div>

        <div className="flex bg-white dark:bg-slate-900 p-1 rounded-2xl shadow-md dark:shadow-xl mb-12 border border-slate-200 dark:border-slate-800 transition-colors">
            <button 
                onClick={() => setActiveSupportTab('faq')}
                className={`flex-1 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${activeSupportTab === 'faq' ? 'bg-blue-600 text-white shadow-lg dark:shadow-blue-500/20' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            >
                <MessageSquare size={20} />
                FAQ (Dúvidas)
            </button>
            <button 
                onClick={() => setActiveSupportTab('contact')}
                className={`flex-1 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${activeSupportTab === 'contact' ? 'bg-blue-600 text-white shadow-lg dark:shadow-blue-500/20' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            >
                <Mail size={20} />
                Fale Conosco
            </button>
        </div>

        <AnimatePresence mode="wait">
          {activeSupportTab === 'faq' ? (
            <motion.div 
              key="faq"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm dark:shadow-lg hover:border-blue-500/50 transition-colors"
                >
                  <button 
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full text-left p-6 flex items-center justify-between font-bold text-lg text-slate-900 dark:text-white transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown 
                        className={`text-slate-400 dark:text-slate-500 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''}`} 
                        size={24} 
                    />
                  </button>
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/50 pt-4 transition-colors">
                            {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="contact"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
                <div className="md:col-span-2 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm dark:shadow-xl transition-colors">
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 transition-colors">Nome</label>
                                <input type="text" placeholder="Seu nome" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 transition-colors">E-mail</label>
                                <input type="email" placeholder="seu@email.com" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 transition-colors">Assunto</label>
                            <input type="text" placeholder="Como podemos ajudar?" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 transition-colors">Mensagem</label>
                            <textarea rows={4} placeholder="Sua mensagem..." className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none placeholder:text-slate-400 dark:placeholder:text-slate-500"></textarea>
                        </div>
                        <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg dark:shadow-blue-900/20 flex items-center justify-center gap-2">
                            <Send size={20} />
                            Enviar Mensagem
                        </button>
                    </form>
                </div>

                <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm dark:shadow-xl transition-colors">
                        <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center mb-4 transition-colors">
                            <MapPin size={20} />
                        </div>
                        <h4 className="font-bold mb-1 text-slate-900 dark:text-white transition-colors">Nosso Escritório</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 transition-colors">Av. Paulista, 1000 - São Paulo, SP</p>
                    </div>
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm dark:shadow-xl transition-colors">
                        <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center mb-4 transition-colors">
                            <Phone size={20} />
                        </div>
                        <h4 className="font-bold mb-1 text-slate-900 dark:text-white transition-colors">Telefone</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 transition-colors">+55 (11) 4002-8922</p>
                    </div>
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm dark:shadow-xl transition-colors">
                        <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center mb-4 transition-colors">
                            <Mail size={20} />
                        </div>
                        <h4 className="font-bold mb-1 text-slate-900 dark:text-white transition-colors">E-mail</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 transition-colors">contato@unifylibras.com</p>
                    </div>
                </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
