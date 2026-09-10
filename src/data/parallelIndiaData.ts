export interface HeroKPIData {
  id: string;
  metric: string;
  label: string;
  subtext: string;
  source: string;
  sourceBadge: string;
  sourceUrl: string;
  trend: 'surge' | 'crisis' | 'inflation';
}

export interface DivergencePoint {
  year: string;
  politicianWealthIndex: number; // Base 100 in 2014
  politicianWealthAvgCr: number; // in Crores
  householdSavingsPctGDP: number; // % of GDP (RBI)
  householdSavingsIndex: number; // Base 100 in 2014
  ruralRealWageIndex: number; // Adjusted for rural CPI (Base 100 in 2014)
  unsecuredDebtIndex: number; // Personal unsecured loans (Base 100 in 2014)
  unsecuredDebtLakhCr: number;
}

export interface PriceSqueezeItem {
  id: string;
  commodity: string;
  unit: string;
  price2014: number;
  pricePresent: number;
  changePct: number;
  taxPolicyFactor: string;
  source: string;
  sourceUrl: string;
  iconName: 'flame' | 'fuel' | 'utensils' | 'train' | 'creditCard';
}

export interface PoliticianAffidavit {
  id: string;
  name: string;
  role: string;
  party: string;
  state: string;
  constituency: string;
  assets2014Cr: number;
  assets2019Cr: number;
  assets2024Cr: number;
  netJumpCr: number;
  growthPct: number;
  sourceUrl: string;
  notes?: string;
}

export interface PaperLeakIncident {
  year: number;
  exam: string;
  state: string;
  aspirantsImpacted: string;
  status: string;
}

export const HERO_KPIS: HeroKPIData[] = [
  {
    id: 'kpi-pol-wealth',
    metric: '+108% Asset Surge',
    label: 'Re-elected BJP MPs Average Wealth',
    subtext: 'Average declared wealth of repeat BJP MPs surged past ₹38.7 Crore in 2024 affidavits',
    source: 'Association for Democratic Reforms (ADR India) Lok Sabha Election Watch Reports',
    sourceBadge: 'ADR India',
    sourceUrl: 'https://adrindia.org',
    trend: 'surge',
  },
  {
    id: 'kpi-household-debt',
    metric: '18.4% Household Debt',
    label: 'Gross Financial Liabilities vs GDP',
    subtext: 'Net household financial savings collapsed to 5.2% of GDP—a historic 47-year low',
    source: 'Reserve Bank of India (RBI Bulletin & Financial Stability Report 2023-2024)',
    sourceBadge: 'RBI Bulletin',
    sourceUrl: 'https://www.rbi.org.in',
    trend: 'crisis',
  },
  {
    id: 'kpi-unemployment',
    metric: '16–20% Educated Youth Jobless',
    label: 'Graduate Unemployment Pressure',
    subtext: '83% of India’s total unemployed are youth; graduate unemployment hits 29.1%',
    source: 'International Labour Organization (ILO) & IHD India Employment Report 2024 / MoSPI PLFS',
    sourceBadge: 'PLFS / ILO',
    sourceUrl: 'https://www.ilo.org',
    trend: 'crisis',
  },
  {
    id: 'kpi-lpg-price',
    metric: '₹1,100+ Cylinder vs ₹410',
    label: 'Cost of Domestic Living Shock',
    subtext: 'Domestic LPG cylinder spiked +169% peak; central fuel excise jumped over +110%',
    source: 'Petroleum Planning & Analysis Cell (PPAC), Ministry of Petroleum & Natural Gas',
    sourceBadge: 'PPAC / MoPNG',
    sourceUrl: 'https://ppac.gov.in',
    trend: 'inflation',
  },
];

