import { useMemo, useState } from "react";
import { BarChart3, Bell, CircleDollarSign, Gauge, MapPin, MessageSquareText, Phone, Search, Sparkles, Target, UserCheck, Users } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import kognaLogo from "./assets/kogna-logo.png";

type Stage = "Novo lead" | "Em contato" | "Qualificado" | "Proposta";
type Lead = { id: number; name: string; phone: string; city: string; course: string; owner: string; stage: Stage; age: string };

const initialLeads: Lead[] = [
  { id: 1, name: "Camila Ferreira", phone: "(31) 99842-1180", city: "Belo Horizonte/MG", course: "Gestão de Projetos", owner: "Mariana Costa", stage: "Novo lead", age: "há 8 min" },
  { id: 2, name: "Rafael Moreira", phone: "(11) 99104-3382", city: "São Paulo/SP", course: "Liderança Estratégica", owner: "Lucas Almeida", stage: "Novo lead", age: "há 21 min" },
  { id: 3, name: "Ana Luiza Campos", phone: "(62) 98551-0092", city: "Goiânia/GO", course: "Vendas Consultivas", owner: "Bianca Rocha", stage: "Em contato", age: "há 1h" },
  { id: 4, name: "Daniel Ribeiro", phone: "(41) 99772-6051", city: "Curitiba/PR", course: "Gestão Financeira", owner: "Mariana Costa", stage: "Em contato", age: "há 2h" },
  { id: 5, name: "Juliana Nascimento", phone: "(21) 99220-7744", city: "Rio de Janeiro/RJ", course: "Liderança Estratégica", owner: "Lucas Almeida", stage: "Qualificado", age: "há 4h" },
  { id: 6, name: "Bruno Henrique", phone: "(19) 98410-3211", city: "Campinas/SP", course: "Vendas Consultivas", owner: "Bianca Rocha", stage: "Proposta", age: "há 6h" },
  { id: 7, name: "Patrícia Gomes", phone: "(31) 98872-8801", city: "Belo Horizonte/MG", course: "Gestão de Projetos", owner: "Mariana Costa", stage: "Proposta", age: "há 1d" },
];

const stages: Stage[] = ["Novo lead", "Em contato", "Qualificado", "Proposta"];
const evolution = [
  { day: "Seg", leads: 18, matriculas: 4 }, { day: "Ter", leads: 27, matriculas: 7 },
  { day: "Qua", leads: 22, matriculas: 6 }, { day: "Qui", leads: 35, matriculas: 11 },
  { day: "Sex", leads: 31, matriculas: 9 }, { day: "Sáb", leads: 16, matriculas: 5 },
];

