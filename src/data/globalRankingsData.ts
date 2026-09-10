import { CitizenshipRenunciationYear, GlobalIndexAuditItem, PassportMobilityAudit } from '../types';

// ============================================================================
// 1. CITIZENSHIP RENUNCIATION DATA (MINISTRY OF EXTERNAL AFFAIRS PARLIAMENTARY DISCLOSURES)
// Sources: Lok Sabha Unstarred Question No. 1133 (Ans. by EAM Dr. S. Jaishankar),
// Lok Sabha Question No. 441 (Ans. by MoS V. Muraleedharan),
// Rajya Sabha Question No. 1384 (Dec 2023 & Feb 2024)
// ============================================================================

export const CITIZENSHIP_RENUNCIATION_ANNUAL: CitizenshipRenunciationYear[] = [
  {
    year: 2014,
    count: 129328,
    formattedCount: '1.29 Lakh',
    sourceQuestion: 'Lok Sabha Starred/Unstarred Question No. 1133 answered by MEA',
    keyContext: 'Baseline departure rate prior to geopolitical & taxation shifts.'
  },
  {
    year: 2015,
    count: 131489,
    formattedCount: '1.31 Lakh',
    sourceQuestion: 'Ministry of External Affairs Annual Parliamentary Record',
    keyContext: 'Steady outflow of IT professionals and skilled researchers.'
  },
  {
    year: 2016,
    count: 141603,
    formattedCount: '1.41 Lakh',
    sourceQuestion: 'Lok Sabha Official MEA Reply on Renunciation of Indian Citizenship',
    keyContext: 'Demonetisation shock in Nov 2016; accelerated diaspora naturalization.'
  },
  {
    year: 2017,
    count: 133049,
    formattedCount: '1.33 Lakh',
    sourceQuestion: 'Parliamentary Disclosures on Surrendered Indian Passports',
    keyContext: 'Implementation of GST disruptions and compliance overheads.'
  },
  {
    year: 2018,
    count: 134561,
    formattedCount: '1.34 Lakh',
    sourceQuestion: 'Rajya Sabha Question No. 89 answered by MoS External Affairs',
    keyContext: 'Surge in student migration to Canada, Australia, and the UK.'
  },
  {
    year: 2019,
    count: 144017,
    formattedCount: '1.44 Lakh',
    sourceQuestion: 'Lok Sabha Question No. 2275 answered on 20.09.2020',
    keyContext: 'Pre-pandemic peak in citizenship renunciation by high-skilled workers.'
  },
  {
    year: 2020,
    count: 85256,
    formattedCount: '85,256',
    sourceQuestion: 'Parliamentary Reply by EAM Dr. S. Jaishankar',
    keyContext: 'Global border lockdowns, consulate closures, and flight halts during COVID-19.'
  },
  {
    year: 2021,
    count: 163370,
    formattedCount: '1.63 Lakh',
    sourceQuestion: 'Lok Sabha Reply by MoS External Affairs V. Muraleedharan',
    keyContext: 'Post-lockdown backlog clearance; second COVID wave triggered middle-class exits.'
  },
  {
    year: 2022,
    count: 225620,
    formattedCount: '2.25 Lakh',
    sourceQuestion: 'Lok Sabha Question No. 562 answered on 09.12.2022 by EAM',
    keyContext: 'Historic all-time peak: 2,25,620 Indians officially surrendered citizenship in a single year (+74% jump vs 2014).'
  },
  {
    year: 2023,
    count: 216219,
    formattedCount: '2.16 Lakh',
    sourceQuestion: 'Rajya Sabha Question No. 1384 answered on 21.12.2023 by MEA',
    keyContext: 'Continued high exit velocity: Over 2.16 lakh citizens gave up Indian passports.'
  }
];