export const DIVERGENCE_SERIES: DivergencePoint[] = [
  {
    year: '2014',
    politicianWealthIndex: 100,
    politicianWealthAvgCr: 13.4,
    householdSavingsPctGDP: 7.6,
    householdSavingsIndex: 100,
    ruralRealWageIndex: 100,
    unsecuredDebtIndex: 100,
    unsecuredDebtLakhCr: 11.2,
  },
  {
    year: '2016',
    politicianWealthIndex: 128,
    politicianWealthAvgCr: 17.1,
    householdSavingsPctGDP: 7.4,
    householdSavingsIndex: 97.4,
    ruralRealWageIndex: 101.5,
    unsecuredDebtIndex: 126,
    unsecuredDebtLakhCr: 14.1,
  },
  {
    year: '2018',
    politicianWealthIndex: 165,
    politicianWealthAvgCr: 22.1,
    householdSavingsPctGDP: 7.1,
    householdSavingsIndex: 93.4,
    ruralRealWageIndex: 102.1,
    unsecuredDebtIndex: 168,
    unsecuredDebtLakhCr: 18.8,
  },
  {
    year: '2019',
    politicianWealthIndex: 208,
    politicianWealthAvgCr: 27.9,
    householdSavingsPctGDP: 7.8,
    householdSavingsIndex: 102.6,
    ruralRealWageIndex: 102.9,
    unsecuredDebtIndex: 198,
    unsecuredDebtLakhCr: 22.2,
  },
  {
    year: '2021',
    politicianWealthIndex: 242,
    politicianWealthAvgCr: 32.4,
    householdSavingsPctGDP: 7.3,
    householdSavingsIndex: 96.1,
    ruralRealWageIndex: 101.2, // Rural real wages turned negative during inflation spike
    unsecuredDebtIndex: 236,
    unsecuredDebtLakhCr: 26.4,
  },
  {
    year: '2023',
    politicianWealthIndex: 285,
    politicianWealthAvgCr: 38.2,
    householdSavingsPctGDP: 5.3,
    householdSavingsIndex: 69.7, // Sharp plunge in net financial savings
    ruralRealWageIndex: 102.8,
    unsecuredDebtIndex: 290,
    unsecuredDebtLakhCr: 32.5,
  },
  {
    year: '2024',
    politicianWealthIndex: 318,
    politicianWealthAvgCr: 42.6,
    householdSavingsPctGDP: 5.2,
    householdSavingsIndex: 68.4, // 47-year low confirmed by RBI
    ruralRealWageIndex: 104.2,
    unsecuredDebtIndex: 321,
    unsecuredDebtLakhCr: 36.0,
  },
];

export const PRICE_SQUEEZE_DATA: PriceSqueezeItem[] = [
  {
    id: 'lpg-gas',
    commodity: 'Domestic LPG Cylinder (14.2 kg)',
    unit: 'Per Cylinder (Delhi)',
    price2014: 410.5,
    pricePresent: 803.0, // Peaked at ₹1,103 in 2022-2023; current subsidised rate ₹803
    changePct: 95.6,
    taxPolicyFactor: 'Direct subsidy systematically eliminated for ~20 Crore households; Peak price hit ₹1,103 in March 2023 (+169%).',
    source: 'PPAC / IOCL Historical Tariff Sheets',
    sourceUrl: 'https://ppac.gov.in',
    iconName: 'flame',
  },
  {
    id: 'petrol-excise',
    commodity: 'Petrol (Retail Price & Union Excise Duty)',
    unit: 'Per Litre (Delhi)',
    price2014: 71.41,
    pricePresent: 96.72,
    changePct: 35.4,
    taxPolicyFactor: 'Union Central Excise was ₹9.48/L in May 2014; surged to ₹32.90/L in 2021 before settling at ₹19.90/L (+110% higher tax burden).',
    source: 'Ministry of Petroleum & Natural Gas / PPAC',
    sourceUrl: 'https://ppac.gov.in',
    iconName: 'fuel',
  },
  {
    id: 'diesel-excise',
    commodity: 'Diesel (Commercial & Agri Lifeline)',
    unit: 'Per Litre (Delhi)',
    price2014: 55.49,
    pricePresent: 89.62,
    changePct: 61.5,
    taxPolicyFactor: 'Central Excise on Diesel rose from ₹3.56/L (2014) to ₹15.80/L (Present), an unprecedented +344% increase impacting all food freight.',
    source: 'PPAC / Ministry of Finance Notifications',
    sourceUrl: 'https://ppac.gov.in',
    iconName: 'fuel',
  },
  {
    id: 'mustard-oil',
    commodity: 'Mustard Oil / Cooking Edible Oils',
    unit: 'Per Litre / Kg (Retail Avg)',
    price2014: 85.0,
    pricePresent: 155.0,
    changePct: 82.4,
    taxPolicyFactor: 'Spiked to ₹195/L in 2021-2022; import duty flips and supply shocks hit low-income kitchen nutrition.',
    source: 'Department of Consumer Affairs, Price Monitoring Cell',
    sourceUrl: 'https://consumeraffairs.nic.in',
    iconName: 'utensils',
  },
  {
    id: 'train-travel',
    commodity: 'Ordinary Passenger Rail Fares & Tatkal',
    unit: 'Avg Sleeper/Express Fare',
    price2014: 240.0,
    pricePresent: 465.0,
    changePct: 93.8,
    taxPolicyFactor: 'De-facto elimination of unreserved passenger trains via Express reclassification; dynamic surge pricing on premium routes.',
    source: 'CAG Report No. 22 on Indian Railways Financials',
    sourceUrl: 'https://cag.gov.in',
    iconName: 'train',
  },
  {
    id: 'unsecured-debt',
    commodity: 'Household Personal & Credit Card Debt',
    unit: 'Total Banking Exposure (Lakh Cr ₹)',
    price2014: 11.2,
    pricePresent: 36.0,
    changePct: 221.4,
    taxPolicyFactor: 'Households tapped short-term high-interest credit to cover routine health, groceries, and education shocks as net savings cratered to 5.2% of GDP.',
    source: 'RBI Financial Stability Report (June 2024)',
    sourceUrl: 'https://rbi.org.in',
    iconName: 'creditCard',
  },
];

