import React, { useState, useEffect, useRef } from 'react';

// ============================================================================
// TIPAGEM TYPESCRIPT
// ============================================================================

export type ProjectCategoryTab = 'all' | 'sites' | 'ai' | 'marketing';

export interface WebsiteProject {
  id: string;
  title: string;
  category: string;
  domain: string;
  url: string;
  image: string;
  fallbackImage: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
}

export interface NicheInfo {
  id: string;
  icon: string;
  tag: string;
  name: string;
  description: string;
  metric: string;
  userPrompt: string;
  aiResponse: string;
}

// ============================================================================
// DADOS DO PORTFÓLIO
// ============================================================================

export const SITES_PROJECTS: WebsiteProject[] = [
  {
    id: 'digital-designer',
    title: 'Digital Designer',
    category: 'Landing Page / Portfólio',
    domain: 'digitaldesigner.design',
    url: 'https://digitaldesigner.design',
    image: '/projects/lp-produto-designer.webp',
    fallbackImage: '/projects/lp-produto-designer.jpg'
  },
  {
    id: 'acelera-dividendos',
    title: 'Acelera Dividendos',
    category: 'Landing Page / Finanças',
    domain: 'dividendos.com.br',
    url: 'https://dividendos.com.br',
    image: '/projects/lp-financas-dividendos.webp',
    fallbackImage: '/projects/lp-financas-dividendos.jpg'
  },
  {
    id: 'crossarena',
    title: 'CrossArena Studio',
    category: 'Landing Page / Fitness',
    domain: 'crossarena.com',
    url: 'https://crossarena.com',
    image: '/projects/lp-fitness-crossarena.webp',
    fallbackImage: '/projects/lp-fitness-crossarena.jpg'
  },
  {
    id: 'semana-gain-10k',
    title: 'Semana Gain 10k',
    category: 'Landing Page / Finanças',
    domain: 'semanagain10k.com.br',
    url: 'https://semanagain10k.com.br',
    image: '/projects/lp-financas-gain10k.webp',
    fallbackImage: '/projects/lp-financas-gain10k.jpg'
  },
  {
    id: 'attorney-law',
    title: 'Attorney & Law Advocacia',
    category: 'Landing Page / Jurídico',
    domain: 'attorneylaw.adv.br',
    url: 'https://attorneylaw.adv.br',
    image: '/projects/lp-juridico-criminal.webp',
    fallbackImage: '/projects/lp-juridico-criminal.jpg'
  },
  {
    id: 'mentoria-criminal',
    title: 'Mentoria Advogado Criminal',
    category: 'Landing Page / Advocacia',
    domain: 'joaoquintino.adv.br',
    url: 'https://joaoquintino.adv.br',
    image: '/projects/lp-juridico-mentoria.webp',
    fallbackImage: '/projects/lp-juridico-mentoria.jpg'
  },
  {
    id: 'posturologia',
    title: 'Posturologia Clínica',
    category: 'Landing Page / Saúde',
    domain: 'posturologia.com.br',
    url: 'https://posturologia.com.br',
    image: '/projects/lp-saude-posturologia.webp',
    fallbackImage: '/projects/lp-saude-posturologia.jpg'
  },
  {
    id: 'assessoria-juridica',
    title: 'Assessoria Jurídica',
    category: 'Landing Page / Jurídico',
    domain: 'assessoriajuridica.adv.br',
    url: 'https://assessoriajuridica.adv.br',
    image: '/projects/lp-juridico-empresarial.webp',
    fallbackImage: '/projects/lp-juridico-empresarial.jpg'
  }
];

