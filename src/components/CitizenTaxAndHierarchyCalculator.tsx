import React, { useState, useMemo } from 'react';
import {
  Calculator,
  TrendingUp,
  Percent,
  Layers,
  ArrowUpRight,
  Info,
  ShieldAlert,
  Building2,
  Users,
  PieChart as PieIcon,
  DollarSign,
  AlertTriangle,
  Receipt,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface Props {
  onOpenSources?: () => void;
}

export const CitizenTaxAndHierarchyCalculator: React.FC<Props> = ({ onOpenSources }) => {
  const { t } = useLanguage();
  // State for annual salary in Rupees (default: ₹12 Lakh = ₹1,00,000/month)
  const [annualSalary, setAnnualSalary] = useState<number>(1200000);
  const [familyDependents, setFamilyDependents] = useState<number>(3);
  const [monthlyFuelLiters, setMonthlyFuelLiters] = useState<number>(40);

  // Income Presets for Quick Navigation
  const PRESET_INCOMES = [
    { label: '₹3 Lakh (₹25k/mo)', value: 300000, description: 'Top 10% cutoff in India' },
    { label: '₹6 Lakh (₹50k/mo)', value: 600000, description: 'Top 4% of workforce' },
    { label: '₹12 Lakh (₹1L/mo)', value: 1200000, description: 'Top 1.5% middle class' },
    { label: '₹25 Lakh (₹2.1L/mo)', value: 2500000, description: 'Top 0.4% upper tier' },
    { label: '₹50 Lakh (₹4.2L/mo)', value: 5000000, description: 'Top 0.1% elite 1 in 1000' },
    { label: '₹1 Crore', value: 10000000, description: 'Top 0.03% super elite' },
  ];

  // Calculation Logic (FY 2024-25 New Tax Regime with Standard Deduction of ₹75,000)
  const taxCalculations = useMemo(() => {
    const stdDeduction = 75000;
    const taxableIncome = Math.max(0, annualSalary - stdDeduction);

    let baseIncomeTax = 0;
    // Slabs:
    // 0 to 3,00,000: Nil
    // 3,00,001 to 7,00,000: 5%
    // 7,00,001 to 10,00,000: 10%
    // 10,00,001 to 12,00,000: 15%
    // 12,00,001 to 15,00,000: 20%
    // Above 15,00,000: 30%
    if (taxableIncome <= 700000) {
      // Sec 87A rebate covers up to ₹7,00,000 in taxable income under New Regime
      baseIncomeTax = 0;
    } else {
      if (taxableIncome > 300000) {
        baseIncomeTax += Math.min(400000, taxableIncome - 300000) * 0.05;
      }
      if (taxableIncome > 700000) {
        baseIncomeTax += Math.min(300000, taxableIncome - 700000) * 0.10;
      }
      if (taxableIncome > 1000000) {
        baseIncomeTax += Math.min(200000, taxableIncome - 1000000) * 0.15;
      }
      if (taxableIncome > 1200000) {
        baseIncomeTax += Math.min(300000, taxableIncome - 1200000) * 0.20;
      }
      if (taxableIncome > 1500000) {
        baseIncomeTax += (taxableIncome - 1500000) * 0.30;
      }
    }

    // Health and Education Cess @ 4%
    const cess = Math.round(baseIncomeTax * 0.04);
    const totalDirectIncomeTax = Math.round(baseIncomeTax + cess);

    // Estimated Indirect Taxes Paid (GST on groceries, FMCG, electronics, telecom, restaurant + Fuel Excise)
    // Common citizens spend ~60-80% of net income on consumption.
    // Average blended GST rate on consumption basket is ~11.5%
    // Plus Union excise duty on petrol/diesel (₹19.90/litre)
    const annualTakeHome = annualSalary - totalDirectIncomeTax;
    const estimatedAnnualConsumptionSpend = Math.round(annualTakeHome * (annualSalary > 2500000 ? 0.45 : 0.72));
    const estimatedGstPaid = Math.round(estimatedAnnualConsumptionSpend * 0.118);
    const annualFuelExciseTax = Math.round(monthlyFuelLiters * 19.90 * 12);
    const totalIndirectTaxes = estimatedGstPaid + annualFuelExciseTax;

    const grandTotalTaxPaid = totalDirectIncomeTax + totalIndirectTaxes;
    const effectiveTotalTaxRatePct = ((grandTotalTaxPaid / annualSalary) * 100).toFixed(1);
    const effectiveDirectTaxRatePct = ((totalDirectIncomeTax / annualSalary) * 100).toFixed(1);

    // Population Hierarchy Percentile (Based on PLFS & State of Inequality in India / WID 2024 data)
    let percentile = 99.9;
    let percentileLabel = 'Top 0.01%';
    let hierarchyTier = 'Super Elite';
    let colorScheme = 'text-emerald-400 border-emerald-500/40 bg-emerald-950/40';

    if (annualSalary < 120000) {
      percentile = 35.0;
      percentileLabel = 'Bottom 50%';
      hierarchyTier = 'Subsistence Informal Tier';
      colorScheme = 'text-rose-400 border-rose-500/40 bg-rose-950/40';
    } else if (annualSalary < 240000) {
      percentile = 70.0;
      percentileLabel = 'Top 30%';
      hierarchyTier = 'Low-Income Working Class';
      colorScheme = 'text-amber-400 border-amber-500/40 bg-amber-950/40';
    } else if (annualSalary < 360000) {
      percentile = 90.0;
      percentileLabel = 'Top 10%';
      hierarchyTier = 'Upper-Working / Entry Salaried';
      colorScheme = 'text-amber-300 border-amber-500/40 bg-amber-950/40';
    } else if (annualSalary < 650000) {
      percentile = 96.0;
      percentileLabel = 'Top 4%';
      hierarchyTier = 'Middle Class Core';
      colorScheme = 'text-[#FF9933] border-[#FF9933]/40 bg-orange-950/40';
    } else if (annualSalary < 1500000) {
      percentile = 98.5;
      percentileLabel = 'Top 1.5%';
      hierarchyTier = 'Upper Middle Class';
      colorScheme = 'text-cyan-300 border-cyan-500/40 bg-cyan-950/40';
    } else if (annualSalary < 3000000) {
      percentile = 99.6;
      percentileLabel = 'Top 0.4%';
      hierarchyTier = 'Affluent Tier';
      colorScheme = 'text-emerald-300 border-emerald-500/40 bg-emerald-950/40';
    } else if (annualSalary < 7500000) {
      percentile = 99.9;
      percentileLabel = 'Top 0.1%';
      hierarchyTier = 'Top 1 in 1,000 Elite';
      colorScheme = 'text-purple-300 border-purple-500/40 bg-purple-950/40';
    } else {
      percentile = 99.97;
      percentileLabel = 'Top 0.03%';
      hierarchyTier = 'Ultra High Net Worth (UHNW)';
      colorScheme = 'text-yellow-300 border-yellow-500/40 bg-yellow-950/40';
    }

    // Number of Indians earning less than this person (out of ~95 crore adult working population)
    const adultWorkforce = 950000000;
    const peopleEarningLess = Math.round(adultWorkforce * (percentile / 100));

    return {
      taxableIncome,
      baseIncomeTax,
      cess,
      totalDirectIncomeTax,
      estimatedGstPaid,
      annualFuelExciseTax,
      totalIndirectTaxes,
      grandTotalTaxPaid,
      effectiveTotalTaxRatePct,
      effectiveDirectTaxRatePct,
      percentile,
      percentileLabel,
      hierarchyTier,
      colorScheme,
      peopleEarningLess
    };
  }, [annualSalary, monthlyFuelLiters]);

  const formatINR = (val: number) => {
    return '₹' + val.toLocaleString('en-IN');
  };

  return (
    <section id="tax-calculator" className="py-14 bg-[#080C10] border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#FF9933]/15 text-[#FF9933] border border-[#FF9933]/30 mb-4">
            <Calculator className="w-3.5 h-3.5" />
            Citizen Tax & Population Income Hierarchy Calculator
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How Much Tax Do You Really Pay?
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300 leading-relaxed">
            Enter your annual income to calculate your <span className="text-white font-semibold">Direct Income Tax</span>, hidden <span className="text-white font-semibold">Indirect Taxes (GST & Fuel Cess)</span>, your <span className="text-[#FF9933] font-semibold">Exact Population Hierarchy Percentile</span>, and how your burden compares with corporate tax concessions.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <span className="text-xs font-semibold text-slate-400 mr-2 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#FF9933]" /> Quick Income Presets:
          </span>
          {PRESET_INCOMES.map((preset) => (
            <button
              key={preset.value}
              onClick={() => setAnnualSalary(preset.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                annualSalary === preset.value
                  ? 'bg-[#FF9933] text-slate-950 shadow-md shadow-[#FF9933]/25 scale-105'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Main Grid: Inputs + Results */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Interactive Controls */}
          <div className="lg:col-span-5 space-y-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Receipt className="w-4 h-4 text-[#FF9933]" />
                Your Income & Consumption Profile
              </h3>
              <span className="text-[11px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                FY 2024-25 Rules
              </span>
            </div>

            {/* Annual Salary Input */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Gross Annual Salary / Total Income:
                </label>
                <span className="text-lg font-black text-[#FF9933] font-mono">
                  {formatINR(annualSalary)}
                </span>
              </div>
              <input
                type="range"
                min={150000}
                max={15000000}
                step={50000}
                value={annualSalary}
                onChange={(e) => setAnnualSalary(Number(e.target.value))}
                className="w-full accent-[#FF9933] cursor-pointer bg-slate-950 h-2 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1">
                <span>₹1.5 Lakh</span>
                <span>₹50 Lakh</span>
                <span>₹1.5 Crore</span>
              </div>
            </div>

            {/* Manual Number Input */}
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
              <input
                type="number"
                value={annualSalary}
                onChange={(e) => setAnnualSalary(Math.max(0, Number(e.target.value)))}
                step={25000}
                className="w-full bg-slate-950 border border-slate-700/90 rounded-lg pl-8 pr-4 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-[#FF9933]"
                placeholder="Enter exact annual income in Rupees"
              />
            </div>

            {/* Monthly Fuel Consumption */}
            <div className="pt-2 border-t border-slate-800">
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                  Monthly Petrol/Diesel Consumption:
                </label>
                <span className="text-sm font-bold text-slate-200 font-mono">
                  {monthlyFuelLiters} Liters/mo
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={250}
                step={5}
                value={monthlyFuelLiters}
                onChange={(e) => setMonthlyFuelLiters(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer bg-slate-950 h-1.5 rounded-lg"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Union Excise Duty of <strong className="text-slate-200">₹19.90/L</strong> is levied on petrol before State VAT.
              </p>
            </div>

            {/* Context Note */}
            <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 text-xs space-y-2">
              <div className="flex items-center gap-1.5 text-[#FF9933] font-bold">
                <Info className="w-4 h-4" />
                The New Tax Regime Asymmetry:
              </div>
              <p className="text-slate-300 leading-relaxed">
                Under the New Tax Regime, salaried citizens get zero deductions for HRA, 80C savings, health insurance, or home loan interest. Meanwhile, large corporations deduct executive salaries, depreciation, interest expenses, and pay a base corporate tax rate cut to <strong className="text-white">22%</strong> (or <strong className="text-white">15%</strong> for new companies).
              </p>
            </div>
          </div>

          {/* Right Column: Dynamic Hierarchy Rank + Tax Breakdown */}
          <div className="lg:col-span-7 space-y-5">
            {/* Top Callout: Income Percentile Hierarchy in India */}
            <div className={`rounded-2xl border p-6 shadow-xl relative overflow-hidden ${taxCalculations.colorScheme}`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-300 flex items-center gap-1.5">
                    <Users className="w-4 h-4" />
                    Where You Stand in India's Population:
                  </span>
                  <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight mt-1 text-white">
                    {taxCalculations.percentileLabel} of India
                  </div>
                </div>
                <div className="sm:text-right">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-slate-950/80 border border-slate-700 text-slate-200">
                    {taxCalculations.hierarchyTier}
                  </span>
                  <div className="text-[11px] text-slate-300 mt-1 font-mono">
                    Ahead of ~{(taxCalculations.peopleEarningLess / 10000000).toFixed(1)} Crore working adults
                  </div>
                </div>
              </div>

              {/* Progress Bar of Population */}
              <div className="w-full bg-slate-950/80 rounded-full h-3.5 p-0.5 border border-slate-700/80 mb-3">
                <div
                  className="bg-gradient-to-r from-emerald-500 via-[#FF9933] to-amber-300 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(5, taxCalculations.percentile))}%` }}
                />
              </div>

              <p className="text-xs text-slate-200 leading-relaxed">
                According to the <strong className="text-white">State of Inequality in India Report (EAC-PM / MoSPI)</strong>, earning even <strong className="text-white">₹25,000/month (₹3 Lakh/year)</strong> places an Indian in the top 10% of wage earners. India's median worker earns under <strong className="text-white">₹11,500/month</strong> in the informal sector.
              </p>
            </div>

            {/* Total Tax Ledger Card */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#FF9933]" />
                    Total Tax Extraction Breakdown
                  </h3>
                  <p className="text-xs text-slate-400">Direct Income Tax + Estimated Indirect Taxes (GST & Fuel)</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-400 uppercase">Effective Total Tax Rate:</span>
                  <div className="text-2xl font-black text-[#FF9933] font-mono">
                    {taxCalculations.effectiveTotalTaxRatePct}%
                  </div>
                </div>
              </div>

              {/* 3 Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Direct Income Tax:
                  </span>
                  <span className="text-xl font-black text-rose-400 font-mono mt-1 block">
                    {formatINR(taxCalculations.totalDirectIncomeTax)}
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {taxCalculations.effectiveDirectTaxRatePct}% of gross salary
                  </span>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Estimated GST & Cess:
                  </span>
                  <span className="text-xl font-black text-amber-400 font-mono mt-1 block">
                    {formatINR(taxCalculations.estimatedGstPaid)}
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">
                    ~11.8% on living expenses
                  </span>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Fuel Union Excise:
                  </span>
                  <span className="text-xl font-black text-amber-300 font-mono mt-1 block">
                    {formatINR(taxCalculations.annualFuelExciseTax)}
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">
                    ₹19.90/L central excise
                  </span>
                </div>
              </div>

              {/* Grand Total Bar */}
              <div className="bg-slate-950 border-l-4 border-rose-500 rounded-r-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-rose-400">
                    Grand Total Public Tax Extracted From You:
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-0.5">
                    {formatINR(taxCalculations.grandTotalTaxPaid)} <span className="text-xs font-normal text-slate-400">/ year</span>
                  </div>
                </div>
                <div className="text-xs text-slate-400 sm:text-right max-w-xs">
                  Equivalent to working <strong className="text-white">{Math.round((Number(taxCalculations.effectiveTotalTaxRatePct) / 100) * 365)} days</strong> every year solely to pay government taxes.
                </div>
              </div>

              {/* Contrast with 1% / Corporate Tax */}
              <div className="mt-5 pt-4 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5">
                  <div className="font-bold text-slate-200 flex items-center gap-1.5 mb-1 text-sm">
                    <Building2 className="w-4 h-4 text-cyan-400" />
                    How Big Corporates Pay Less:
                  </div>
                  <ul className="text-slate-400 space-y-1.5 leading-relaxed">
                    <li>• Base corporate tax slashed from 30% to <strong className="text-slate-200">22%</strong> (15% for manufacturing).</li>
                    <li>• Corporate write-offs for depreciation, loan interest, consulting, and offshore IP fees.</li>
                    <li>• Effective tax rate of top 100 BSE companies is <strong className="text-slate-200">17.2% to 21.4%</strong>.</li>
                  </ul>
                </div>

                <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5">
                  <div className="font-bold text-slate-200 flex items-center gap-1.5 mb-1 text-sm">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    How The Common Citizen is Squeezed:
                  </div>
                  <ul className="text-slate-400 space-y-1.5 leading-relaxed">
                    <li>• Zero business deduction for travel, rent, medical or food bills.</li>
                    <li>• Pays 18% GST on health insurance premiums and mobile tariffs.</li>
                    <li>• Pays highest petroleum taxation in Asia regardless of world crude price.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