export const POLITICIAN_AFFIDAVITS_BJP: PoliticianAffidavit[] = [
  {
    id: 'pol-1',
    name: 'Rajeev Chandrasekhar',
    role: 'Former Union Minister of State (Electronics & IT)',
    party: 'BJP',
    state: 'Karnataka / Kerala',
    constituency: 'Thiruvananthapuram (2024 LS) / RS',
    assets2014Cr: 28.14, // 2018 RS affidavit baseline
    assets2019Cr: 65.40,
    assets2024Cr: 680.02,
    netJumpCr: 651.88,
    growthPct: 2316,
    sourceUrl: 'https://myneta.info/LokSabha2024/candidate.php?candidate_id=6887',
    notes: 'Massive surge declared in holding companies and technology investment vehicles.',
  },
  {
    id: 'pol-2',
    name: 'Jyotiraditya Scindia',
    role: 'Union Minister of Communications & Civil Aviation',
    party: 'BJP (joined 2020)',
    state: 'Madhya Pradesh',
    constituency: 'Guna (Lok Sabha 2024)',
    assets2014Cr: 32.64,
    assets2019Cr: 374.56,
    assets2024Cr: 424.70,
    netJumpCr: 392.06,
    growthPct: 1201,
    sourceUrl: 'https://myneta.info/LokSabha2024/candidate.php?candidate_id=3401',
    notes: 'Revaluation of ancestral estates, royal trust holdings, and corporate equity.',
  },
  {
    id: 'pol-3',
    name: 'Poonamben Maadam',
    role: 'Member of Parliament (3-Term)',
    party: 'BJP',
    state: 'Gujarat',
    constituency: 'Jamnagar',
    assets2014Cr: 29.80,
    assets2019Cr: 42.71,
    assets2024Cr: 147.28,
    netJumpCr: 117.48,
    growthPct: 394,
    sourceUrl: 'https://myneta.info/LokSabha2024/candidate.php?candidate_id=3148',
    notes: 'Significant accumulation in non-agricultural land holdings and bullion.',
  },
  {
    id: 'pol-4',
    name: 'Rao Inderjit Singh',
    role: 'Union Minister of State (Statistics & Prog. Implementation)',
    party: 'BJP',
    state: 'Haryana',
    constituency: 'Gurgaon',
    assets2014Cr: 19.62,
    assets2019Cr: 42.06,
    assets2024Cr: 121.54,
    netJumpCr: 101.92,
    growthPct: 519,
    sourceUrl: 'https://myneta.info/LokSabha2024/candidate.php?candidate_id=5322',
    notes: 'Spike in prime commercial and residential properties in NCR Delhi.',
  },
  {
    id: 'pol-5',
    name: 'Hema Malini',
    role: 'Member of Parliament (3-Term)',
    party: 'BJP',
    state: 'Uttar Pradesh',
    constituency: 'Mathura',
    assets2014Cr: 178.46,
    assets2019Cr: 250.82,
    assets2024Cr: 278.93,
    netJumpCr: 100.47,
    growthPct: 56,
    sourceUrl: 'https://myneta.info/LokSabha2024/candidate.php?candidate_id=2081',
    notes: 'High-value real estate appreciation across Mumbai and Chennai.',
  },
  {
    id: 'pol-6',
    name: 'Tejasvi Surya',
    role: 'Member of Parliament & President, BJYM',
    party: 'BJP',
    state: 'Karnataka',
    constituency: 'Bangalore South',
    assets2014Cr: 0.13, // 2019 first run: ₹13.4 Lakhs
    assets2019Cr: 0.13,
    assets2024Cr: 4.10,
    netJumpCr: 3.97,
    growthPct: 3053,
    sourceUrl: 'https://myneta.info/LokSabha2024/candidate.php?candidate_id=6481',
    notes: 'Declared 30x asset surge over a single parliamentary term from equity portfolios and deposits.',
  },
  {
    id: 'pol-7',
    name: 'Manoj Tiwari',
    role: 'Member of Parliament (3-Term)',
    party: 'BJP',
    state: 'Delhi',
    constituency: 'North East Delhi',
    assets2014Cr: 8.38,
    assets2019Cr: 24.28,
    assets2024Cr: 28.05,
    netJumpCr: 19.67,
    growthPct: 235,
    sourceUrl: 'https://myneta.info/LokSabha2024/candidate.php?candidate_id=4180',
    notes: 'Tripled declared net worth since 2014 with investments in NCR properties.',
  },
  {
    id: 'pol-8',
    name: 'Nishikant Dubey',
    role: 'Member of Parliament (4-Term)',
    party: 'BJP',
    state: 'Jharkhand',
    constituency: 'Godda',
    assets2014Cr: 3.92,
    assets2019Cr: 15.76,
    assets2024Cr: 41.22,
    netJumpCr: 37.30,
    growthPct: 952,
    sourceUrl: 'https://myneta.info/LokSabha2024/candidate.php?candidate_id=4572',
    notes: 'Grew from ~₹4 Cr in 2014 to over ₹41 Cr in 2024 across movable assets and real estate.',
  },
  {
    id: 'pol-9',
    name: 'Anurag Singh Thakur',
    role: 'Former Union Cabinet Minister (I&B / Sports)',
    party: 'BJP',
    state: 'Himachal Pradesh',
    constituency: 'Hamirpur',
    assets2014Cr: 4.51,
    assets2019Cr: 5.48,
    assets2024Cr: 11.23,
    netJumpCr: 6.72,
    growthPct: 149,
    sourceUrl: 'https://myneta.info/LokSabha2024/candidate.php?candidate_id=5812',
    notes: 'More than doubled assets with agricultural holdings, mutual funds, and ancestral shares.',
  },
  {
    id: 'pol-10',
    name: 'P.P. Chaudhary',
    role: 'Member of Parliament & Former Union MoS (Law & Justice)',
    party: 'BJP',
    state: 'Rajasthan',
    constituency: 'Pali',
    assets2014Cr: 12.48,
    assets2019Cr: 23.82,
    assets2024Cr: 38.64,
    netJumpCr: 26.16,
    growthPct: 210,
    sourceUrl: 'https://myneta.info/LokSabha2024/candidate.php?candidate_id=5108',
    notes: 'Over 3x asset growth across commercial buildings in Jodhpur and Delhi.',
  },
  {
    id: 'pol-11',
    name: 'Brij Bhushan Sharan Singh / Family',
    role: '6-Term MP / Karan Bhushan Singh (2024)',
    party: 'BJP',
    state: 'Uttar Pradesh',
    constituency: 'Kaiserganj',
    assets2014Cr: 2.91,
    assets2019Cr: 9.89,
    assets2024Cr: 48.52,
    netJumpCr: 45.61,
    growthPct: 1567,
    sourceUrl: 'https://myneta.info/LokSabha2024/candidate.php?candidate_id=1983',
    notes: 'Substantial expansion into private educational trusts, colleges, and vehicles.',
  },
  {
    id: 'pol-12',
    name: 'Chhattarpal Singh Gangwar',
    role: 'Member of Parliament (Bareilly 2024 / Ex-MLA)',
    party: 'BJP',
    state: 'Uttar Pradesh',
    constituency: 'Bareilly',
    assets2014Cr: 1.15,
    assets2019Cr: 6.40,
    assets2024Cr: 11.23,
    netJumpCr: 10.08,
    growthPct: 876,
    sourceUrl: 'https://myneta.info/LokSabha2024/candidate.php?candidate_id=1492',
    notes: 'Assets increased nearly tenfold from 2017 state assembly entry.',
  },
];

