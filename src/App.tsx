/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Database, 
  BarChart3, 
  FileSpreadsheet, 
  ChevronRight, 
  MessageSquare, 
  Moon, 
  Sun, 
  Menu, 
  X, 
  ArrowUp,
  Download,
  CheckCircle2,
  TrendingUp,
  Users,
  Clock,
  Briefcase,
  BookOpen,
  Award,
  Globe,
  Smartphone
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- DATA ---

const PROJECTS = [
  {
    id: 1,
    title: "Dashboard de Vendas",
    description: "Análise de performance comercial com Python e Matplotlib. Visualização de tendências e KPIs de vendas mensais.",
    category: "Python",
    image: "https://picsum.photos/seed/sales/800/600",
    github: "https://github.com/KalitonOliveira001",
    demo: "#",
    tags: ["Python", "Pandas", "Matplotlib"]
  },
  {
    id: 2,
    title: "Análise Financeira",
    description: "Planilha automatizada no Google Sheets com métricas KPI e integração de dados bancários para controle de fluxo de caixa.",
    category: "Excel",
    image: "https://picsum.photos/seed/finance/800/600",
    github: "https://github.com/KalitonOliveira001",
    demo: "#",
    tags: ["Excel", "Google Sheets", "VBA"]
  },
  {
    id: 3,
    title: "Sistema de Relatórios SQL",
    description: "Queries otimizadas para extração de insights em grandes bancos de dados relacionais, reduzindo tempo de processamento em 40%.",
    category: "SQL",
    image: "https://picsum.photos/seed/sql/800/600",
    github: "https://github.com/KalitonOliveira001",
    demo: "#",
    tags: ["SQL", "PostgreSQL", "Data Analysis"]
  },
  {
    id: 4,
    title: "API Java Backend",
    description: "Backend REST para sistema de cadastro de clientes utilizando Spring Boot e Hibernate, com foco em escalabilidade.",
    category: "Java",
    image: "https://picsum.photos/seed/java/800/600",
    github: "https://github.com/KalitonOliveira001",
    demo: "#",
    tags: ["Java", "Spring Boot", "Hibernate"]
  },
  {
    id: 5,
    title: "Limpeza de Dados Automatizada",
    description: "Script em Python para tratamento de dados nulos e duplicados em datasets de e-commerce.",
    category: "Python",
    image: "https://picsum.photos/seed/cleaning/800/600",
    github: "https://github.com/KalitonOliveira001",
    demo: "#",
    tags: ["Python", "NumPy", "Data Cleaning"]
  },
  {
    id: 6,
    title: "Dashboard Power BI",
    description: "Visualização interativa de dados de logística para otimização de rotas e redução de custos operacionais.",
    category: "Dashboard",
    image: "https://picsum.photos/seed/pbi/800/600",
    github: "https://github.com/KalitonOliveira001",
    demo: "#",
    tags: ["Power BI", "DAX", "Logística"]
  }
];

const BLOG_POSTS = [
  {
    id: 1,
    title: "O Futuro da Análise de Dados em 2025",
    excerpt: "Como a IA generativa está mudando a forma como analistas de dados trabalham no dia a dia.",
    date: "05 Mar, 2026",
    readTime: "5 min",
    category: "Tecnologia",
    image: "https://picsum.photos/seed/blog1/800/500"
  },
  {
    id: 2,
    title: "SQL vs NoSQL: Qual escolher para seu projeto?",
    excerpt: "Um guia prático para entender as diferenças fundamentais e quando aplicar cada tecnologia.",
    date: "02 Mar, 2026",
    readTime: "8 min",
    category: "Tutoriais",
    image: "https://picsum.photos/seed/blog2/800/500"
  },
  {
    id: 3,
    title: "Primeiros passos com Python para Finanças",
    excerpt: "Aprenda a automatizar seus relatórios financeiros usando as bibliotecas Pandas e NumPy.",
    date: "28 Fev, 2026",
    readTime: "12 min",
    category: "Análise de Dados",
    image: "https://picsum.photos/seed/blog3/800/500"
  }
];

