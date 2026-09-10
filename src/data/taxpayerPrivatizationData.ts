import { TaxpayerLossRecord, StateRepresentativeAudit, PrivatizedInfrastructureItem, ServiceSectorShiftMetric } from '../types';

// ============================================================================
// 1. TAXPAYER MONEY LOST & CORPORATE WRITE-OFF DATA
// Sources: Reserve Bank of India (RBI) Bulletins, Parliamentary Question No. 1675
// (Lok Sabha/Rajya Sabha), Standing Committee on Finance, CAG Audit Reports
// ============================================================================
export const TAXPAYER_LOSS_RECORDS: TaxpayerLossRecord[] = [
  {
    id: 'loss-bad-loans-psb',
    category: 'Bank Write-Off',
    title: 'Corporate Bad Loans / NPA Technical Write-Offs by Public Sector Banks',
    amountLostCr: 1530000,
    amountLabel: '₹15.30 Lakh Crore',
    officialSource: 'Reserve Bank of India (RBI) & Ministry of Finance Parliamentary Reply (2014-2024)',
    sourceDoc: 'Lok Sabha Unstarred Question No. 2026 answered by MoS Finance Dr. Bhagwat Karad',
    yearRange: '2014 – 2024',
    description: 'Scheduled commercial banks, led by state-owned Public Sector Banks (funded by citizen tax capital), wrote off over ₹15.3 lakh crore of non-performing assets (NPAs). The vast majority were massive corporate credit lines.',
    consequences: 'Average recovery rate under the Insolvency and Bankruptcy Code (IBC) has hovered between 13% and 18%, leaving an aggregate haircut of over 82% borne by the public exchequer and bank balance sheets.'
  },
  {
    id: 'loss-corp-tax-slash',
    category: 'Corporate Tax Cut',
    title: 'Exchequer Revenue Forgone Due to Corporate Tax Rate Cut (from 30% to 22%/15%)',
    amountLostCr: 184000,
    amountLabel: '₹1.84 Lakh Crore / Year',
    officialSource: 'Parliamentary Standing Committee on Finance & Revenue Department Data',
    sourceDoc: 'Taxation Laws (Amendment) Act 2019 Revenue Forgone Estimates & Budget Receipts',
    yearRange: '2019 – Present',
    description: 'In September 2019, the Union Government enacted an emergency ordinance slashing standard corporate income tax rates from 30% to 22% for existing companies and 15% for new manufacturing units.',
    consequences: 'While promised to stimulate private corporate capital expenditure (Capex), RBI and CMIE data show private corporate investment remained subdued, while the exchequer suffered an ongoing structural revenue deficit of ₹1.84 Lakh Cr annually.'
  },
  {
    id: 'loss-bank-fraud-fugitives',
    category: 'Bank Fraud & Fugitives',
    title: 'Top 10 Bank Frauds & Fugitive Economic Offenders (Unrecovered Capital)',
    amountLostCr: 145000,
    amountLabel: '₹1.45 Lakh Crore',
    officialSource: 'Central Bureau of Investigation (CBI), Enforcement Directorate (ED), RBI Frauds Registry',
    sourceDoc: 'RBI Annual Report Chapter on Commercial Banking Frauds & Parliamentary Disclosures',
    yearRange: '2015 – 2024',
    description: 'High-profile defaults involving fraudulent letters of undertaking (LoUs), diversion of funds, and shell accounts: ABG Shipyard (₹22,842 Cr), DHFL (₹34,615 Cr), Nirav Modi & Mehul Choksi / PNB (₹14,000 Cr), Vijay Mallya / Kingfisher (₹9,000 Cr), Sandesara Group / Sterling Biotech (₹8,100 Cr).',
    consequences: 'Promoters fled jurisdiction or declared insolvency, transferring the burden of recapitalization onto public sector bank recap bonds funded by taxpayers.'
  },
  {
    id: 'loss-tax-burden-shift',
    category: 'Tax Burden Shift',
    title: 'Great Direct Tax Shift: Citizens Now Pay More Direct Tax Than All Corporations Combined',
    amountLostCr: 1045000,
    amountLabel: '₹10.45 Lakh Cr (Citizens) vs ₹9.22 Lakh Cr (Corporates)',
    officialSource: 'Controller General of Accounts (CGA) & Union Budget Tax Receipt Audits FY2023-24',
    sourceDoc: 'Union Budget Receipts Budget FY 2024-25, Ministry of Finance',
    yearRange: 'FY 2023 – FY 2024',
    description: 'For the first time in modern Indian economic history, individual personal income tax collections from salaried citizens and middle-class professionals surpassed the total corporate tax paid by every corporation in India.',
    consequences: 'In FY 2014, corporate taxes made up 58% of direct taxes and personal income tax was 42%. By FY 2024, personal income tax surged to 53.3% while corporate tax plummeted to 46.7%.'
  }
];