export const PAPER_LEAKS_TIMELINE: PaperLeakIncident[] = [
  {
    year: 2024,
    exam: 'NEET-UG & UGC-NET 2024',
    state: 'National (NTA)',
    aspirantsImpacted: '33+ Lakh Candidates',
    status: 'Scrapped / Re-conducted amid CBI probe into grace marks and paper trafficking.',
  },
  {
    year: 2024,
    exam: 'UP Police Constable Recruitment',
    state: 'Uttar Pradesh',
    aspirantsImpacted: '48 Lakh Candidates',
    status: 'Cancelled after question papers leaked on messaging groups; re-exam delayed.',
  },
  {
    year: 2023,
    exam: 'Bihar Teacher Recruitment (TRE 3.0)',
    state: 'Bihar',
    aspirantsImpacted: '3.7 Lakh Candidates',
    status: 'Cancelled by BPSC after solver gangs caught with printouts prior to exam morning.',
  },
  {
    year: 2023,
    exam: 'MP Patwari & Forest Guard Exam',
    state: 'Madhya Pradesh',
    aspirantsImpacted: '12.8 Lakh Candidates',
    status: 'High-scoring candidates emerged from single political college center; inquiry instituted.',
  },
  {
    year: 2022,
    exam: 'Railway RRB-NTPC & Group D Freezes',
    state: 'Bihar / UP / National',
    aspirantsImpacted: '1.25 Crore Applicants',
    status: 'Mass youth protests at railway tracks against 3-year delays; police crackdowns.',
  },
  {
    year: 2021,
    exam: 'SSC CGL / CHSL 3-Year Delays',
    state: 'National',
    aspirantsImpacted: '30+ Lakh Applicants',
    status: 'Multi-year court litigation over normalization formulas and joining freezes.',
  },
];

