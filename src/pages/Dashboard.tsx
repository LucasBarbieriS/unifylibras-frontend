import { useState, useRef, ChangeEvent, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSearchParams } from 'react-router-dom';
import { 
  Video, 
  Star, 
  Upload, 
  History, 
  Search, 
  Plus, 
  FileVideo, 
  Loader2, 
  CheckCircle2,
  Play,
  Settings,
  CreditCard,
  Bell,
  Mail as MailIcon,
  Shield,
  User as UserIcon,
  Save
} from 'lucide-react';

type Tab = 'videos' | 'favorites' | 'upload' | 'profile';

export default function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = (searchParams.get('tab') as Tab) || 'videos';
  const setActiveTab = (tab: Tab) => setSearchParams({ tab });

  const [isUploading, setIsUploading] = useState(false);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [transcription, setTranscription] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [userName, setUserName] = useState(() => localStorage.getItem('user_name') || 'Lucas Soares');
  const [tempName, setTempName] = useState(userName);
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    setTempName(userName);
  }, [userName]);

  const handleUpdateName = (e: FormEvent) => {
    e.preventDefault();
    localStorage.setItem('user_name', tempName);
    setUserName(tempName);
    window.dispatchEvent(new Event('storage'));
    alert('Perfil atualizado com sucesso!');
  };

  const toggleFavorite = (id: number) => {
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
      localStorage.setItem('favorites', JSON.stringify(next));
      return next;
    });
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoPreview(url);
      startSimulation();
    }
  };

  const startSimulation = () => {
    setIsGenerating(true);
    setTranscription(null);
    
    setTimeout(() => {
      setIsGenerating(false);
      setTranscription(
        "Olá! Esta é uma simulação da transcrição do vídeo. No projeto final, este texto servirá de base para a sinalização do nosso Avatar 3D em Libras."
      );
    }, 3000);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'videos':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white transition-colors">Meus Vídeos</h2>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-slate-400 dark:text-slate-500" size={18} />
                <input 
                  type="text" 
                  placeholder="Buscar vídeos..." 
                  className="pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-64 transition-all"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden group shadow-md dark:shadow-lg dark:shadow-black/20 transition-all">
                  <div className="aspect-video bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                    <img 
                      src={`https://images.unsplash.com/photo-1516245834210-c4c142787335?w=400&h=225&fit=crop`} 
                      alt="Thumbnail" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 dark:opacity-80"
                    />
                    <div className="absolute inset-0 bg-black/20 dark:bg-black/40 group-hover:bg-black/40 dark:group-hover:bg-black/60 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <Play className="text-white fill-white" size={48} />
                    </div>
                    <button 
                      onClick={() => toggleFavorite(i)}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
                        favorites.includes(i) 
                        ? 'bg-yellow-500 text-white' 
                        : 'bg-white/20 text-white hover:bg-white/40'
                      }`}
                    >
                      <Star size={18} fill={favorites.includes(i) ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold mb-1 text-slate-900 dark:text-white">Aula de Introdução {i}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Processado em 12/05/2026</p>
                    <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-green-600 dark:text-green-400">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 size={14} /> Concluído
                      </span>
                      <button className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Ver Tradução</button>
                    </div>
                  </div>
                </div>
              ))}
              <button 
                onClick={() => setActiveTab('upload')}
                className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl aspect-video flex flex-col items-center justify-center gap-2 text-slate-400 dark:text-slate-500 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all hover:bg-blue-50 dark:hover:bg-blue-900/10"
              >
                <Plus size={32} />
                <span className="font-semibold">Novo Vídeo</span>
              </button>
            </div>
          </div>
        );
      case 'favorites':
        const favoriteItems = [0, 1, 2, 3].filter(id => favorites.includes(id));
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white transition-colors">Favoritos</h2>
            {favoriteItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favoriteItems.map((id) => (
                        <div key={id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden group shadow-md dark:shadow-lg dark:shadow-black/20 transition-all">
                            <div className="aspect-video bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                            <img 
                                src={id === 0 ? "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=225&fit=crop" : `https://images.unsplash.com/photo-1516245834210-c4c142787335?w=400&h=225&fit=crop`} 
                                alt="Thumbnail" 
                                className="w-full h-full object-cover opacity-90 dark:opacity-80"
                            />
                            <button 
                                onClick={() => toggleFavorite(id)}
                                className="absolute top-3 right-3 p-2 rounded-full bg-yellow-500 text-white backdrop-blur-md transition-all z-10"
                            >
                                <Star size={18} fill="currentColor" />
                            </button>
                            </div>
                            <div className="p-4">
                                <h4 className="font-bold mb-1 text-slate-900 dark:text-white">
                                    {id === 0 ? "Nova Tradução Gerada" : `Aula de Introdução ${id}`}
                                </h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    {id === 0 ? "Traduzido recentemente" : "Salvo nos favoritos"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <div className="w-20 h-20 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Star size={40} />
                    </div>
                    <h2 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">Sem favoritos ainda</h2>
                    <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">Salve seus vídeos traduzidos mais importantes aqui para acesso rápido.</p>
                </div>
            )}
          </div>
        );
      case 'upload':
        return (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center text-slate-900 dark:text-white">Nova Tradução</h2>
            
            {!videoPreview ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-3 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-16 flex flex-col items-center gap-4 cursor-pointer hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all"
              >
                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center">
                  <Upload size={32} />
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-slate-900 dark:text-white">Clique ou arraste um vídeo</p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Suporta MP4, MOV até 200MB</p>
                </div>
                <input 
                  type="file" 
                  hidden 
                  ref={fileInputRef} 
                  accept="video/*" 
                  onChange={handleFileUpload}
                />
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl relative border border-slate-200 dark:border-slate-800">
                  <video src={videoPreview} controls className="w-full h-full" />
                </div>

                <div className="flex justify-center">
                  <button 
                    onClick={() => {
                        setVideoPreview(null);
                        setTranscription(null);
                        setIsGenerating(false);
                    }}
                    className="text-slate-500 hover:text-red-500 dark:hover:text-red-400 font-medium text-sm transition-colors"
                  >
                    Remover vídeo e tentar outro
                  </button>
                </div>

                {isGenerating && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/40 rounded-2xl p-8 flex flex-col items-center gap-4">
                    <Loader2 className="animate-spin text-blue-600 dark:text-blue-400" size={32} />
                    <p className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest text-sm">Gerando tradução...</p>
                  </div>
                )}

                {transcription && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-lg dark:shadow-xl overflow-hidden relative transition-colors"
                  >
                    <div className="bg-blue-600 absolute top-0 left-0 w-1 h-full font-bold"></div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm uppercase tracking-wider">
                        <History size={16} />
                        Transcrição Gerada
                      </div>
                      <button 
                        onClick={() => toggleFavorite(0)} // Using ID 0 for the one being generated
                        className={`p-2 rounded-full transition-all ${
                          favorites.includes(0) 
                          ? 'bg-yellow-500 text-white' 
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:text-yellow-500'
                        }`}
                      >
                        <Star size={18} fill={favorites.includes(0) ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                    <p className="text-lg text-slate-700 dark:text-slate-200 leading-relaxed italic">
                      "{transcription}"
                    </p>
                    <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-4">
                        <button className="px-6 py-2 border border-slate-200 dark:border-slate-800 rounded-lg font-bold text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Editar Texto</button>
                        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transform hover:scale-105 transition-all shadow-lg dark:shadow-blue-900/20">Sincronizar Avatar 3D</button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>
        );
      case 'profile':
        return (
          <div className="max-w-4xl mx-auto space-y-8 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white transition-colors">Minha Conta</h2>
                <p className="text-slate-500 dark:text-slate-400">Gerencie suas informações e preferências.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {/* Informações Pessoais */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl">
                      <UserIcon size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Informações Pessoais</h3>
                  </div>

                  <form className="space-y-6" onSubmit={handleUpdateName}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-600 dark:text-slate-400">Nome de Exibição</label>
                        <input 
                          type="text" 
                          value={tempName}
                          onChange={(e) => setTempName(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-600 dark:text-slate-400">E-mail associado</label>
                        <div className="relative">
                          <MailIcon className="absolute left-4 top-3.5 text-slate-400" size={18} />
                          <input 
                            type="email" 
                            disabled
                            value="lucas.soares@unifylibras.com"
                            className="w-full pl-12 pr-4 py-3 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-500 rounded-xl cursor-not-allowed" 
                          />
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 hover:scale-[1.02] active:scale-95 transition-all shadow-lg dark:shadow-blue-900/20">
                      <Save size={18} />
                      Salvar Alterações
                    </button>
                  </form>
                </div>

                {/* Preferências */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-xl">
                      <Bell size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Notificações e Alertas</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all">
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white text-base">Alertas por E-mail</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Fique por dentro das novidades da conta.</p>
                      </div>
                      <button className="w-12 h-6 bg-blue-600 rounded-full relative transition-colors shadow-inner">
                        <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all">
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white text-base">Traduções Concluídas</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Notificar quando o avatar terminar de sinalizar.</p>
                      </div>
                      <button className="w-12 h-6 bg-slate-200 dark:bg-slate-700 rounded-full relative transition-colors">
                        <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1"></div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Meu Plano */}
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 text-white shadow-xl shadow-blue-500/20 relative overflow-hidden group">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-white opacity-10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                  
                  <div className="flex items-center gap-2 mb-6">
                    <CreditCard size={20} />
                    <span className="font-bold uppercase tracking-widest text-xs">Assinatura Ativa</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-1">Plano Profissional</h3>
                  <p className="text-blue-100 text-sm mb-8">Renova em 25 de Maio, 2026</p>

                  <div className="space-y-3 mb-8">
                    <div className="flex justify-between text-sm font-bold">
                      <span className="flex items-center gap-2">Consumo mensal</span>
                      <span>45%</span>
                    </div>
                    <div className="w-full bg-blue-800/50 h-3 rounded-full overflow-hidden shadow-inner">
                      <div className="bg-white h-full w-[45%] transition-all duration-1000"></div>
                    </div>
                    <p className="text-xs text-blue-100 text-right italic">45 de 100 minutos utilizados</p>
                  </div>

                  <button className="w-full bg-white text-blue-600 py-3 rounded-xl font-bold hover:bg-blue-50 hover:shadow-lg transform active:scale-95 transition-all">
                    Fazer Upgrade
                  </button>
                </div>

                {/* Segurança */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-4 text-slate-900 dark:text-white font-bold">
                    <Shield size={20} className="text-green-500" />
                    Segurança
                  </div>
                  <button className="w-full text-left p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all text-sm font-medium text-slate-600 dark:text-slate-300">
                    Alterar senha
                  </button>
                  <button className="w-full text-left p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all text-sm font-medium text-slate-600 dark:text-slate-300">
                    Autenticação em 2 fatores
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-white dark:bg-slate-950 flex transition-colors">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex w-72 bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex-col p-6 sticky top-16 h-[calc(100vh-64px)] transition-colors">
        <button 
            onClick={() => setActiveTab('profile')}
            className={`user-profile mb-10 flex items-center gap-4 p-2 rounded-2xl transition-all hover:bg-slate-200 dark:hover:bg-slate-800/80 ${activeTab === 'profile' ? 'bg-slate-200 dark:bg-slate-800' : ''}`}
        >
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                {userName.charAt(0)}
            </div>
            <div className="text-left overflow-hidden">
                <h3 className="font-bold text-slate-900 dark:text-white truncate transition-colors">{userName}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 transition-colors">Plano Profissional</p>
            </div>
        </button>

        <nav className="space-y-1">
          <button 
            onClick={() => setActiveTab('videos')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'videos' ? 'bg-blue-600 text-white shadow-lg dark:shadow-blue-500/20' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            <History size={20} />
            Meus Vídeos
          </button>
          <button 
            onClick={() => setActiveTab('favorites')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'favorites' ? 'bg-blue-600 text-white shadow-lg dark:shadow-blue-500/20' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            <Star size={20} />
            Favoritos
          </button>
          <button 
            onClick={() => setActiveTab('upload')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'upload' ? 'bg-blue-600 text-white shadow-lg dark:shadow-blue-500/20' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            <Plus size={20} />
            Nova Tradução
          </button>
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="bg-slate-100 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 transition-colors">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Uso mensal</p>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden mb-2">
                    <div className="bg-blue-600 dark:bg-blue-500 h-full w-[45%]"></div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 transition-colors">45 de 100 minutos</p>
            </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="container mx-auto">
          {/* Mobile Bottom Nav */}
          <div className="lg:hidden fixed bottom-4 left-4 right-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-around p-3 z-50 shadow-xl dark:shadow-2xl transition-colors">
            <button onClick={() => setActiveTab('videos')} className={`p-2 rounded-lg transition-colors ${activeTab === 'videos' ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30' : 'text-slate-400 dark:text-slate-500'}`}>
                <History size={24} />
            </button>
            <button onClick={() => setActiveTab('favorites')} className={`p-2 rounded-lg transition-colors ${activeTab === 'favorites' ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30' : 'text-slate-400 dark:text-slate-500'}`}>
                <Star size={24} />
            </button>
            <button onClick={() => setActiveTab('upload')} className={`p-2 rounded-lg transition-colors ${activeTab === 'upload' ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30' : 'text-slate-400 dark:text-slate-500'}`}>
                <Plus size={24} />
            </button>
            <button onClick={() => setActiveTab('profile')} className={`p-2 rounded-lg transition-colors ${activeTab === 'profile' ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30' : 'text-slate-400 dark:text-slate-500'}`}>
                <Settings size={24} />
            </button>
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