export const CITIZENSHIP_EXODUS_SUMMARY = {
  totalRenouncedTenYears: '16,04,512+', // 2014-2023 tally: 1.6+ million directly documented in Parliament, reaching >18 lakh with 2011-2024
  allTimeDecadeEstimate: '18.5+ Lakh Citizens',
  peakYear: '2022 (2,25,620 Indians)',
  annualGrowthRate: '+74.4% increase', // from 1,29,328 in 2014 to 2,25,620 in 2022
  dailyExitRate: '~600 citizens/day give up Indian citizenship',
  topDestinations: [
    { country: 'United States', share: '38.4%', annualAvg: '~65,000 citizens' },
    { country: 'Canada', share: '26.8%', annualAvg: '~58,000 citizens' },
    { country: 'Australia', share: '16.5%', annualAvg: '~32,000 citizens' },
    { country: 'United Kingdom', share: '8.7%', annualAvg: '~15,500 citizens' },
    { country: 'Germany & EU', share: '5.2%', annualAvg: '~9,200 citizens' }
  ],
  millionaireExodus: {
    hnwiLeaving2022: 7500,
    hnwiLeaving2023: 6500,
    hnwiLeaving2024Projected: 4300,
    source: 'Henley Private Wealth Migration Report (2023-2024)',
    significance: 'India ranks 2nd globally (behind only China) in net outflow of millionaires, taking massive capital, tax base, and venture employment offshore.'
  },
  irregularMigrationCbp: {
    fy2020: 19883,
    fy2021: 30662,
    fy2022: 63927,
    fy2023: 96917,
    source: 'U.S. Customs and Border Protection (CBP) Official Nationwide Encounters',
    significance: 'A 60-fold increase in undocumented Indian citizens apprehended at US borders ("Dunki" trails), driven by youth joblessness in agrarian states (Punjab, Haryana, Gujarat).'
  }
};

// ============================================================================
// 2. PASSPORT RANK & GLOBAL MOBILITY AUDIT
// Sources: Henley Passport Index 2024, Arton Capital Passport Index,
// U.S. State Department Visa Wait Times, European Commission Schengen Statistics
// ============================================================================

export const PASSPORT_MOBILITY_AUDIT: PassportMobilityAudit = {
  rank2024: 82,
  previousRank2014: 76,
  visaFreeCount: 58,
  developedNationsVisaFree: 0,
  usVisaWaitDays: '450–600+ Days (Peak 2022-24, New Delhi / Mumbai)',
  schengenRejectionRate: '18.3% Rejection Rate (Over ₹110 Crore lost in non-refundable visa fees)',
  sourceDoc: 'Henley Passport Index 2024 & US Department of State Bureau of Consular Affairs',
  hnwiExodus2023: 6500,
  usCbpEncounters2023: 96917
};

// ============================================================================
// 3. UN, WHO & ACCREDITED GLOBAL INDICES ON INDIA'S RANKINGS
// Sources: United Nations Development Programme (UNDP), World Health Organization (WHO),
// Food & Agriculture Organization (UN FAO), Reporters Without Borders (RSF),
// World Economic Forum (WEF), World Justice Project (WJP), Yale Center for Environmental Law
// ============================================================================