const PARTNERS = [
  { id: 1, name: "EBAC", desc: "Escola Britânica de Artes Criativas", link: "https://ebaconline.com.br", logo: "https://picsum.photos/seed/ebac/200/100" },
  { id: 2, name: "Hostinger", desc: "Hospedagem de alta performance - Indico!", link: "https://www.hostinger.com.br", logo: "https://picsum.photos/seed/host/200/100" },
  { id: 3, name: "Alura", desc: "Plataforma de cursos tech - Aprenda programação", link: "https://www.alura.com.br", logo: "https://picsum.photos/seed/alura/200/100" },
  { id: 4, name: "Amazon AWS", desc: "Serviços de infraestrutura cloud", link: "https://aws.amazon.com/pt", logo: "https://picsum.photos/seed/aws/200/100" }
];

const SERVICES = [
  {
    name: "Complexidade Baixa",
    complexity: "Projetos simples e pontuais",
    features: [
      "Organização e limpeza de planilhas",
      "Criação de gráficos e tabelas",
      "Relatório simples em PDF",
      "Fórmulas Excel / Google Sheets",
      "Entrega rápida em até 3 dias"
    ],
    example: "Ex: limpar uma planilha, criar um gráfico de vendas, montar relatório mensal.",
    popular: false
  },
  {
    name: "Complexidade Média",
    complexity: "Projetos com análise e dashboard",
    features: [
      "Dashboard interativo completo",
      "Análise exploratória de dados",
      "Scripts Python (Pandas / Matplotlib)",
      "Consultas e relatórios SQL",
      "Apresentação de insights ao cliente"
    ],
    example: "Ex: dashboard de vendas, análise financeira, automação de relatórios com Python.",
    popular: true
  },
  {
    name: "Complexidade Alta",
    complexity: "Projetos robustos e integrados",
    features: [
      "Projeto completo ponta a ponta",
      "Integração entre sistemas e APIs",
      "Backend Java + banco de dados",
      "Código fonte documentado incluso",
      "Suporte e manutenção pós-entrega"
    ],
    example: "Ex: sistema de BI integrado, pipeline de dados, API REST com análise integrada.",
    popular: false
  }
];

const ContactModal = ({ service, onClose }: { service: string, onClose: () => void }) => (
  <div className="fixed inset-0 z-[999] flex items-center justify-center p-4" onClick={onClose}>
    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
    <div
      className="relative glass rounded-3xl p-10 max-w-md w-full z-10 shadow-2xl shadow-primary/20"
      onClick={e => e.stopPropagation()}
    >
      <button onClick={onClose} className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors">
        <X size={22} />
      </button>
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl mb-6">KO</div>
      <h3 className="text-2xl font-bold mb-1">Vamos conversar?</h3>
      <p className="text-white/50 text-sm mb-8">Serviço: <span className="text-primary font-semibold">{service}</span><br/>Entre em contato para receber seu orçamento personalizado.</p>
      <div className="flex flex-col gap-4">
        <a
          href={`mailto:akalitonthyago12@gmail.com?subject=Interesse em Serviço — ${service}&body=Olá Káliton! Tenho interesse no serviço de ${service}. Minha demanda é:%0A%0A`}
          className="btn-primary text-center flex items-center justify-center gap-2"
        >
          <Mail size={18} /> Enviar E-mail
        </a>
        <a
          href="https://linkedin.com/in/káliton-thyago-marcelino-de-oliveira-31290b356"
          target="_blank"
          rel="noopener noreferrer"
          className="glass py-3 rounded-full text-center font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
        >
          <Linkedin size={18} /> Contato via LinkedIn
        </a>
      </div>
    </div>
  </div>
);

// --- COMPONENTS ---