export const NICHES: NicheInfo[] = [
  {
    id: 'delivery',
    icon: '🍕',
    tag: 'Alimentação & Varejo',
    name: 'Restaurantes & Delivery',
    description: 'Cardápio interativo, anotação automática de pedidos com personalizações, cálculo dinâmico de taxa pelo CEP e envio direto para produção.',
    metric: 'Zero pedidos perdidos em horários de pico',
    userPrompt: 'Como o Agente IA funciona para Delivery e Restaurantes?',
    aiResponse: 'Para restaurantes e delivery, o Agente IA envia o cardápio interativo, anota pedidos com adicionais, calcula taxa pelo CEP e envia o pedido pronto para a cozinha! 🍕🛵'
  },
  {
    id: 'saude',
    icon: '🩺',
    tag: 'Saúde & Bem-Estar',
    name: 'Clínicas & Consultórios',
    description: 'Triagem ágil de sintomas, consulta a agendas por especialista, confirmações automáticas com 24h de antecedência e reagendamentos.',
    metric: 'Redução de até 70% nas faltas e no-shows',
    userPrompt: 'Vocês têm solução para Clínicas e Consultórios médicos?',
    aiResponse: 'Com certeza! O agente faz triagem prévia do paciente, consulta a agenda dos médicos em tempo real, confirma consultas e reduz o no-show em até 70%! 🩺📅'
  },
  {
    id: 'imobiliaria',
    icon: '🏢',
    tag: 'Mercado Imobiliário',
    name: 'Imobiliárias & Corretores',
    description: 'Filtros prévios por orçamento, tipo de imóvel e bairro, envio de fotos e agendamento de visitas presenciais direto na pauta do corretor.',
    metric: 'Leads qualificados e aquecidos para visita',
    userPrompt: 'Como funciona a qualificação para Imobiliárias e Corretores?',
    aiResponse: 'A IA atua 24/7: identifica se o cliente quer comprar ou alugar, filtra preço e bairro, envia fotos compatíveis e agenda a visita direto com o corretor! 🏢🔑'
  },
  {
    id: 'servicos',
    icon: '⚖️',
    tag: 'Serviços & B2B',
    name: 'Prestadores & Advocacia',
    description: 'Acolhimento profissional e humanizado em menos de 3 segundos, coleta segura de informações preliminares e triagem pré-comercial.',
    metric: 'Atendimento 24/7/365 sem fila de espera',
    userPrompt: 'E para Prestadores de Serviço e Escritórios de Advocacia?',
    aiResponse: 'Para serviços e advocacia, a IA realiza acolhimento em < 3 segundos, coleta dados preliminares essenciais e encaminha o lead qualificado ao especialista! ⚖️💼'
  }
];

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export const ProjectsPortfolio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ProjectCategoryTab>('all');
  
  // Estado do Chat WhatsApp
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'user',
      text: 'Olá! Gostaria de entender como o Agente de IA funciona e se atende a minha empresa.',
      time: '10:42'
    },
    {
      id: '2',
      sender: 'bot',
      text: 'Olá! Seja muito bem-vindo ao Grupo Norte! 🚀 Nosso Agente de IA é treinado exclusivamente com as regras da sua empresa: preços, horários e catálogo. Atende 24h por dia no WhatsApp sem filas!',
      time: '10:42'
    },
    {
      id: '3',
      sender: 'user',
      text: 'Vocês conseguem integrar direto com meu CRM ou agendamento no Google Agenda?',
      time: '10:43'
    },
    {
      id: '4',
      sender: 'bot',
      text: 'Sim, com integração nativa! ⚡ O cliente tira dúvidas, escolhe o melhor horário e a IA já agenda direto no seu calendário ou CRM, enviando confirmação automática. Toque em um dos segmentos abaixo para testar! 👇',
      time: '10:43'
    }
  ]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll das mensagens no chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSimulateNiche = (niche: NicheInfo) => {
    if (isTyping) return;
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    // Adiciona pergunta do usuário
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: niche.userPrompt,
      time: timeStr
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Resposta simulada após 800ms
    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: niche.aiResponse,
        time: timeStr
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 850);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: '1',
        sender: 'user',
        text: 'Olá! Gostaria de entender como o Agente de IA funciona e se atende a minha empresa.',
        time: '10:42'
      },
      {
        id: '2',
        sender: 'bot',
        text: 'Olá! Seja muito bem-vindo ao Grupo Norte! 🚀 Nosso Agente de IA é treinado exclusivamente com a base de conhecimento do seu negócio. Atende 24h por dia no WhatsApp!',
        time: '10:42'
      }
    ]);
    setIsTyping(false);
  };

  return (
    <section id="projetos" className="relative bg-[#F7F7F5] text-[#334756] py-24 md:py-32 border-y border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ==================================================================
            CABEÇALHO DA SEÇÃO DE PROJETOS
            ================================================================== */}
        <div className="flex flex-col gap-8 mb-16">
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="inline-flex items-center gap-3">
              <span className="text-xs font-bold tracking-widest uppercase text-[#FF6A00] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF6A00] shadow-[0_0_8px_#FF6A00]" />
                PORTFÓLIO & CASES
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-900/5 text-[#0A1E2B] border border-slate-900/10">
                Soluções Entregues
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A1E2B] tracking-tight leading-tight">
              Tecnologia, design e estratégia <br />
              <span className="text-slate-500 font-bold">transformados em resultados reais.</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Explore nosso ecossistema de soluções: plataformas digitais sob medida, agentes inteligentes de IA no WhatsApp e estratégias de tráfego que aceleram operações comerciais.
            </p>
          </div>

          {/* ==================================================================
              1. SISTEMA DE ABAS (FILTROS DE CATEGORIA)
              ================================================================== */}
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-full border border-slate-200 shadow-sm w-fit max-w-full overflow-x-auto scrollbar-none" role="tablist">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'all'
                  ? 'bg-[#0A1E2B] text-white shadow-md'
                  : 'text-slate-600 hover:text-[#0A1E2B] hover:bg-slate-100'
              }`}
              role="tab"
              aria-selected={activeTab === 'all'}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00]" />
              Todos
            </button>

            <button
              onClick={() => setActiveTab('sites')}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'sites'
                  ? 'bg-[#0A1E2B] text-white shadow-md'
                  : 'text-slate-600 hover:text-[#0A1E2B] hover:bg-slate-100'
              }`}
              role="tab"
              aria-selected={activeTab === 'sites'}
            >
              <span>💻</span>
              Sites & Sistemas
            </button>

            <button
              onClick={() => setActiveTab('ai')}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'ai'
                  ? 'bg-[#0A1E2B] text-white shadow-md'
                  : 'text-slate-600 hover:text-[#0A1E2B] hover:bg-slate-100'
              }`}
              role="tab"
              aria-selected={activeTab === 'ai'}
            >
              <span>🤖</span>
              Agentes de IA
            </button>

            <button
              onClick={() => setActiveTab('marketing')}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'marketing'
                  ? 'bg-[#0A1E2B] text-white shadow-md'
                  : 'text-slate-600 hover:text-[#0A1E2B] hover:bg-slate-100'
              }`}
              role="tab"
              aria-selected={activeTab === 'marketing'}
            >
              <span>📈</span>
              Marketing & Tráfego
            </button>
          </div>
        </div>

        {/* ==================================================================
            CONTEÚDO DAS ABAS
            ================================================================== */}
        <div className="space-y-24">

          {/* ================================================================
              ABA 1: SITES & SISTEMAS (MOCKUPS DE COMPUTADORES)
              ================================================================ */}
          {(activeTab === 'all' || activeTab === 'sites') && (
            <div className="transition-opacity duration-300">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#FF6A00] bg-orange-500/10 px-3 py-1 rounded-md">
                    💻 Sites & Sistemas Sob Medida
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0A1E2B] mt-2">
                    Plataformas Web, Landing Pages & Ambientes Corporativos
                  </h3>
                  <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                    Interfaces desenvolvidas sob medida com padrão global de engenharia, alta velocidade e foco em conversão comercial.
                  </p>
                </div>
              </div>

              {/* Grid de Mockups de Computador */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {SITES_PROJECTS.map((project) => (
                  <article
                    key={project.id}
                    className="group bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col"
                  >
                    {/* Barra Superior do Navegador */}
                    <div className="h-10 bg-slate-100 border-b border-slate-200/80 px-4 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                      </div>
                      <div className="bg-white border border-slate-200 rounded-full px-3 py-0.5 text-[11px] text-slate-600 flex items-center gap-1.5 truncate max-w-[170px] mx-auto">
                        <span className="text-emerald-500">🔒</span>
                        <span className="truncate">{project.domain}</span>
                      </div>
                    </div>

                    {/* Preview da Tela */}
                    <div className="relative h-64 overflow-hidden bg-slate-900">
                      <picture>
                        <source srcSet={project.image} type="image/webp" />
                        <img
                          src={project.fallbackImage}
                          alt={project.title}
                          className="w-full h-auto object-cover object-top transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                      </picture>
                    </div>

                    {/* Rodapé do Card com Título e Categoria */}
                    <div className="p-5 flex flex-col gap-1 border-t border-slate-100 mt-auto bg-white">
                      <h4 className="font-bold text-[#0A1E2B] text-base group-hover:text-[#FF6A00] transition-colors truncate">
                        {project.title}
                      </h4>
                      <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                        {project.category}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================
              ABA 2: AGENTES DE IA (WHATSAPP SIMULATOR + NICHOS)
              ================================================================ */}
          {(activeTab === 'all' || activeTab === 'ai') && (
            <div className="transition-opacity duration-300">
              <div className="mb-8">
                <span className="text-xs font-bold uppercase tracking-wider text-[#FF6A00] bg-orange-500/10 px-3 py-1 rounded-md">
                  🤖 Automação & Atendimento Inteligente
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0A1E2B] mt-2">
                  Agentes de IA Treinados para Vender e Agendar 24 Horas
                </h3>
                <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                  Simule o atendimento abaixo e veja como nossos agentes respondem instantaneamente, qualificam leads e realizam agendamentos no WhatsApp.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Coluna do WhatsApp Simulator */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                  <div className="bg-[#EFEAE2] rounded-3xl border border-slate-300/80 shadow-xl overflow-hidden flex flex-col">
                    
                    {/* Header do WhatsApp */}
                    <div className="bg-[#075E54] text-white px-4 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full bg-[#0A1E2B] flex items-center justify-center border border-white/20">
                          <img src="/brand/simbolo-grupo-norte-transparent.png" alt="Grupo Norte" className="w-6 h-6 object-contain" />
                          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#25D366] border-2 border-[#075E54]" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-sm">Grupo Norte • Assistente IA</span>
                            <span className="text-[#25D366] text-xs">✓</span>
                          </div>
                          <span className="text-xs text-white/80">
                            {isTyping ? 'digitando...' : 'Online'}
                          </span>
                        </div>
                      </div>
                      <div className="text-white/80 text-lg flex gap-3">
                        <span>📹</span>
                        <span>📞</span>
                      </div>
                    </div>

                    {/* Corpo das Mensagens */}
                    <div className="p-4 h-96 overflow-y-auto flex flex-col gap-3">
                      <div className="bg-[#FFEECD] text-[#523E02] text-[11px] p-2 rounded-lg text-center max-w-xs mx-auto shadow-sm">
                        🔒 Demonstração oficial do Agente de IA comercial Grupo Norte.
                      </div>

                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[85%] p-3 rounded-xl text-sm leading-relaxed shadow-sm ${
                              msg.sender === 'user'
                                ? 'bg-white text-slate-800 rounded-tr-none'
                                : 'bg-[#D9FDD3] text-slate-900 rounded-tl-none'
                            }`}
                          >
                            <p>{msg.text}</p>
                            <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-slate-500">
                              <span>{msg.time}</span>
                              {msg.sender === 'bot' && <span className="text-[#53BDEB] font-bold">✓✓</span>}
                            </div>
                          </div>
                        </div>
                      ))}

                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="bg-[#D9FDD3] p-3 rounded-xl rounded-tl-none shadow-sm flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#075E54] animate-bounce" />
                            <span className="w-2 h-2 rounded-full bg-[#075E54] animate-bounce [animation-delay:0.2s]" />
                            <span className="w-2 h-2 rounded-full bg-[#075E54] animate-bounce [animation-delay:0.4s]" />
                          </div>
                        </div>
                      )}
                      <div ref={chatBottomRef} />
                    </div>

                    {/* Chips de Ação Rápida */}
                    <div className="bg-slate-100 p-3 border-t border-slate-200">
                      <span className="text-xs font-bold text-slate-600 block mb-2">
                        Toque para simular por segmento:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {NICHES.map((niche) => (
                          <button
                            key={niche.id}
                            onClick={() => handleSimulateNiche(niche)}
                            className="bg-white hover:bg-[#0A1E2B] text-[#0A1E2B] hover:text-white border border-slate-200 rounded-full px-3 py-1 text-xs font-semibold transition-all duration-200 shadow-sm"
                          >
                            {niche.icon} {niche.name.split('&')[0]}
                          </button>
                        ))}
                        <button
                          onClick={handleResetChat}
                          className="bg-orange-100 hover:bg-[#FF6A00] text-[#FF6A00] hover:text-white rounded-full px-3 py-1 text-xs font-semibold transition-all duration-200"
                        >
                          🔄 Reiniciar
                        </button>
                      </div>
                    </div>

                    {/* Input Falso */}
                    <div className="bg-slate-200/70 p-3 flex items-center gap-2">
                      <div className="flex-1 bg-white rounded-full px-4 py-2 text-xs text-slate-400">
                        Mensagem para o Agente IA...
                      </div>
                      <div className="w-9 h-9 rounded-full bg-[#00A884] text-white flex items-center justify-center text-sm shadow">
                        🎙️
                      </div>
                    </div>
                  </div>

                  <a
                    href="https://wa.me/5511966527045?text=Ol%C3%A1%2C%20gostaria%20de%20ver%20uma%20demonstra%C3%A7%C3%A3o%20do%20Agente%20de%20IA%20do%20Grupo%20Norte."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-6 rounded-xl bg-[#0A1E2B] hover:bg-[#FF6A00] text-white font-bold text-center text-sm transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <span>Falar com Especialista no WhatsApp Real</span>
                    <span>↗</span>
                  </a>
                </div>

                {/* Coluna dos Nichos Atendidos */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                  <div>
                    <span className="text-xs font-bold text-[#FF6A00] uppercase tracking-widest">
                      SEGMENTOS ATENDIDOS
                    </span>
                    <h4 className="text-2xl font-extrabold text-[#0A1E2B] mt-1">
                      Soluções Customizadas para a Realidade da Sua Empresa
                    </h4>
                    <p className="text-sm text-slate-600 mt-1">
                      Treinamos cada agente com a base de conhecimento específica da sua operação para garantir atendimento seguro, humanizado e focado em fechamento.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {NICHES.map((niche) => (
                      <div
                        key={niche.id}
                        className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-orange-300 transition-all duration-200 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-2xl">{niche.icon}</span>
                            <span className="text-[10px] font-bold text-slate-500 uppercase bg-slate-100 px-2 py-0.5 rounded">
                              {niche.tag}
                            </span>
                          </div>
                          <h5 className="font-extrabold text-[#0A1E2B] text-base mb-1">
                            {niche.name}
                          </h5>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {niche.description}
                          </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-emerald-600">
                          <span>✓</span>
                          <span>{niche.metric}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Faixa de KPIs */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="text-center">
                      <span className="block text-2xl font-extrabold text-[#0A1E2B]">&lt; 3s</span>
                      <span className="text-[11px] font-semibold text-slate-500 uppercase">Tempo de Resposta</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-2xl font-extrabold text-[#0A1E2B]">24/7</span>
                      <span className="text-[11px] font-semibold text-slate-500 uppercase">Disponibilidade</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-2xl font-extrabold text-[#0A1E2B]">100%</span>
                      <span className="text-[11px] font-semibold text-slate-500 uppercase">Sem Filas</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-2xl font-extrabold text-[#FF6A00]">+40%</span>
                      <span className="text-[11px] font-semibold text-slate-500 uppercase">Conversão</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ================================================================
              ABA 3: MARKETING & TRÁFEGO PAGO
              ================================================================ */}
          {(activeTab === 'all' || activeTab === 'marketing') && (
            <div className="transition-opacity duration-300">
              <div className="mb-8">
                <span className="text-xs font-bold uppercase tracking-wider text-[#FF6A00] bg-orange-500/10 px-3 py-1 rounded-md">
                  📈 Performance & Presença de Marca
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0A1E2B] mt-2">
                  Cases de Sucesso: Estratégias que Constroem Autoridade e Vendas
                </h3>
                <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                  Unimos posicionamento editorial no Instagram com campanhas de tráfego de alta conversão focadas em ROAS e geração de leads qualificados.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Case 1: Branding Instagram */}
                <article className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
                  <div className="bg-slate-50 p-6 border-b border-slate-200">
                    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col gap-3">
                      <div className="flex items-center justify-between text-xs font-bold text-[#0A1E2B]">
                        <span>@gruponorte.oficial</span>
                        <span className="text-sky-500">✓</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-[#FF6A00] to-pink-500">
                          <img src="/brand/simbolo-grupo-norte-transparent.png" alt="Grupo Norte" className="w-full h-full rounded-full bg-[#0A1E2B] p-1.5 object-contain" />
                        </div>
                        <div className="flex-1 flex justify-around text-center text-xs">
                          <div><strong className="block text-sm text-[#0A1E2B]">184</strong><span className="text-slate-500">posts</span></div>
                          <div><strong className="block text-sm text-[#0A1E2B]">28.4K</strong><span className="text-slate-500">seguidores</span></div>
                          <div><strong className="block text-sm text-[#0A1E2B]">412</strong><span className="text-slate-500">seguindo</span></div>
                        </div>
                      </div>
                      <div className="text-xs">
                        <strong className="text-[#0A1E2B] block">Grupo Norte | Marketing & Tecnologia</strong>
                        <p className="text-slate-600">Soluções integradas em Tecnologia, Agentes de IA e Tráfego Pago para empresas que buscam escala. 🚀</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 flex flex-col justify-between flex-1">
                    <div>
                      <span className="text-xs font-bold text-[#FF6A00] uppercase tracking-wider">
                        Branding & Presença Digital
                      </span>
                      <h4 className="text-xl font-extrabold text-[#0A1E2B] mt-1 mb-3">
                        Estruturação de Perfil & Branding no Instagram
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed mb-6">
                        Criamos a direção de arte e a esteira editorial completa para transformar perfis em referências visuais, aumentando a autoridade percebida e as vendas no direct.
                      </p>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs text-slate-700">
                          <span className="text-emerald-500 font-bold">✓</span>
                          <span><strong>+340%</strong> de retenção e tempo de permanência no perfil</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-700">
                          <span className="text-emerald-500 font-bold">✓</span>
                          <span><strong>+180%</strong> de aumento nas mensagens diretas (DMs) qualificadas</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-700">
                          <span className="text-emerald-500 font-bold">✓</span>
                          <span><strong>Identidade Visual Editorial</strong> exclusiva e padronizada</span>
                        </div>
                      </div>
                    </div>

                    <a
                      href="https://wa.me/5511966527045?text=Ol%C3%A1%2C%20quero%20estruturar%20o%20perfil%20da%20minha%20empresa."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 py-3 px-6 rounded-xl bg-[#0A1E2B] hover:bg-[#FF6A00] text-white font-bold text-center text-sm transition-all duration-200"
                    >
                      Estruturar o Perfil da Minha Empresa ↗
                    </a>
                  </div>
                </article>

                {/* Case 2: Tráfego Pago */}
                <article className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
                  <div className="bg-[#0A1E2B] text-white p-6 border-b border-slate-800">
                    <div className="flex items-center justify-between text-xs mb-4">
                      <span className="flex items-center gap-2 font-bold">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        14 Campanhas Ativas
                      </span>
                      <span className="bg-white/10 px-3 py-1 rounded-full text-slate-300">
                        Últimos 30 Dias
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                        <span className="text-[10px] text-slate-400 uppercase">ROAS Médio</span>
                        <strong className="block text-2xl font-extrabold text-[#FF6A00]">6.8x</strong>
                      </div>
                      <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                        <span className="text-[10px] text-slate-400 uppercase">Leads Qualificados</span>
                        <strong className="block text-2xl font-extrabold text-white">+4.250</strong>
                      </div>
                      <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                        <span className="text-[10px] text-slate-400 uppercase">Custo por Lead</span>
                        <strong className="block text-2xl font-extrabold text-emerald-400">-42%</strong>
                      </div>
                      <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                        <span className="text-[10px] text-slate-400 uppercase">Taxa de Conversão</span>
                        <strong className="block text-2xl font-extrabold text-white">18.4%</strong>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 flex flex-col justify-between flex-1">
                    <div>
                      <span className="text-xs font-bold text-[#FF6A00] uppercase tracking-wider">
                        Tráfego Pago & Performance
                      </span>
                      <h4 className="text-xl font-extrabold text-[#0A1E2B] mt-1 mb-3">
                        Campanhas Estratégicas no Meta Ads & Google Ads
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed mb-6">
                        Gestão analítica orientada a dados para empresas que buscam escala previsível. Estruturamos funis de aquisição com testes A/B contínuos e traqueamento via API de Conversões (CAPI).
                      </p>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs text-slate-700">
                          <span className="text-emerald-500 font-bold">✓</span>
                          <span><strong>Públicos de Alta Intenção</strong> e Lookalike 1% qualificado</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-700">
                          <span className="text-emerald-500 font-bold">✓</span>
                          <span><strong>Testes Multivariados</strong> semanais de criativos e copys</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-700">
                          <span className="text-emerald-500 font-bold">✓</span>
                          <span><strong>Esteira de Remarketing Ativo</strong> para recuperação de leads</span>
                        </div>
                      </div>
                    </div>

                    <a
                      href="https://wa.me/5511966527045?text=Ol%C3%A1%2C%20quero%20um%20diagn%C3%B3stico%20de%20tr%C3%A1fego%20pago."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 py-3 px-6 rounded-xl bg-[#0A1E2B] hover:bg-[#FF6A00] text-white font-bold text-center text-sm transition-all duration-200"
                    >
                      Solicitar Diagnóstico de Tráfego ↗
                    </a>
                  </div>
                </article>

              </div>

              {/* Banner Ecossistema Completo */}
              <div className="mt-12 bg-gradient-to-r from-[#0A1E2B] to-[#0F2D40] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
                <div className="max-w-2xl">
                  <span className="text-xs font-bold text-[#FF6A00] uppercase tracking-widest">
                    ECOSSISTEMA INTEGRADO
                  </span>
                  <h4 className="text-2xl sm:text-3xl font-extrabold mt-2 mb-3">
                    Tráfego Pago + Site de Alta Conversão + Agente de IA
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Conectamos todas as etapas comerciais: o anúncio atrai o lead certo, o site valida sua autoridade e a IA atende em menos de 3 segundos, transformando cliques em reuniões agendadas no mesmo dia.
                  </p>
                </div>
                <a
                  href="https://wa.me/5511966527045?text=Ol%C3%A1%2C%20quero%20o%20ecossistema%20integrado%20do%20Grupo%20Norte."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-full bg-[#FF6A00] hover:bg-[#E85C00] text-white font-bold text-sm whitespace-nowrap transition-all duration-200 shadow-lg hover:shadow-orange-500/30 shrink-0"
                >
                  Quero o Ecossistema Completo ↗
                </a>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};

export default ProjectsPortfolio;