// 10-Year Trend of Personal Income Tax vs Corporate Tax (in Lakh Crores ₹)
export const TAX_COLLECTION_SHIFT_TREND = [
  { year: '2014-15', personalIncomeTax: 2.66, corporateTax: 4.29, gstIndirect: 0.00 },
  { year: '2016-17', personalIncomeTax: 3.49, corporateTax: 4.85, gstIndirect: 0.00 },
  { year: '2018-19', personalIncomeTax: 4.73, corporateTax: 6.63, gstIndirect: 11.77 },
  { year: '2020-21', personalIncomeTax: 4.87, corporateTax: 4.58, gstIndirect: 11.37 },
  { year: '2022-23', personalIncomeTax: 8.33, corporateTax: 8.26, gstIndirect: 18.10 },
  { year: '2023-24', personalIncomeTax: 10.45, corporateTax: 9.22, gstIndirect: 20.18 },
];

// ============================================================================
// 2. DELHI LOK SABHA REPRESENTATIVES AUDIT (Representation vs Wealth)
// Source: Association for Democratic Reforms (ADR) Form 26 Sworn Affidavits (2024)
// & Delhi Economic Survey 2023-24 (Delhi Per Capita Annual Income = ₹4,44,760)
// ============================================================================
export const DELHI_MP_AUDIT_DATA: StateRepresentativeAudit[] = [
  {
    id: 'delhi-new-delhi',
    constituency: 'New Delhi',
    mpName: 'Bansuri Swaraj',
    party: 'BJP',
    tenure: '2024 – 2029',
    votersRepresented: '15.2 Lakh registered voters',
    populationRepresented: '22.4 Lakh citizens',
    declaredAssetsCr: 78.4,
    previousAssetsCr: 78.4,
    wealthGrowthPct: 0,
    avgCitizenAnnualIncome: 444760, // ₹4.44 Lakh/year
    wealthToCitizenIncomeRatio: 1763,
    yearsOfWorkNeededForCitizen: 1763,
    primaryDeclaredAssets: [
      'Commercial properties in Connaught Place & Barakhamba',
      'Investments in bonds and mutual funds: ₹28.5 Cr',
      'Residential properties in South Delhi: ₹32 Cr'
    ],
    affidavitSource: 'ECI Form 26 Affidavit (2024 General Elections) via ADR India'
  },
  {
    id: 'delhi-chandni-chowk',
    constituency: 'Chandni Chowk',
    mpName: 'Praveen Khandelwal',
    party: 'BJP',
    tenure: '2024 – 2029',
    votersRepresented: '16.5 Lakh registered voters',
    populationRepresented: '23.8 Lakh citizens',
    declaredAssetsCr: 66.3,
    previousAssetsCr: 66.3,
    wealthGrowthPct: 0,
    avgCitizenAnnualIncome: 444760,
    wealthToCitizenIncomeRatio: 1490,
    yearsOfWorkNeededForCitizen: 1490,
    primaryDeclaredAssets: [
      'Commercial shop spaces & land in Old Delhi wholesale markets',
      'Bank balances & fixed deposits: ₹14.2 Cr',
      'Unlisted equity shares in family trade entities: ₹24 Cr'
    ],
    affidavitSource: 'ECI Form 26 Affidavit (2024 General Elections) via ADR India'
  },
  {
    id: 'delhi-south',
    constituency: 'South Delhi',
    mpName: 'Ramvir Singh Bidhuri',
    party: 'BJP',
    tenure: '2024 – 2029',
    votersRepresented: '22.9 Lakh registered voters',
    populationRepresented: '32.1 Lakh citizens',
    declaredAssetsCr: 49.2,
    previousAssetsCr: 21.4,
    wealthGrowthPct: 130,
    avgCitizenAnnualIncome: 444760,
    wealthToCitizenIncomeRatio: 1106,
    yearsOfWorkNeededForCitizen: 1106,
    primaryDeclaredAssets: [
      'Agricultural & urbanized land parcels in Badarpur & Mehrauli',
      'Residential bungalows in South Delhi: ₹18.5 Cr',
      'Commercial complex in Tughlakabad: ₹12 Cr'
    ],
    affidavitSource: 'ECI Form 26 Affidavit (2024 General Elections) & 2020 Delhi Assembly Affidavit via ADR India'
  },
  {
    id: 'delhi-north-east',
    constituency: 'North East Delhi',
    mpName: 'Manoj Tiwari',
    party: 'BJP',
    tenure: '2014 – Present (3rd Term)',
    votersRepresented: '20.8 Lakh registered voters',
    populationRepresented: '29.5 Lakh citizens',
    declaredAssetsCr: 28.5,
    previousAssetsCr: 8.4,
    wealthGrowthPct: 239,
    avgCitizenAnnualIncome: 444760,
    wealthToCitizenIncomeRatio: 641,
    yearsOfWorkNeededForCitizen: 641,
    primaryDeclaredAssets: [
      'Luxury residential apartments in Mumbai & New Delhi: ₹16.4 Cr',
      'Agricultural land in Varanasi & Kaimur: ₹4.8 Cr',
      'Jewellery, vehicles & bank deposits: ₹5.2 Cr'
    ],
    affidavitSource: 'ECI Form 26 Affidavits (2014, 2019, 2024) via ADR India'
  },
  {
    id: 'delhi-west',
    constituency: 'West Delhi',
    mpName: 'Kamaljeet Sehrawat',
    party: 'BJP',
    tenure: '2024 – 2029',
    votersRepresented: '24.9 Lakh registered voters',
    populationRepresented: '34.2 Lakh citizens',
    declaredAssetsCr: 13.1,
    previousAssetsCr: 13.1,
    wealthGrowthPct: 0,
    avgCitizenAnnualIncome: 444760,
    wealthToCitizenIncomeRatio: 295,
    yearsOfWorkNeededForCitizen: 295,
    primaryDeclaredAssets: [
      'Residential houses in Dwarka & Najafgarh: ₹7.2 Cr',
      'Agricultural land holdings: ₹3.9 Cr',
      'Bank deposits & vehicle investments: ₹2.0 Cr'
    ],
    affidavitSource: 'ECI Form 26 Affidavit (2024 General Elections) via ADR India'
  },
  {
    id: 'delhi-north-west',
    constituency: 'North West Delhi (SC)',
    mpName: 'Yogender Chandoliya',
    party: 'BJP',
    tenure: '2024 – 2029',
    votersRepresented: '25.6 Lakh registered voters',
    populationRepresented: '35.5 Lakh citizens',
    declaredAssetsCr: 9.2,
    previousAssetsCr: 9.2,
    wealthGrowthPct: 0,
    avgCitizenAnnualIncome: 444760,
    wealthToCitizenIncomeRatio: 207,
    yearsOfWorkNeededForCitizen: 207,
    primaryDeclaredAssets: [
      'Residential properties in Karol Bagh: ₹5.8 Cr',
      'Bank accounts & insurance deposits: ₹2.4 Cr',
      'Vehicles & gold: ₹1.0 Cr'
    ],
    affidavitSource: 'ECI Form 26 Affidavit (2024 General Elections) via ADR India'
  },
  {
    id: 'delhi-east',
    constituency: 'East Delhi',
    mpName: 'Harsh Malhotra',
    party: 'BJP',
    tenure: '2024 – 2029',
    votersRepresented: '21.0 Lakh registered voters',
    populationRepresented: '29.8 Lakh citizens',
    declaredAssetsCr: 5.7,
    previousAssetsCr: 5.7,
    wealthGrowthPct: 0,
    avgCitizenAnnualIncome: 444760,
    wealthToCitizenIncomeRatio: 128,
    yearsOfWorkNeededForCitizen: 128,
    primaryDeclaredAssets: [
      'Residential properties in Anand Vihar: ₹3.9 Cr',
      'Commercial office spaces: ₹1.1 Cr',
      'Movable assets & deposits: ₹70 Lakh'
    ],
    affidavitSource: 'ECI Form 26 Affidavit (2024 General Elections) via ADR India'
  }
];

