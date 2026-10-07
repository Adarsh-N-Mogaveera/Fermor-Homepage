"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, RotateCcw } from "lucide-react";

const formatINR = (value: number) => `₹${Math.round(value).toLocaleString("en-IN")}`;

export default function MiniCalculator() {
  const [monthly, setMonthly] = useState(12000);
  const [years, setYears] = useState(12);
  const rate = 0.12;
  const points = 24;
  const { invested, returns, total, chartPoints } = useMemo(() => {
    const months = years * 12;
    const monthlyRate = rate / 12;
    const totalValue = monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    const investedValue = monthly * months;
    const values = Array.from({ length: points }, (_, index) => {
      const month = Math.max(1, Math.round((months * (index + 1)) / points));
      return monthly * ((Math.pow(1 + monthlyRate, month) - 1) / monthlyRate) * (1 + monthlyRate);
    });
    const max = Math.max(...values);
    const min = Math.min(...values);
    const plotted = values.map((value, index) => `${(index / (points - 1)) * 100},${76 - ((value - min) / Math.max(1, max - min)) * 55}`).join(" ");
    return { invested: investedValue, returns: totalValue - investedValue, total: totalValue, chartPoints: plotted };
  }, [monthly, years]);

  return (
    <div className="relative z-10 border border-white/[0.12] bg-[#0e1521]/90 shadow-2xl shadow-black/30 backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4"><div><div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Live estimator</div><h2 className="mt-1 text-lg font-semibold tracking-[-0.03em] text-white">SIP growth estimator</h2></div><button aria-label="Reset calculator" onClick={() => { setMonthly(12000); setYears(12); }} className="text-slate-500 transition-colors hover:text-emerald-300"><RotateCcw size={15} /></button></div>
      <div className="p-5 sm:p-7">
        <div className="mb-7 flex items-end justify-between"><div><span className="text-[11px] text-slate-500">Projected value</span><div className="mt-1 text-3xl font-semibold tracking-[-0.06em] text-white">{formatINR(total)}</div></div><div className="text-right"><span className="text-[11px] text-slate-500">at 12% p.a.</span><div className="mt-1 text-sm font-semibold text-emerald-400">+{formatINR(returns)}</div></div></div>
        <div className="relative h-[188px] overflow-hidden border-y border-white/[0.07] bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:25%_50%] pt-3"><svg viewBox="0 0 100 86" className="h-full w-full" preserveAspectRatio="none" aria-label="Projected SIP growth chart"><defs><linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#34d399" stopOpacity=".24" /><stop offset="1" stopColor="#34d399" stopOpacity="0" /></linearGradient></defs><polygon points={`0,86 ${chartPoints} 100,86`} fill="url(#chart-fill)" /><polyline points={chartPoints} fill="none" stroke="#34d399" strokeWidth="0.9" vectorEffect="non-scaling-stroke" /><circle cx="100" cy={chartPoints.split(" ").at(-1)?.split(",")[1]} r="1.8" fill="#34d399" /></svg><div className="absolute inset-x-3 bottom-2 flex justify-between text-[9px] font-mono text-slate-600"><span>now</span><span>{Math.round(years / 2)} yrs</span><span>{years} yrs</span></div></div>
        <div className="mt-7 grid gap-5 sm:grid-cols-2"><label className="block"><span className="flex justify-between text-[11px] font-medium text-slate-400"><span>Monthly investment</span><strong className="text-white">{formatINR(monthly)}</strong></span><input aria-label="Monthly investment" type="range" min="5000" max="100000" step="1000" value={monthly} onChange={(event) => setMonthly(Number(event.target.value))} className="mt-3 w-full accent-emerald-400" /><span className="mt-1 flex justify-between text-[9px] text-slate-600"><span>₹5k</span><span>₹1L</span></span></label><label className="block"><span className="flex justify-between text-[11px] font-medium text-slate-400"><span>Duration</span><strong className="text-white">{years} years</strong></span><input aria-label="Investment duration" type="range" min="1" max="30" step="1" value={years} onChange={(event) => setYears(Number(event.target.value))} className="mt-3 w-full accent-emerald-400" /><span className="mt-1 flex justify-between text-[9px] text-slate-600"><span>1 yr</span><span>30 yrs</span></span></label></div>
        <div className="mt-6 flex items-center justify-between border-t border-white/[0.07] pt-4 text-[11px] text-slate-500"><span>Amount invested <strong className="ml-1 text-slate-300">{formatINR(invested)}</strong></span><button className="group flex items-center gap-1 font-semibold text-emerald-300">View breakdown <ArrowUpRight size={13} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></button></div>
      </div>
    </div>
  );
}