const Navbar = ({ isDarkMode, toggleDarkMode }: { isDarkMode: boolean, toggleDarkMode: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Sobre', href: '#about' },
    { name: 'Habilidades', href: '#skills' },
    { name: 'Projetos', href: '#portfolio' },
    { name: 'Blog', href: '#blog' },
    { name: 'Serviços', href: '#services' },
    { name: 'Contato', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="text-2xl font-bold tracking-tighter flex items-center gap-2">
          <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white">KO</span>
          <span className="hidden sm:inline">Káliton<span className="text-primary">.</span></span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-medium hover:text-primary transition-colors uppercase tracking-widest">
              {link.name}
            </a>
          ))}
          <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-white/10 transition-colors">
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <a href="#contact" className="btn-primary py-2 px-5 text-sm">Freelance</a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-white/10 transition-colors">
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="p-2">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a href="#contact" className="btn-primary text-center">Contratar Agora</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block py-1 px-4 rounded-full glass text-primary text-xs font-bold tracking-widest uppercase mb-6">
            Disponível para Projetos
          </span>
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
            Transformando <span className="gradient-text">Dados</span> em Decisões Estratégicas
          </h1>
          <p className="text-lg text-white/60 mb-8 max-w-lg">
            Olá, eu sou <strong>Káliton Thyago</strong>. Analista de Dados Jr especializado em Python, SQL e visualização de dados. Ajudo empresas a extraírem valor real de seus ativos de informação.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#portfolio" className="btn-primary">Ver Projetos</a>
            <a href="#contact" className="px-6 py-3 rounded-full border border-white/20 hover:bg-white/5 transition-all flex items-center gap-2">
              Falar no WhatsApp <MessageSquare size={18} />
            </a>
          </div>
          
          <div className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <img key={i} src={`https://i.pravatar.cc/150?u=${i}`} className="w-10 h-10 rounded-full border-2 border-dark-bg" alt="Client" />
              ))}
            </div>
            <p className="text-sm text-white/40">
              <span className="text-white font-bold">+15 clientes</span> satisfeitos este ano
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative z-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <img 
              src="https://picsum.photos/seed/kaliton/800/1000" 
              alt="Káliton Thyago" 
              className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-dark-bg to-transparent">
              <div className="glass p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-xs text-white/60 uppercase tracking-widest">Experiência</p>
                  <p className="font-bold">Analista de Dados Jr</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <TrendingUp size={24} />
                </div>
              </div>
            </div>
          </div>
          
          {/* Floating Stats */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute -top-6 -right-6 glass p-4 rounded-2xl z-20 hidden lg:block"
          >
            <p className="text-2xl font-bold text-primary">50+</p>
            <p className="text-[10px] uppercase tracking-widest text-white/60">Projetos SQL</p>
          </motion.div>
          
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 5, delay: 1 }}
            className="absolute bottom-20 -left-10 glass p-4 rounded-2xl z-20 hidden lg:block"
          >
            <p className="text-2xl font-bold text-secondary">100%</p>
            <p className="text-[10px] uppercase tracking-widest text-white/60">Foco em ROI</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const SectionHeading = ({ title, subtitle, centered = false }: { title: string, subtitle: string, centered?: boolean }) => (
  <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
    <p className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4">{subtitle}</p>
    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{title}</h2>
  </div>
);