export const CITATION_REGISTRY = [
  {
    code: 'ADR India',
    title: 'Association for Democratic Reforms — Analysis of Wealth Growth of Re-contesting MPs in Lok Sabha 2014–2024',
    sourceText: 'Form 26 Sworn Election Affidavits submitted to the Election Commission of India (ECI). Published in ADR National Election Watch reports.',
    url: 'https://adrindia.org',
  },
  {
    code: 'RBI Bulletin',
    title: 'Reserve Bank of India — Monthly Bulletin & Financial Stability Report (June 2024 / Sept 2023)',
    sourceText: 'Preliminary Estimates of Household Financial Assets and Liabilities (Table: Net Financial Savings of Households fell to 5.2% of GDP in FY23; Financial Liabilities rose to 5.8%).',
    url: 'https://www.rbi.org.in',
  },
  {
    code: 'PLFS / ILO',
    title: 'India Employment Report 2024: Youth Employment, Education and Skills',
    sourceText: 'Joint study by International Labour Organization (ILO) and Institute for Human Development (IHD), drawing on Periodic Labour Force Survey (PLFS) micro-data.',
    url: 'https://www.ilo.org',
  },
  {
    code: 'PPAC / MoPNG',
    title: 'Petroleum Planning & Analysis Cell, Ministry of Petroleum and Natural Gas',
    sourceText: 'Historical Price Build-up for Subsidised & Non-Subsidised Domestic LPG and Petrol/Diesel Central Excise Duty Notifications (2014–2024).',
    url: 'https://ppac.gov.in',
  },
  {
    code: 'CAG India',
    title: 'Comptroller and Auditor General of India — Compliance Audit on Indian Railways',
    sourceText: 'Union Government Audit Reports No. 22 & 13 on Operating Ratio, Passenger Train Reclassification, and Dynamic Tatkal Surcharge Collections.',
    url: 'https://cag.gov.in',
  },
];