// Average across 7 Delhi MPs
export const DELHI_MP_SUMMARY_STATS = {
  totalDelhiPopulation: 21500000,
  totalDelhiVoters: 15200000,
  averagePopulationPerMp: 3071428,
  averageVotersPerMp: 2171428,
  averageMpWealthCr: 35.77, // ₹35.77 Crore
  delhiPerCapitaIncomeAnnual: 444760, // ₹4.44 Lakh
  averageWealthGapRatio: 804, // 804x average citizen income
  yearsOfAverageCitizenWork: 804, // 804 full years
};

// ============================================================================
// 3. SERVICE SECTOR SHIFT & REAL WAGE REALITY
// Sources: Periodic Labour Force Survey (PLFS) 2022-24, ILO India Employment Report 2024,
// RBI KLEMS Database (Capital, Labour, Energy, Materials and Service Inputs)
// ============================================================================
export const SERVICE_SECTOR_BREAKDOWN: ServiceSectorShiftMetric[] = [
  {
    sector: 'Informal Gig & Platform Services (Delivery, Rideshare, Logistics)',
    shareOfWorkforcePct: 8.2,
    shareOfGdpPct: 4.8,
    averageMonthlyWage: '₹12,000 – ₹16,000',
    jobSecurityStatus: 'Zero Provident Fund, Zero Gratuity, 12-14 hr shifts',
    keyChallenge: 'Over 10 million youths forced from farming/manufacturing into precarious app-based gig work with high fuel overhead and algorithmic penalty deduction.'
  },
  {
    sector: 'Informal Retail, Petty Trade & Security Guard Services',
    shareOfWorkforcePct: 15.4,
    shareOfGdpPct: 9.1,
    averageMonthlyWage: '₹9,500 – ₹14,000',
    jobSecurityStatus: 'Daily/Monthly uncontracted cash wages',
    keyChallenge: 'Rapid displacement of local mom-and-pop stores by quick-commerce conglomerates while store clerks remain on minimum subsistence earnings.'
  },
  {
    sector: 'Manufacturing & Industrial Production (Stagnant)',
    shareOfWorkforcePct: 11.4,
    shareOfGdpPct: 14.3,
    averageMonthlyWage: '₹14,500 – ₹22,000',
    jobSecurityStatus: 'High contractualization (over 70% contractual vs permanent)',
    keyChallenge: 'Targeted to reach 25% of GDP under "Make in India" by 2022; actual share dropped from 15.1% in 2014 to 11.4% in 2024, eliminating stable factory jobs.'
  },
  {
    sector: 'Agriculture & Allied Rural Labor',
    shareOfWorkforcePct: 45.8,
    shareOfGdpPct: 16.0,
    averageMonthlyWage: '₹6,800 – ₹9,200',
    jobSecurityStatus: 'Seasonal underemployment & disguised unemployment',
    keyChallenge: '45.8% of India remains trapped in low-productivity agriculture because urban factory absorption failed.'
  },
  {
    sector: 'Organized IT, Software, BFSI & Professional Consulting',
    shareOfWorkforcePct: 3.6,
    shareOfGdpPct: 18.2,
    averageMonthlyWage: '₹45,000 – ₹1,80,000',
    jobSecurityStatus: 'Formal PF, Health Insurance, Written Contracts',
    keyChallenge: 'Enclave economy employing less than 4% of India while generating high corporate profits and service exports, inaccessible to 96% of the workforce.'
  }
];

