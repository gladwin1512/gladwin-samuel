import React, { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { LanguageProvider } from './i18n/LanguageContext';
import { LanguageGatewayModal } from './components/LanguageGatewayModal';
import { Header } from './components/Header';
import { HeroHeader } from './components/HeroHeader';
import { CitizenTaxAndHierarchyCalculator } from './components/CitizenTaxAndHierarchyCalculator';
import { TaxpayerLossAndWriteOffAudit } from './components/TaxpayerLossAndWriteOffAudit';
import { NationalGuaranteeAudit } from './components/NationalGuaranteeAudit';
import { StatesTerritoriesGrid } from './components/StatesTerritoriesGrid';
import { StateRepresentativeWealthAudit } from './components/StateRepresentativeWealthAudit';
import { InfrastructurePrivatizationTracker } from './components/InfrastructurePrivatizationTracker';
import { PoliticianWealthSqueeze } from './components/PoliticianWealthSqueeze';
import { CitizenSqueeze } from './components/CitizenSqueeze';
import { YouthEmploymentGap } from './components/YouthEmploymentGap';
import { PoliticianTable } from './components/PoliticianTable';
import { Footer } from './components/Footer';
import { SourcesModal } from './components/SourcesModal';
import { GlobalRankingsAndCitizenshipAudit } from './components/GlobalRankingsAndCitizenshipAudit';
import { RhetoricVsReality } from './components/RhetoricVsReality';

export default function App() {
  const [sourcesModalOpen, setSourcesModalOpen] = useState(false);

  const handleOpenSources = () => {
    setSourcesModalOpen(true);
  };

  const handleCloseSources = () => {
    setSourcesModalOpen(false);
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#0B0F14] text-slate-100 selection:bg-orange-500/30 selection:text-orange-200">
        {/* Multilingual Landing Gateway Modal (First visit or manual trigger) */}
        <LanguageGatewayModal />

        {/* Navigation Header with sticky language selector */}
        <Header onOpenSources={handleOpenSources} />

        <main>
          {/* Hero Section: 2014 to Present: Two Parallel Indias with Saffron/Green BJP Inspired Theme */}
          <HeroHeader onOpenSources={handleOpenSources} />

          {/* Module: UN, WHO Global Rankings, Passport Mobility & Indian Citizenship Exodus */}
          <GlobalRankingsAndCitizenshipAudit onOpenSources={handleOpenSources} />

          {/* Module: Rhetoric vs Reality */}
          <RhetoricVsReality />

          {/* Module: Citizen Tax & Population Hierarchy Rank Calculator */}
          <CitizenTaxAndHierarchyCalculator onOpenSources={handleOpenSources} />

          {/* Module: Taxpayer Money Lost, Bad Loan Write-Offs & Corporate Tax Concessions */}
          <TaxpayerLossAndWriteOffAudit onOpenSources={handleOpenSources} />

          {/* Module 1: Modi's National Guarantee Audit (2014, 2019, 2024 Sankalp Patra) */}
          <NationalGuaranteeAudit onOpenSources={handleOpenSources} />

          {/* Module 2: 28 States & 8 Union Territories Manifesto Audit Grid */}
          <StatesTerritoriesGrid />

          {/* Module: Delhi Lok Sabha MPs Representation vs Wealth & Service Sector Reality */}
          <StateRepresentativeWealthAudit onOpenSources={handleOpenSources} />

          {/* Module: Taxpayer-Funded Infrastructure Privatization Tracker (Airports, Ports, Tolls) */}
          <InfrastructurePrivatizationTracker onOpenSources={handleOpenSources} />

          {/* Module 3: Politician Wealth vs Common Man Metric (Integrated Squeeze Index) */}
          <PoliticianWealthSqueeze onOpenSources={handleOpenSources} />

          {/* Citizen Squeeze: Essential Prices Tracker & Interactive Inflation Tax Calculator */}
          <CitizenSqueeze onOpenSources={handleOpenSources} />

          {/* Youth Employment Gap: Promised 2 Crore Jobs vs Paper Leaks & Graduate Unemployment */}
          <YouthEmploymentGap onOpenSources={handleOpenSources} />

          {/* Politician Affidavit Table: Searchable ADR Form 26 Sworn Disclosures */}
          <PoliticianTable onOpenSources={handleOpenSources} />
        </main>

        {/* Footer with statutory citations & transparency declaration */}
        <Footer onOpenSources={handleOpenSources} />

        {/* Citations & Sources Detailed Modal */}
        <SourcesModal
          isOpen={sourcesModalOpen}
          onClose={handleCloseSources}
        />

        {/* Vercel Web Analytics */}
        <Analytics />
      </div>
    </LanguageProvider>
  );
}