export default function CrmApp() {
  const [leads, setLeads] = useState(initialLeads);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Lead | null>(null);
  const visible = useMemo(() => leads.filter((lead) => Object.values(lead).join(" ").toLowerCase().includes(search.toLowerCase())), [leads, search]);

  function advance(lead: Lead) {
    const index = stages.indexOf(lead.stage);
    if (index >= stages.length - 1) return;
    const next = stages[index + 1];
    setLeads((current) => current.map((item) => item.id === lead.id ? { ...item, stage: next } : item));
    setSelected((current) => current?.id === lead.id ? { ...current, stage: next } : current);
  }

  return <div className="crm-shell">
    <aside className="crm-sidebar">
      <img src={kognaLogo} alt="Kogna" className="brand-logo" />
      <div className="crm-product">CRM</div>
      <nav className="menu">
        <button className="menu-button"><Gauge size={18} /> Dashboard</button>
        <button className="menu-button active"><Users size={18} /> Pipeline de leads</button>
        <button className="menu-button"><MessageSquareText size={18} /> Conversas</button>
        <button className="menu-button"><BarChart3 size={18} /> Relatórios</button>
        <button className="menu-button"><Target size={18} /> Campanhas</button>
      </nav>
      <div className="side-card"><Sparkles size={18} /><strong>IA Comercial</strong><span>Prioridades e próximos passos sugeridos automaticamente.</span></div>
    </aside>
    <main className="crm-content">
      <header className="crm-topbar">
        <div><p className="eyebrow">Kogna CRM · ambiente demonstrativo</p><h1>Pipeline comercial</h1><p>Visão completa dos leads, responsáveis e oportunidades.</p></div>
        <div className="top-actions"><label className="search"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar lead..." /></label><button className="icon-button"><Bell size={18} /></button></div>
      </header>
      <section className="crm-metrics">
        <CrmMetric icon={Users} label="Leads no período" value="149" detail="+18% vs. período anterior" />
        <CrmMetric icon={UserCheck} label="Qualificados" value="58" detail="38,9% dos leads" />
        <CrmMetric icon={CircleDollarSign} label="Pipeline estimado" value="R$ 184 mil" detail="42 oportunidades ativas" />
        <CrmMetric icon={Target} label="Conversão" value="16,8%" detail="Meta mensal: 18%" />
      </section>
      <section className="crm-insights">
        <div className="crm-chart"><div className="section-title"><div><span>Evolução comercial</span><small>Leads e matrículas da semana</small></div></div><ResponsiveContainer width="100%" height={190}><AreaChart data={evolution}><defs><linearGradient id="kognaGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ff654f" stopOpacity={.35}/><stop offset="1" stopColor="#ff654f" stopOpacity={.02}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="#ece7e3"/><XAxis dataKey="day" axisLine={false} tickLine={false}/><YAxis hide/><Tooltip/><Area dataKey="leads" stroke="#ff654f" strokeWidth={3} fill="url(#kognaGradient)"/><Area dataKey="matriculas" stroke="#ffad54" strokeWidth={2} fill="transparent"/></AreaChart></ResponsiveContainer></div>
        <div className="ai-card"><Sparkles/><span>Insight da IA</span><strong>11 leads precisam de contato hoje</strong><p>Priorize propostas abertas há mais de 24 horas. Potencial estimado de R$ 28.400.</p><button>Ver prioridades</button></div>
      </section>
      <section className="kanban">
        {stages.map((stage) => <div className="kanban-column" key={stage}><div className="kanban-title"><span>{stage}</span><b>{visible.filter((lead) => lead.stage === stage).length}</b></div><div className="lead-stack">{visible.filter((lead) => lead.stage === stage).map((lead) => <button className="lead-card" key={lead.id} onClick={() => setSelected(lead)}><div className="lead-card-head"><strong>{lead.name}</strong><small>{lead.age}</small></div><span><Phone size={14}/>{lead.phone}</span><span><MapPin size={14}/>{lead.city}</span><em>{lead.course}</em><footer><UserCheck size={14}/>{lead.owner}</footer></button>)}</div></div>)}
      </section>
    </main>
    {selected ? <div className="crm-drawer-backdrop" onClick={() => setSelected(null)}><aside className="crm-drawer" onClick={(event) => event.stopPropagation()}><button className="drawer-close" onClick={() => setSelected(null)}>×</button><p className="eyebrow">Detalhes do lead</p><h2>{selected.name}</h2><div className="drawer-data"><span>Telefone<strong>{selected.phone}</strong></span><span>Cidade<strong>{selected.city}</strong></span><span>Curso<strong>{selected.course}</strong></span><span>Responsável<strong>{selected.owner}</strong></span><span>Etapa<strong>{selected.stage}</strong></span></div><div className="drawer-note"><Sparkles size={17}/><div><strong>Próxima melhor ação</strong><p>Enviar mensagem personalizada e confirmar disponibilidade para a próxima turma.</p></div></div><button className="primary-action" onClick={() => advance(selected)}>Avançar etapa</button></aside></div> : null}
  </div>;
}

function CrmMetric({ icon: Icon, label, value, detail }: { icon: typeof Users; label: string; value: string; detail: string }) {
  return <div className="crm-metric"><div className="metric-icon"><Icon size={19}/></div><span>{label}</span><strong>{value}</strong><small>{detail}</small></div>;
}