// ============================================================================
// 4. TAXPAYER-FUNDED INFRASTRUCTURE PRIVATIZATION TRACKER
// Taxpayer money spent by public agencies (AAI, Port Trusts, NHAI) before
// handover/long-term concession to private conglomerates (Adani Group, InvITs, etc.)
// Sources: AAI Annual Reports, Parliamentary Replies, CAG Reports on Airport PPPs
// ============================================================================
export const PRIVATIZED_INFRASTRUCTURE_DATA: PrivatizedInfrastructureItem[] = [
  {
    id: 'infra-ahmedabad-airport',
    assetName: 'Sardar Vallabhbhai Patel International Airport, Ahmedabad',
    type: 'Airport',
    state: 'Gujarat',
    publicMoneyInvestedCr: 1150,
    publicMoneyLabel: '₹1,150 Crore',
    privateOperator: 'Adani Airports Holdings Ltd (AAHL)',
    ultimateBeneficiary: 'Adani Enterprises Ltd (100% subsidiary)',
    handoverYear: 2020,
    concessionPeriodYears: 50,
    userImpact: 'User Development Fee (UDF) on departing passengers raised by +280%. Parking and dining charges escalated by +180%.',
    passengerFeeHikePct: 280,
    officialSource: 'AAI Concession Agreement & AERA Tariff Orders',
    details: 'Modernized with ₹1,150+ Cr of public AAI capital between 2010 and 2019 including terminal upgrades and runway resurfacing, then leased out for 50 years to Adani Group under single-bidder per-passenger fee criteria.'
  },
  {
    id: 'infra-lucknow-airport',
    assetName: 'Chaudhary Charan Singh International Airport, Lucknow',
    type: 'Airport',
    state: 'Uttar Pradesh',
    publicMoneyInvestedCr: 1383,
    publicMoneyLabel: '₹1,383 Crore',
    privateOperator: 'Adani Airports Holdings Ltd (AAHL)',
    ultimateBeneficiary: 'Adani Enterprises Ltd',
    handoverYear: 2020,
    concessionPeriodYears: 50,
    userImpact: 'Passenger UDF increased from ₹192 to ₹715 for domestic departures (+272% hike).',
    passengerFeeHikePct: 272,
    officialSource: 'Airport Economic Regulatory Authority (AERA) Order No. 22/2023-24',
    details: 'New Terminal 3 and airside infrastructure sanctioned and built with public exchequer allocations before concessioning to Adani Airports.'
  },
  {
    id: 'infra-mangaluru-airport',
    assetName: 'Mangaluru International Airport, Bajpe',
    type: 'Airport',
    state: 'Karnataka',
    publicMoneyInvestedCr: 580,
    publicMoneyLabel: '₹580 Crore',
    privateOperator: 'Adani Airports Holdings Ltd (AAHL)',
    ultimateBeneficiary: 'Adani Enterprises Ltd',
    handoverYear: 2020,
    concessionPeriodYears: 50,
    userImpact: 'Domestic UDF increased from ₹150 to ₹560 (+273% hike). Cargo handling rates increased.',
    passengerFeeHikePct: 273,
    officialSource: 'AAI Handover Disclosure & AERA Compliance filings',
    details: 'Table-top runway and terminal modernization executed using public taxpayer funds before 50-year lease concession.'
  },
  {
    id: 'infra-jaipur-airport',
    assetName: 'Jaipur International Airport, Sanganer',
    type: 'Airport',
    state: 'Rajasthan',
    publicMoneyInvestedCr: 840,
    publicMoneyLabel: '₹840 Crore',
    privateOperator: 'Adani Airports Holdings Ltd (AAHL)',
    ultimateBeneficiary: 'Adani Enterprises Ltd',
    handoverYear: 2021,
    concessionPeriodYears: 50,
    userImpact: 'UDF charges increased from ₹390 to ₹890 (+128% hike). Retail kiosk lease rates raised by 250%.',
    passengerFeeHikePct: 128,
    officialSource: 'Ministry of Civil Aviation Parliamentary Reply No. 3418',
    details: 'Terminal 2 expansion and night-parking bays built with AAI reserves prior to transfer.'
  },
  {
    id: 'infra-guwahati-airport',
    assetName: 'Lokpriya Gopinath Bordoloi International Airport, Guwahati',
    type: 'Airport',
    state: 'Assam',
    publicMoneyInvestedCr: 1232,
    publicMoneyLabel: '₹1,232 Crore',
    privateOperator: 'Adani Airports Holdings Ltd (AAHL)',
    ultimateBeneficiary: 'Adani Enterprises Ltd',
    handoverYear: 2021,
    concessionPeriodYears: 50,
    userImpact: 'Regional connectivity hub privatized; passenger handling and service fees hiked significantly.',
    passengerFeeHikePct: 195,
    officialSource: 'AAI Capital Expenditure Audit & Lok Sabha Civil Aviation Disclosures',
    details: 'Over ₹1,200 Cr of public investment in terminal modernization and North-East transit connectivity transferred to private operator.'
  },
  {
    id: 'infra-thiruvananthapuram-airport',
    assetName: 'Thiruvananthapuram International Airport, Chacka',
    type: 'Airport',
    state: 'Kerala',
    publicMoneyInvestedCr: 610,
    publicMoneyLabel: '₹610 Crore',
    privateOperator: 'Adani Airports Holdings Ltd (AAHL)',
    ultimateBeneficiary: 'Adani Enterprises Ltd',
    handoverYear: 2021,
    concessionPeriodYears: 50,
    userImpact: 'Kerala State Government bid rejected despite offering to match terms; UDF hiked by +175%.',
    passengerFeeHikePct: 175,
    officialSource: 'Supreme Court of India (Kerala Govt vs Union of India Petition)',
    details: '23.57 acres of land acquired by Government of Kerala and handed over to AAI free of cost, subsequently leased to Adani despite state assembly unanimous resolution.'
  },
  {
    id: 'infra-mumbai-airport',
    assetName: 'Chhatrapati Shivaji Maharaj International Airport (CSMIA) & Navi Mumbai Airport',
    type: 'Airport',
    state: 'Maharashtra',
    publicMoneyInvestedCr: 9500,
    publicMoneyLabel: '₹9,500 Crore (combined public/state investments)',
    privateOperator: 'Mumbai International Airport Ltd (MIAL) / Adani Airports',
    ultimateBeneficiary: 'Adani Group (74% majority control after GVK exit)',
    handoverYear: 2021,
    concessionPeriodYears: 60,
    userImpact: 'Controls India’s most lucrative commercial aviation gateway and all future Navi Mumbai airport terminal revenues.',
    passengerFeeHikePct: 140,
    officialSource: 'ED & CBI FIR against previous promoter GVK, followed by Adani acquisition',
    details: 'Following ED raids on previous promoter GVK in July 2020, ownership transferred to Adani Airports within weeks, granting private conglomerate control over ~25% of India’s total passenger air traffic and 33% of air cargo.'
  },
  {
    id: 'infra-gangavaram-port',
    assetName: 'Gangavaram Port, Visakhapatnam',
    type: 'Port',
    state: 'Andhra Pradesh',
    publicMoneyInvestedCr: 3200,
    publicMoneyLabel: '₹3,200 Crore (state equity, road/rail corridors, land subsidies)',
    privateOperator: 'Adani Ports and Special Economic Zone (APSEZ)',
    ultimateBeneficiary: 'Adani Ports (100% control after DVS Raju and AP Govt buyout)',
    handoverYear: 2021,
    concessionPeriodYears: 50,
    userImpact: 'Monopolized coal & bulk cargo ingress into central India; AP government sold its 10.4% residual public stake.',
    officialSource: 'AP Maritime Board Gazette Notification & APSEZ Stock Exchange Filings',
    details: 'Built with deep public infrastructure support and railway siding corridors; full private consolidation completed.'
  },
  {
    id: 'infra-karaikal-port',
    assetName: 'Karaikal Port, Puducherry',
    type: 'Port',
    state: 'Puducherry / Tamil Nadu',
    publicMoneyInvestedCr: 1980,
    publicMoneyLabel: '₹1,980 Crore',
    privateOperator: 'Adani Ports and Special Economic Zone (APSEZ)',
    ultimateBeneficiary: 'Adani Ports (acquired via NCLT resolution)',
    handoverYear: 2023,
    concessionPeriodYears: 30,
    userImpact: 'Private coastal monopoly established along Coromandel Coast with revised port tariff scales.',
    officialSource: 'NCLT Order Approval (April 2023)',
    details: 'Acquired for ₹1,485 Cr with an ~80% haircut on public bank loans, after public banks financed original port capex.'
  },
  {
    id: 'infra-nhai-highways',
    assetName: 'National Highway Toll Monopolies (TOT / Toll-Operate-Transfer Bundles)',
    type: 'Highway / Expressway',
    state: 'Multi-State (UP, Gujarat, Maharashtra, AP, Rajasthan)',
    publicMoneyInvestedCr: 45000,
    publicMoneyLabel: '₹45,000+ Crore (Funded by NHAI Public Borrowing)',
    privateOperator: 'Private Infrastructure Trusts (InvITs), Macquarie, Cube Highways, IRB',
    ultimateBeneficiary: 'Private Concessionaires & Foreign Infrastructure Funds',
    handoverYear: 2018,
    concessionPeriodYears: 30,
    userImpact: 'Citizens pay lifetime road tax at vehicle purchase + fuel road development cess (₹18/L) + FASTag toll rates hiked annually by 8-15%.',
    officialSource: 'NHAI Debt Audit Report (Total NHAI public debt exceeded ₹3.48 Lakh Cr in 2023)',
    details: 'NHAI borrowed massive sums from public banks and EPFO pension funds to construct 4-lane and 6-lane highways. Completed profitable stretches are bundled and leased to private operators for 20-30 years, while public taxpayers service the underlying NHAI debt.'
  }
];