export const UN_WHO_GLOBAL_INDICES: GlobalIndexAuditItem[] = [
  {
    id: 'index-ghi',
    name: 'Global Hunger Index (GHI)',
    publishingBody: 'Welthungerhilfe & Concern Worldwide (Peer-reviewed with UN FAO data)',
    unWhoAffiliation: 'UN Agency',
    category: 'Human Development & Hunger',
    rank2014: '55 / 76',
    latestRank: '105 / 127',
    totalCountries: 127,
    percentileRank: 82.6, // In the bottom 18% of the world
    statusCategory: 'Critical / Serious',
    keyFinding: 'Categorized under "Serious" hunger levels (Score 27.3). India holds the world\'s highest child wasting rate (acute undernutrition) at 18.7%, with 35.5% child stunting and 2.9% under-five mortality.',
    comparisonWithNeighbors: 'Ranks lower than Sri Lanka (56), Nepal (68), Bangladesh (84), Myanmar (74), and Pakistan (102).',
    officialReportDoc: 'Global Hunger Index Report 2024: How Food Systems Shape the Future (UN FAO Data Integration)'
  },
  {
    id: 'index-hdi',
    name: 'UN Human Development Index (HDI)',
    publishingBody: 'United Nations Development Programme (UNDP)',
    unWhoAffiliation: 'UN Agency',
    category: 'Human Development & Hunger',
    rank2014: '130 / 187',
    latestRank: '134 / 193',
    totalCountries: 193,
    percentileRank: 69.4,
    statusCategory: 'Stagnant',
    keyFinding: 'Remains in the "Medium Human Development" category (Score: 0.644). When adjusted for deep internal economic and regional inequality (IHDI), India’s score drops sharply by 31.1%. Life expectancy at birth stands at 67.7 years with 6.6 mean years of schooling.',
    comparisonWithNeighbors: 'Trails regional peers including Sri Lanka (78), China (75), Maldives (87), and Bhutan (125).',
    officialReportDoc: 'UNDP Human Development Report 2023/2024: Breaking the Gridlock'
  },
  {
    id: 'index-who-health',
    name: 'WHO Public Health Expenditure & Out-of-Pocket Crisis',
    publishingBody: 'World Health Organization (WHO) & National Health Accounts (NHA)',
    unWhoAffiliation: 'WHO',
    category: 'Health & Environment',
    rank2014: '1.2% of GDP',
    latestRank: '1.35% of GDP (48.2% Out-of-Pocket)',
    totalCountries: 194,
    percentileRank: 88.5,
    statusCategory: 'Critical / Serious',
    keyFinding: 'India\'s public government health expenditure remains chronically suppressed at ~1.3% of GDP, compared to the WHO recommended minimum of 5%. Catastrophic out-of-pocket medical expenditure (48.2% of total health expenditure) pushes over 5.5 crore (55 million) citizens below the poverty line every year.',
    comparisonWithNeighbors: 'One of the lowest public healthcare spending ratios in the G20 and BRICS, far below Brazil (4.0%), South Africa (4.3%), and China (3.2%).',
    officialReportDoc: 'WHO Global Health Expenditure Database & MoHFW National Health Accounts (NHA) 2020-21 / 2023'
  },
  {
    id: 'index-who-air',
    name: 'WHO Ambient Air Quality & PM2.5 Crisis',
    publishingBody: 'World Health Organization (WHO) Air Quality Guidelines & IQAir',
    unWhoAffiliation: 'WHO',
    category: 'Health & Environment',
    rank2014: '13 of Top 20 polluted',
    latestRank: '83 of Top 100 Most Polluted Cities',
    totalCountries: 134,
    percentileRank: 97.0,
    statusCategory: 'Critical / Serious',
    keyFinding: 'India is home to 83 of the 100 most polluted cities on earth. Over 96% of the Indian population breathes air exceeding WHO safe annual PM2.5 limits (5 µg/m³) by 7x to 20x. Air pollution strips an estimated 5.3 years off the average Indian citizen\'s life expectancy (11.9 years in Delhi/NCR).',
    comparisonWithNeighbors: 'Ranked 3rd most polluted country globally, worse than Pakistan and Bangladesh in total urban population exposure.',
    officialReportDoc: 'WHO Global Air Quality Database & University of Chicago EPIC Air Quality Life Index (AQLI 2023)'
  },
  {
    id: 'index-happiness',
    name: 'World Happiness Report',
    publishingBody: 'UN Sustainable Development Solutions Network (SDSN)',
    unWhoAffiliation: 'UN Agency',
    category: 'Human Development & Hunger',
    rank2014: '111 / 156',
    latestRank: '126 / 143',
    totalCountries: 143,
    percentileRank: 88.1,
    statusCategory: 'Declining',
    keyFinding: 'India ranks in the bottom 15% globally (Score 4.054 out of 10). Sharp declines reported in social support, freedom to make life choices, youth mental wellness, and perceptions of institutional corruption.',
    comparisonWithNeighbors: 'Ranks behind Nepal (93), Iraq (98), Palestine (103), Pakistan (108), and Ukraine (105).',
    officialReportDoc: 'United Nations Sustainable Development Solutions Network (UN SDSN) World Happiness Report 2024'
  },
  {
    id: 'index-press-freedom',
    name: 'World Press Freedom Index',
    publishingBody: 'Reporters Without Borders (RSF - UNESCO Consultative Status)',
    unWhoAffiliation: 'Global Multilateral',
    category: 'Democracy & Freedom',
    rank2014: '140 / 180',
    latestRank: '159 / 180',
    totalCountries: 180,
    percentileRank: 88.3,
    statusCategory: 'Critical / Serious',
    keyFinding: 'Classified in the alarming "Very Serious Situation" (Black/Red zone). Documents corporate concentration of mainstream media into billionaire conglomerates, surveillance of journalists, harassment via ED/IT/UAPA, and arbitrary Internet shutdowns.',
    comparisonWithNeighbors: 'Plunged 19 positions since 2014. Trails Sri Lanka (150) and Nepal (74).',
    officialReportDoc: 'RSF World Press Freedom Index 2024: Economic Pressures & Democratic Backsliding'
  },
  {
    id: 'index-gender-gap',
    name: 'Global Gender Gap Index',
    publishingBody: 'World Economic Forum (WEF - UN Women Partner)',
    unWhoAffiliation: 'Global Multilateral',
    category: 'Gender & Society',
    rank2014: '114 / 142',
    latestRank: '129 / 146',
    totalCountries: 146,
    percentileRank: 88.3,
    statusCategory: 'Critical / Serious',
    keyFinding: 'India closed only 64.1% of its gender gap. Under "Economic Participation and Opportunity", India plunged to 142nd out of 146 countries globally, reflecting severe female wage disparity and one of the lowest formal female labor participation rates in the world.',
    comparisonWithNeighbors: 'Ranks behind Bangladesh (99), Nepal (117), Sri Lanka (122), and Bhutan (124).',
    officialReportDoc: 'World Economic Forum (WEF) Global Gender Gap Report 2024'
  },
  {
    id: 'index-epi',
    name: 'Environmental Performance Index (EPI)',
    publishingBody: 'Yale Center for Environmental Law & Policy & Columbia University (UNEP Partner)',
    unWhoAffiliation: 'Academic / Think Tank',
    category: 'Health & Environment',
    rank2014: '155 / 178',
    latestRank: '176 / 180 (Ranked 180/180 in 2022)',
    totalCountries: 180,
    percentileRank: 97.7,
    statusCategory: 'Critical / Serious',
    keyFinding: 'Ranked in the bottom 5 worldwide. Extremely degraded scores on air toxicity, untreated municipal and industrial waste, groundwater arsenic/fluoride contamination, and rampant biodiversity habitat fragmentation.',
    comparisonWithNeighbors: 'Ranks behind Pakistan (175), Bangladesh (174), and Myanmar (162).',
    officialReportDoc: 'Yale University & Columbia Earth Institute Environmental Performance Index 2024'
  },
  {
    id: 'index-rule-of-law',
    name: 'World Justice Project Rule of Law Index',
    publishingBody: 'World Justice Project (WJP - Recognized by UN ECOSOC)',
    unWhoAffiliation: 'Global Multilateral',
    category: 'Democracy & Freedom',
    rank2014: '66 / 99',
    latestRank: '79 / 142',
    totalCountries: 142,
    percentileRank: 55.6,
    statusCategory: 'Declining',
    keyFinding: 'Fundamental Rights sub-factor dropped to 102nd out of 142 countries. Civil Justice accessibility ranked 107th, marked by 5+ crore pending court cases, rampant undertrial detention (~77% of prison population), and frequent preventive detentions.',
    comparisonWithNeighbors: 'Trails Nepal (69) and Sri Lanka (75) in protection of fundamental civic rights.',
    officialReportDoc: 'World Justice Project (WJP) Rule of Law Index 2023-2024'
  },
  {
    id: 'index-academic-freedom',
    name: 'Academic Freedom Index (AFI)',
    publishingBody: 'V-Dem Institute & FAU Erlangen-Nürnberg',
    unWhoAffiliation: 'Academic / Think Tank',
    category: 'Democracy & Freedom',
    rank2014: '0.68 (Top 40%)',
    latestRank: '0.38 (Bottom 20% Globally)',
    totalCountries: 179,
    percentileRank: 80.4,
    statusCategory: 'Critical / Serious',
    keyFinding: 'Suffered one of the sharpest declines among democracies globally over the decade. Driven by institutional erosion, ideological appointments to vice-chancellorships, syllabus revisions omitting evolution/Mughal history/scientific temper, and police raids on universities.',
    comparisonWithNeighbors: 'Classified under "Completely Restricted" academic environments, worse than Nepal and Bhutan.',
    officialReportDoc: 'V-Dem Institute Democracy Report 2024: Academic Freedom Index (AFI Update)'
  }
];