const About = () => {
  return (
    <section id="about" className="py-24 bg-dark-card/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeading title="Paixão por transformar números em histórias" subtitle="Sobre Mim" />
            <div className="space-y-6 text-white/70 text-lg leading-relaxed">
              <p>
                Iniciei minha jornada na tecnologia com um objetivo claro: ajudar pessoas e empresas a tomarem decisões baseadas em evidências, não em palpites. Como <strong>Analista de Dados Jr</strong>, foco em criar pontes entre dados brutos e insights acionáveis.
              </p>
              <p>
                Minha formação na <strong>EBAC</strong> em Análise de Dados e Backend Java me proporcionou uma visão 360º do ciclo de vida do dado — desde a coleta e processamento até a visualização final e integração com sistemas robustos.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-primary"><CheckCircle2 size={20} /></div>
                  <div>
                    <p className="font-bold text-white">Formação EBAC</p>
                    <p className="text-sm">Análise & Backend</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-primary"><CheckCircle2 size={20} /></div>
                  <div>
                    <p className="font-bold text-white">Foco em Negócios</p>
                    <p className="text-sm">Vendas & Finanças</p>
                  </div>
                </div>
              </div>
              <div className="pt-8">
                <a href="/curriculo.pdf" className="flex items-center gap-2 text-primary font-bold hover:underline">
                  Baixar Currículo Completo <Download size={18} />
                </a>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="h-64 rounded-2xl overflow-hidden">
                <img src="https://picsum.photos/seed/work1/400/600" className="w-full h-full object-cover grayscale" alt="Work" />
              </div>
              <div className="glass p-6 rounded-2xl text-center">
                <p className="text-4xl font-bold text-primary mb-1">01</p>
                <p className="text-xs uppercase tracking-widest text-white/50">Ano de Exp.</p>
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="glass p-6 rounded-2xl text-center">
                <p className="text-4xl font-bold text-secondary mb-1">20+</p>
                <p className="text-xs uppercase tracking-widest text-white/50">Projetos</p>
              </div>
              <div className="h-64 rounded-2xl overflow-hidden">
                <img src="https://picsum.photos/seed/work2/400/600" className="w-full h-full object-cover grayscale" alt="Work" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const skillCategories = [
    {
      title: "Data Science",
      icon: <BarChart3 size={32} />,
      skills: ["Python (Pandas, NumPy)", "Matplotlib / Seaborn", "Limpeza de Dados", "Estatística Descritiva"]
    },
    {
      title: "Banco de Dados",
      icon: <Database size={32} />,
      skills: ["SQL (PostgreSQL, MySQL)", "Modelagem Relacional", "ETL Processes", "Queries Complexas"]
    },
    {
      title: "Business Intelligence",
      icon: <FileSpreadsheet size={32} />,
      skills: ["Excel Avançado", "Google Sheets", "Power BI / Dashboards", "Métricas KPI"]
    },
    {
      title: "Desenvolvimento",
      icon: <Code2 size={32} />,
      skills: ["Java (Spring Boot)", "Hibernate / JPA", "APIs RESTful", "Git / GitHub"]
    }
  ];

  return (
    <section id="skills" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading title="Minhas Especialidades" subtitle="Habilidades" centered />
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-3xl card-hover"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                {cat.icon}
              </div>
              <h3 className="text-xl font-bold mb-6">{cat.title}</h3>
              <ul className="space-y-3">
                {cat.skills.map(skill => (
                  <li key={skill} className="flex items-center gap-2 text-white/60 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const [filter, setFilter] = useState('Todos');
  const categories = ['Todos', 'Python', 'SQL', 'Excel', 'Java', 'Dashboard'];

  const filteredProjects = useMemo(() => {
    if (filter === 'Todos') return PROJECTS;
    return PROJECTS.filter(p => p.category === filter);
  }, [filter]);

  return (
    <section id="portfolio" className="py-24 bg-dark-card/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <SectionHeading title="Projetos em Destaque" subtitle="Portfólio" />
          
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${filter === cat ? 'bg-primary text-white' : 'glass text-white/60 hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass rounded-3xl overflow-hidden group card-hover flex flex-col h-full"
              >
                <div className="relative h-60 overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className="py-1 px-3 rounded-full bg-dark-bg/80 backdrop-blur-md text-[10px] font-bold text-primary uppercase tracking-widest">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                  <p className="text-white/60 text-sm mb-6 flex-grow">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] text-white/40 border border-white/10 px-2 py-1 rounded">#{tag}</span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a href={project.github} className="flex-1 py-3 rounded-xl glass text-center text-xs font-bold hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                      <Github size={14} /> GitHub
                    </a>
                    <a href={project.demo} className="flex-1 py-3 rounded-xl bg-primary text-center text-xs font-bold hover:bg-primary/80 transition-colors flex items-center justify-center gap-2">
                      <ExternalLink size={14} /> Ver Projeto
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

const Blog = () => {
  return (
    <section id="blog" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <SectionHeading title="Conteúdo & Insights" subtitle="Blog Diário" />
          <a href="#" className="hidden md:flex items-center gap-2 text-primary font-bold hover:underline">
            Ver todos os posts <ChevronRight size={18} />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative h-56 rounded-3xl overflow-hidden mb-6">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full text-[10px] font-bold">
                  {post.category}
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-white/40 mb-3">
                <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                <span>•</span>
                <span>{post.date}</span>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
              <p className="text-white/60 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
              <button className="text-sm font-bold flex items-center gap-1 text-primary">
                Ler mais <ChevronRight size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PartnersSection = () => {
  return (
    <section className="py-24 bg-dark-card/30">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading title="Empresas que Confiam" subtitle="Parceiros & Afiliados" centered />
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {PARTNERS.map(partner => (
            <a 
              key={partner.id} 
              href={partner.link} 
              className="glass p-8 rounded-3xl flex flex-col items-center text-center group card-hover"
            >
              <img src={partner.logo} alt={partner.name} className="h-12 w-auto grayscale group-hover:grayscale-0 transition-all mb-4" />
              <h4 className="font-bold mb-1">{partner.name}</h4>
              <p className="text-[10px] text-white/40 uppercase tracking-widest">{partner.desc}</p>
            </a>
          ))}
        </div>
        
        <div className="mt-16 glass p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <Award size={32} />
            </div>
            <div>
              <h4 className="text-xl font-bold">Recomendado por Káliton</h4>
              <p className="text-white/60 text-sm">Ferramentas e cursos que utilizo no meu dia a dia profissional.</p>
            </div>
          </div>
          <button className="btn-primary whitespace-nowrap">Ver Recomendações</button>
        </div>
      </div>
    </section>
  );
};

const ServicesSection = () => {
  const [selectedService, setSelectedService] = React.useState<string | null>(null);
  return (
    <section id="services" className="py-24">
      {selectedService && <ContactModal service={selectedService} onClose={() => setSelectedService(null)} />}
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading title="Meus Serviços" subtitle="Contrate por Complexidade" centered />
        
        <div className="grid md:grid-cols-3 gap-8">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`relative glass p-10 rounded-[2.5rem] flex flex-col ${service.popular ? 'border-primary/50 shadow-2xl shadow-primary/10' : ''}`}
            >
              {service.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1 rounded-full">
                  Mais Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-1">{service.name}</h3>
              <p className="text-primary/80 text-xs uppercase tracking-widest font-semibold mb-3">{service.complexity}</p>
              
              <ul className="space-y-4 mb-6 flex-grow">
                {service.features.map(feature => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-white/70">
                    <CheckCircle2 size={18} className="text-primary shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <p className="text-white/30 text-xs italic mb-6">{service.example}</p>
              
              <button
                onClick={() => setSelectedService(service.name)}
                className={`w-full py-4 rounded-2xl text-center font-bold transition-all flex items-center justify-center gap-2 ${service.popular ? 'bg-primary text-white hover:bg-primary/80' : 'glass hover:bg-white/10'}`}
              >
                <ExternalLink size={16} />
                Saiba Mais
              </button>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-white/40 text-sm">Tem uma demanda específica? <a href="#contact" className="text-primary font-bold hover:underline">Fale diretamente comigo</a></p>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-dark-card/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeading title="Vamos iniciar um projeto juntos?" subtitle="Contato" />
            <p className="text-white/60 text-lg mb-12">
              Estou sempre aberto a novas oportunidades, colaborações ou apenas um café virtual para discutir dados e tecnologia.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/40 mb-1">E-mails Profissionais</p>
                  <p className="text-lg font-bold">akalitonthyago12@gmail.com</p>
                  <p className="text-lg font-bold">analistadedadoskaliton@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Linkedin size={24} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/40 mb-1">LinkedIn</p>
                  <a href="https://linkedin.com/in/káliton-thyago-marcelino-de-oliveira-31290b356" className="text-lg font-bold hover:text-primary transition-colors">/in/kaliton-thyago</a>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Github size={24} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/40 mb-1">GitHub</p>
                  <a href="https://github.com/KalitonOliveira001" className="text-lg font-bold hover:text-primary transition-colors">@KalitonOliveira001</a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-10 rounded-[2.5rem]"
          >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40">Seu Nome</label>
                  <input type="text" placeholder="João Silva" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40">Seu E-mail</label>
                  <input type="email" placeholder="akalitonthyago12@gmail.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40">Assunto</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all appearance-none">
                  <option className="bg-dark-card">Análise de Dados</option>
                  <option className="bg-dark-card">Desenvolvimento Backend</option>
                  <option className="bg-dark-card">Consultoria</option>
                  <option className="bg-dark-card">Outros</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40">Mensagem</label>
                <textarea rows={5} placeholder="Como posso te ajudar?" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all resize-none"></textarea>
              </div>
              <button type="submit" className="btn-primary w-full py-4">Enviar Mensagem</button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-bold">KO</span>
            <span className="font-bold">Káliton Thyago</span>
          </div>
          
          <div className="flex gap-8 text-sm text-white/40">
            <a href="#home" className="hover:text-primary transition-colors">Home</a>
            <a href="#portfolio" className="hover:text-primary transition-colors">Projetos</a>
            <a href="#services" className="hover:text-primary transition-colors">Serviços</a>
            <a href="#blog" className="hover:text-primary transition-colors">Blog</a>
          </div>
          
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary transition-all"><Linkedin size={18} /></a>
            <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary transition-all"><Github size={18} /></a>
            <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary transition-all"><Mail size={18} /></a>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/5 text-center text-xs text-white/20">
          <p>© 2026 Káliton Thyago Marcelino de Oliveira. Todos os direitos reservados.</p>
          <p className="mt-2 italic">Desenvolvido com foco em performance e insights.</p>
        </div>
      </div>
    </footer>
  );
};

// --- MAIN APP ---

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Scroll to top button visibility
      setShowScrollTop(window.scrollY > 500);
      
      // Reading progress bar
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('light');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-dark-bg text-white' : 'bg-gray-50 text-slate-900'}`}>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[60]">
        <div 
          className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-100" 
          style={{ width: `${readingProgress}%` }}
        ></div>
      </div>

      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main>
        <Hero />
        
        {/* Stats Counter Section */}
        <section className="py-12 glass border-y border-white/10">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Projetos", value: "25+", icon: <Briefcase size={20} /> },
              { label: "Clientes", value: "15+", icon: <Users size={20} /> },
              { label: "Certificados", value: "10+", icon: <Award size={20} /> },
              { label: "Horas de Código", value: "1.2k", icon: <Clock size={20} /> }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="flex items-center justify-center gap-2 text-primary mb-2">
                  {stat.icon}
                  <span className="text-3xl font-bold">{stat.value}</span>
                </div>
                <p className="text-[10px] uppercase tracking-widest text-white/40">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <About />
        <Skills />
        <Portfolio />
        <PartnersSection />
        <Blog />
        <ServicesSection />
        
        {/* Newsletter Section */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-6">
            <div className="glass p-12 rounded-[3rem] text-center relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl"></div>
              
              <h2 className="text-3xl font-bold mb-4">Fique por dentro das novidades</h2>
              <p className="text-white/60 mb-8">Receba insights semanais sobre análise de dados e tecnologia direto no seu e-mail.</p>
              
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="akalitonthyago12@gmail.com" 
                  className="flex-grow bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all"
                />
                <button type="submit" className="btn-primary">Inscrever</button>
              </form>
            </div>
          </div>
        </section>

        <Contact />
      </main>

      <Footer />

      {/* Floating Elements */}
      <a 
        href="https://wa.me/5588998022013" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-40"
      >
        <MessageSquare size={32} fill="white" />
      </a>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-28 right-8 w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-primary transition-all z-40"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
