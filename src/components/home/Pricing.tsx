import { Check } from 'lucide-react';
import { motion } from 'motion/react';

const plans = [
  {
    name: 'Essencial',
    price: 'Grátis',
    description: 'Para criadores independentes e testes.',
    features: ['Até 5 vídeos por mês', 'Avatar padrão', 'Transcrição básica', 'Suporte via FAQ'],
    buttonText: 'Começar Agora',
    highlighted: false,
  },
  {
    name: 'Profissional',
    price: 'R$ 89',
    period: '/mês',
    description: 'Ideal para empresas e influenciadores.',
    features: ['Vídeos ilimitados', 'Customização do Avatar', 'Transcrição avançada', 'Prioridade no suporte', 'Download em 4K'],
    buttonText: 'Assinar Plano',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Sob Consulta',
    description: 'Solução sob medida para grandes portais.',
    features: ['Múltiplos avatares', 'API de integração', 'Gestor de conta dedicado', 'Treinamento de equipe'],
    buttonText: 'Falar com Vendas',
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors" id="prices">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Escolha o plano ideal para você</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">Temos opções flexíveis para todas as necessidades, do individual ao corporativo.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-8 rounded-3xl border transition-all ${
                plan.highlighted 
                  ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-500/20 scale-105 z-10' 
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white'
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-slate-900 font-bold py-1 px-4 rounded-full text-xs uppercase tracking-wider">
                  Mais Popular
                </span>
              )}
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <p className={`text-sm mb-6 ${plan.highlighted ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'}`}>{plan.description}</p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.period && <span className={plan.highlighted ? 'text-blue-100' : 'text-slate-500'}>{plan.period}</span>}
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check size={18} className={plan.highlighted ? 'text-blue-200' : 'text-blue-600 dark:text-blue-500'} />
                    <span className="text-sm font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-xl font-bold transition-all ${
                  plan.highlighted
                    ? 'bg-white text-blue-600 hover:bg-blue-50'
                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg dark:shadow-blue-900/20'
                }`}
              >
                {plan.buttonText}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