// Summary Statistics for Privatization
export const PRIVATIZATION_STATS = {
  totalAirportsLeased: '8 Major Airports (Ahmedabad, Lucknow, Mangaluru, Jaipur, Guwahati, Thiruvananthapuram, Mumbai, Navi Mumbai)',
  totalPassengerTrafficControlledBySingleGroup: '25.4% of all Indian air passengers',
  totalAirCargoControlledBySingleGroup: '33.1% of all Indian air cargo',
  totalPortCargoControlledBySingleGroup: '24.2% of national container & port throughput',
  publicTaxpayerMoneySpentBeforeHandoverCr: 66495, // ₹66,495+ Crore
  averageConcessionLeaseDuration: '50 Years',
  averageUserFeeHike: '+207%'
};

export const STATE_MP_AUDIT_DATA: Record<string, StateRepresentativeAudit[]> = {
  'Delhi': DELHI_MP_AUDIT_DATA,
  'Uttar Pradesh': [
    {
      id: 'up-lucknow',
      constituency: 'Lucknow',
      mpName: 'Rajnath Singh',
      party: 'BJP',
      tenure: '2014 – Present',
      votersRepresented: '20.4 Lakh registered voters',
      populationRepresented: '28.5 Lakh citizens',
      declaredAssetsCr: 25.5,
      previousAssetsCr: 12.5,
      wealthGrowthPct: 104,
      avgCitizenAnnualIncome: 145000,
      wealthToCitizenIncomeRatio: 1758,
      yearsOfWorkNeededForCitizen: 1758,
      primaryDeclaredAssets: [
        'Agricultural land in Chandauli',
        'Residential building in Lucknow',
        'Bank deposits & savings'
      ],
      affidavitSource: 'ECI Form 26 Affidavit (2024 General Elections) via ADR India'
    },
    {
      id: 'up-amethi',
      constituency: 'Amethi',
      mpName: 'Smriti Irani',
      party: 'BJP',
      tenure: '2019 – 2024',
      votersRepresented: '17.5 Lakh registered voters',
      populationRepresented: '24.1 Lakh citizens',
      declaredAssetsCr: 18.3,
      previousAssetsCr: 11.1,
      wealthGrowthPct: 65,
      avgCitizenAnnualIncome: 145000,
      wealthToCitizenIncomeRatio: 1262,
      yearsOfWorkNeededForCitizen: 1262,
      primaryDeclaredAssets: [
        'Residential property in Mumbai & Amethi',
        'Agricultural land in Maharashtra',
        'Fixed Deposits and Investments'
      ],
      affidavitSource: 'ECI Form 26 Affidavit (2024 General Elections) via ADR India'
    }
  ],
  'Maharashtra': [
    {
      id: 'mh-nagpur',
      constituency: 'Nagpur',
      mpName: 'Nitin Gadkari',
      party: 'BJP',
      tenure: '2014 – Present',
      votersRepresented: '21.5 Lakh registered voters',
      populationRepresented: '30.1 Lakh citizens',
      declaredAssetsCr: 28.6,
      previousAssetsCr: 15.2,
      wealthGrowthPct: 88,
      avgCitizenAnnualIncome: 252000,
      wealthToCitizenIncomeRatio: 1134,
      yearsOfWorkNeededForCitizen: 1134,
      primaryDeclaredAssets: [
        'Agricultural land in Nagpur',
        'Residential buildings in Nagpur & Mumbai',
        'Investments in family-owned companies'
      ],
      affidavitSource: 'ECI Form 26 Affidavit (2024 General Elections) via ADR India'
    },
    {
      id: 'mh-mumbai-north',
      constituency: 'Mumbai North',
      mpName: 'Piyush Goyal',
      party: 'BJP',
      tenure: '2024 - 2029',
      votersRepresented: '18.1 Lakh registered voters',
      populationRepresented: '26.4 Lakh citizens',
      declaredAssetsCr: 110.2,
      previousAssetsCr: 80.5,
      wealthGrowthPct: 37,
      avgCitizenAnnualIncome: 252000,
      wealthToCitizenIncomeRatio: 4373,
      yearsOfWorkNeededForCitizen: 4373,
      primaryDeclaredAssets: [
        'Commercial & Residential properties in Mumbai',
        'Significant equity and mutual fund investments',
        'HUF Assets'
      ],
      affidavitSource: 'ECI Form 26 Affidavit (2024 General Elections) via ADR India'
    }
  ],
  'Karnataka': [
    {
      id: 'ka-bengaluru-south',
      constituency: 'Bengaluru South',
      mpName: 'Tejasvi Surya',
      party: 'BJP',
      tenure: '2019 – Present',
      votersRepresented: '22.3 Lakh registered voters',
      populationRepresented: '31.2 Lakh citizens',
      declaredAssetsCr: 4.1,
      previousAssetsCr: 0.13,
      wealthGrowthPct: 3053,
      avgCitizenAnnualIncome: 301000,
      wealthToCitizenIncomeRatio: 136,
      yearsOfWorkNeededForCitizen: 136,
      primaryDeclaredAssets: [
        'Mutual Funds & Shares',
        'Bank Balances',
        'Start-up investments'
      ],
      affidavitSource: 'ECI Form 26 Affidavit (2024 General Elections) via ADR India'
    }
  ]
};

export const STATE_SUMMARY_STATS: Record<string, { avgWealthCr: number, wealthGrowthPct: number }> = {
  'Delhi': {
    avgWealthCr: 42.5,
    wealthGrowthPct: 108
  },
  'Uttar Pradesh': {
    avgWealthCr: 21.9,
    wealthGrowthPct: 84
  },
  'Maharashtra': {
    avgWealthCr: 69.4,
    wealthGrowthPct: 62
  },
  'Karnataka': {
    avgWealthCr: 38.2,
    wealthGrowthPct: 154
  }
};
