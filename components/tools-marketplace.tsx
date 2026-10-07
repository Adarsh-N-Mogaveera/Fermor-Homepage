"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Calculator, ChevronRight, Coins, Landmark, ReceiptText } from "lucide-react";
import { useState } from "react";

type Category = "All Tools" | "Tax & Salary" | "Loans & EMI" | "Investment Planning";
type Tool = { title: string; description: string; category: Exclude<Category, "All Tools">; icon: typeof Calculator; metric: string };

const tools: Tool[] = [
  { title: "New income tax regime", description: "Estimate your annual tax with the latest slabs.", category: "Tax & Salary", icon: ReceiptText, metric: "FY 2025-26" },
  { title: "Section 87A relief engine", description: "See marginal relief and rebate eligibility clearly.", category: "Tax & Salary", icon: Landmark, metric: "Rebate checker" },
  { title: "Take-home salary", description: "Decode your CTC into a monthly in-hand number.", category: "Tax & Salary", icon: Calculator, metric: "Payslip clarity" },
  { title: "Home loan EMI", description: "Balance rate, tenure, and prepayment tradeoffs.", category: "Loans & EMI", icon: Landmark, metric: "Scenario planner" },
  { title: "SIP returns optimizer", description: "Find a contribution rhythm that compounds.", category: "Investment Planning", icon: Coins, metric: "12% illustration" },
  { title: "Goal planner", description: "Work backwards from a future number you need.", category: "Investment Planning", icon: Calculator, metric: "Future value" },
];
const categories: Category[] = ["All Tools", "Tax & Salary", "Loans & EMI", "Investment Planning"];

export default function ToolsMarketplace() {
  const [active, setActive] = useState<Category>("All Tools");
  const visible = active === "All Tools" ? tools : tools.filter((tool) => tool.category === active);
  return (
    <section id="tools" className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
      <div className="flex flex-col justify-between gap-8 border-b border-white/[0.08] pb-8 lg:flex-row lg:items-end"><div><span className="eyebrow">The toolkit</span><h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-white sm:text-5xl">Make the next move<br className="hidden sm:block" /> with more certainty.</h2></div><p className="max-w-xs text-sm leading-6 text-slate-500">Focused calculators for the decisions that shape your financial life in India.</p></div>
      <div className="mt-8 flex gap-2 overflow-x-auto pb-2">{categories.map((category) => <button key={category} onClick={() => setActive(category)} className={`shrink-0 border px-3.5 py-2 text-[11px] font-semibold transition-colors ${active === category ? "border-emerald-400/50 bg-emerald-400/10 text-emerald-300" : "border-white/10 text-slate-500 hover:border-white/20 hover:text-slate-200"}`}>{category}</button>)}</div>
      <motion.div layout className="mt-8 grid gap-px border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-3"><AnimatePresence mode="popLayout">{visible.map((tool) => { const Icon = tool.icon; return <motion.a layout key={tool.title} href="#top" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.22 }} className="group relative min-h-[220px] bg-[#0b111b] p-6 transition-colors hover:bg-[#101a26]"><div className="flex items-start justify-between"><div className="flex h-9 w-9 items-center justify-center border border-white/10 text-emerald-400 transition-colors group-hover:border-emerald-400/40"><Icon size={16} /></div><ArrowUpRight size={16} className="text-slate-600 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-emerald-300" /></div><div className="absolute inset-x-6 bottom-6"><span className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-600">{tool.metric}</span><h3 className="mt-2 text-[17px] font-semibold tracking-[-0.03em] text-white">{tool.title}</h3><p className="mt-1 max-w-[260px] text-xs leading-5 text-slate-500">{tool.description}</p><span className="mt-4 flex items-center gap-1 text-[11px] font-semibold text-emerald-300 opacity-0 transition-opacity group-hover:opacity-100">Open calculator <ChevronRight size={13} /></span></div></motion.a>; })}</AnimatePresence></motion.div>
      <div className="mt-7 flex items-center justify-between text-[11px] text-slate-600"><span>{visible.length} tools available</span><span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> calculations happen locally</span></div>
    </section>
  );
}