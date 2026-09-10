import React, { useState } from 'react';
import {
  Flame,
  Fuel,
  ShoppingBag,
  CreditCard,
  AlertTriangle,
  GraduationCap,
  FileX2,
  TrendingUp,
  Info,
  ArrowRight,
  ShieldAlert,
  Percent,
  Calculator,
} from 'lucide-react';
import { COMMODITY_SQUEEZE_DATA, YOUTH_EMPLOYMENT_DATA } from '../data/parallelIndiasData';

interface CitizenSqueezeProps {
  onOpenSources: () => void;
}

export const CitizenSqueeze: React.FC<CitizenSqueezeProps> = ({ onOpenSources }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Interactive Inflation Tax Calculator state
  const [petrolLitresPerMonth, setPetrolLitresPerMonth] = useState<number>(30);
  const [cylindersPerYear, setCylindersPerYear] = useState<number>(8);
  const [grocerySpendPerMonth, setGrocerySpendPerMonth] = useState<number>(6000);

  const filteredItems =
    selectedCategory === 'All'
      ? COMMODITY_SQUEEZE_DATA
      : COMMODITY_SQUEEZE_DATA.filter((i) => i.category === selectedCategory);

  // Calculator calculations
  // Extra excise tax paid per year on petrol: (~₹10.42 extra per litre * monthly litres * 12)
  const annualExtraFuelTax = Math.round(petrolLitresPerMonth * (19.90 - 9.48) * 12);
  // Extra cost on LPG per year: (₹1103 - ₹410) * cylinders
  const annualExtraLpgCost = Math.round(cylindersPerYear * (1103 - 410));
  // Extra food inflation drag (~110% hike on staples):
  const annualExtraStaplesCost = Math.round(grocerySpendPerMonth * 0.52 * 12);
  const totalAnnualSqueeze = annualExtraFuelTax + annualExtraLpgCost + annualExtraStaplesCost;

  return (
    <section id="squeeze" className="py-12 sm:py-16 bg-[#0B0F14] border-t border-orange-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30 mb-2">
              <Flame className="w-3.5 h-3.5" />
              PRICES & DEBT
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Cost of Living & Household Debt
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-300">
              Essential commodity prices and household debt reliance (2014 vs Present).
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-1 bg-[#0F141C] p-1 rounded-xl border border-orange-500/30">
            {['All', 'Energy & Fuel', 'Food Staples', 'Household Finance'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#FF9933] text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Commodity & Debt Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => {
            const isNegativeHike = item.percentageHike < 0;

            return (
              <div
                key={item.id}
                className="rounded-xl bg-[#0F141C] border border-orange-500/25 hover:border-orange-500/50 p-5 transition-all flex flex-col justify-between shadow-lg"
              >
                <div>
                  {/* Category & Badge */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {item.category}
                    </span>
                    <span className="text-[11px] font-mono text-orange-400 font-bold">
                      [{item.sourceBadge}]
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-white">
                    {item.commodity}
                  </h3>
                  <span className="text-xs text-slate-400 font-mono block">
                    {item.unit}
                  </span>

                  {/* 2014 vs 2024 Visual Contrast */}
                  <div className="mt-4 space-y-2.5 p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-mono text-slate-400">
                        <span>2014:</span>
                        <strong className="text-slate-200">
                          {item.id === 'household-savings'
                            ? `${item.price2014}% GDP`
                            : item.id === 'unsecured-loans'
                            ? `₹${item.price2014} L Cr`
                            : `₹${item.price2014}`}
                        </strong>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-slate-500 h-1.5 rounded-full"
                          style={{
                            width: `${Math.min(
                              100,
                              Math.max(
                                15,
                                (item.price2014 / (item.price2024 || 1)) * 100
                              )
                            )}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-orange-400 font-semibold">2024:</span>
                        <strong className="text-white font-bold">
                          {item.id === 'household-savings'
                            ? `${item.price2024}% GDP`
                            : item.id === 'unsecured-loans'
                            ? `₹${item.price2024} L Cr`
                            : `₹${item.price2024}`}
                        </strong>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-2 rounded-full ${
                            isNegativeHike
                              ? 'bg-rose-500'
                              : 'bg-gradient-to-r from-[#FF9933] to-amber-500'
                          }`}
                          style={{
                            width: isNegativeHike ? '70%' : '100%',
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Change Callout */}
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-slate-400">10-Year Change:</span>
                    <span
                      className={`text-sm font-black font-mono px-2 py-0.5 rounded ${
                        isNegativeHike
                          ? 'bg-rose-500/20 text-rose-300'
                          : 'bg-orange-500/20 text-[#FFB347]'
                      }`}
                    >
                      {item.percentageHike > 0 ? `+${item.percentageHike}%` : `${item.percentageHike}%`}
                    </span>
                  </div>

                  {/* Brief note */}
                  <p className="mt-2 text-xs text-slate-300 leading-normal">
                    {item.description}
                  </p>
                </div>

                {/* Footer Source */}
                <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="truncate max-w-[85%]">{item.source}</span>
                  <button
                    onClick={onOpenSources}
                    className="text-orange-400 hover:text-orange-300 shrink-0 font-bold"
                  >
                    Source
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Household Squeeze Calculator */}
        <div className="mt-8 rounded-xl bg-[#0F141C] border border-orange-500/30 p-5 sm:p-6 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-orange-500/15 text-[#FF9933] border border-orange-500/30 mb-1">
                <Calculator className="w-3.5 h-3.5" />
                ESTIMATOR
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Estimate Your Extra Yearly Outflow (vs 2014)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Estimated extra cost today from higher fuel taxes, gas cylinders, and groceries.
              </p>
            </div>

            {/* Total Result */}
            <div className="bg-slate-950 border border-orange-500/40 p-3 sm:p-4 rounded-xl text-right shrink-0">
              <span className="text-[11px] font-mono text-slate-400 block">
                Estimated Extra Cost:
              </span>
              <span className="text-2xl sm:text-3xl font-black font-mono text-[#FFB347]">
                ₹{totalAnnualSqueeze.toLocaleString('en-IN')}
                <span className="text-xs text-slate-400 font-sans font-normal"> / yr</span>
              </span>
              <span className="text-[11px] text-rose-400 font-mono block">
                ≈ ₹{Math.round(totalAnnualSqueeze / 12).toLocaleString('en-IN')} / month
              </span>
            </div>
          </div>

          {/* 3 Interactive Sliders */}
          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Slider 1: Petrol */}
            <div className="space-y-1.5 p-3.5 rounded-lg bg-slate-950 border border-slate-800">
              <div className="flex justify-between text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Fuel className="w-3.5 h-3.5 text-orange-400" />
                  Monthly Fuel
                </span>
                <span className="font-mono text-[#FFB347] font-bold">{petrolLitresPerMonth} L</span>
              </div>
              <input
                type="range"
                min={0}
                max={150}
                step={5}
                value={petrolLitresPerMonth}
                onChange={(e) => setPetrolLitresPerMonth(Number(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>0 L</span>
                <span>+₹{annualExtraFuelTax.toLocaleString('en-IN')}/yr tax</span>
                <span>150 L</span>
              </div>
            </div>

            {/* Slider 2: LPG */}
            <div className="space-y-1.5 p-3.5 rounded-lg bg-slate-950 border border-slate-800">
              <div className="flex justify-between text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-orange-400" />
                  LPG Cylinders / Year
                </span>
                <span className="font-mono text-[#FFB347] font-bold">{cylindersPerYear}</span>
              </div>
              <input
                type="range"
                min={1}
                max={16}
                step={1}
                value={cylindersPerYear}
                onChange={(e) => setCylindersPerYear(Number(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>1</span>
                <span>+₹{annualExtraLpgCost.toLocaleString('en-IN')}/yr extra</span>
                <span>16</span>
              </div>
            </div>

            {/* Slider 3: Groceries */}
            <div className="space-y-1.5 p-3.5 rounded-lg bg-slate-950 border border-slate-800">
              <div className="flex justify-between text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5 text-orange-400" />
                  Monthly Groceries
                </span>
                <span className="font-mono text-[#FFB347] font-bold">₹{grocerySpendPerMonth.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min={2000}
                max={25000}
                step={500}
                value={grocerySpendPerMonth}
                onChange={(e) => setGrocerySpendPerMonth(Number(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>₹2,000</span>
                <span>+₹{annualExtraStaplesCost.toLocaleString('en-IN')}/yr</span>
                <span>₹25,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
