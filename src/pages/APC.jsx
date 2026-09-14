import React from 'react';
import { useJournal } from '../context/JournalContext';
import { DollarSign, CheckCircle2, ShieldCheck, RefreshCw, AlertCircle } from 'lucide-react';

export const APC = () => {
  const { pageContents } = useJournal();

  const apcContent = pageContents.find(p => p.page_key === 'apc' && p.section_key === 'charges')?.content || `### Article Processing Charge (APC)
IJCAST operates as an open-access journal. To cover typesetting, digital archiving, DOI registration, and server upkeep, a modest APC applies upon official manuscript acceptance:

- **National Authors (India)**: INR 3,500
- **International Authors**: USD 75

> **Important**: No fee is required upon initial submission or during the editorial screening & peer review phase. APC is payable strictly AFTER official acceptance.

### Waiver Policy
IJCAST provides partial or full fee waivers for researchers from low-income economies or authors with demonstrated financial hardship upon editorial review.

### Refund Policy
- If an author withdraws a manuscript **prior to formal acceptance**, no fee is charged.
- Once an APC is paid and the paper enters final typesetting/publication, refunds are not issued except in documented cases of technical duplicate payment.`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="bg-slate-900 text-white p-8 sm:p-12 rounded-3xl border border-slate-800 shadow-xl space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-full text-xs font-semibold uppercase tracking-wider">
          <DollarSign className="w-3.5 h-3.5" />
          <span>Publication Charges</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif">Article Processing Charges (APC)</h1>
        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          Transparent publication fees, post-acceptance payment schedules, fee waivers, and official refund terms.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column: Detailed Fee Breakdown */}
        <div className="md:col-span-8 bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="prose prose-slate text-sm text-slate-700 leading-relaxed whitespace-pre-wrap font-sans">
            {apcContent}
          </div>
        </div>

        {/* Right Column: Key Rules Summary Card */}
        <div className="md:col-span-4 space-y-6">
          <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl space-y-3 text-amber-950">
            <h3 className="text-base font-bold font-serif flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-amber-700" />
              <span>When is APC Payable?</span>
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              APC payment is required <strong>strictly after formal manuscript acceptance</strong> by the Editorial Board and prior to final publication.
            </p>
            <p className="text-xs text-slate-700 font-semibold">
              Zero Submission Fees. Zero Review Fees.
            </p>
          </div>

          <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold font-serif flex items-center space-x-2 text-amber-400">
              <RefreshCw className="w-5 h-5" />
              <span>APC Refund Policy Summary</span>
            </h3>
            <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 leading-relaxed">
              <li>No payment is collected before acceptance; withdrawal before acceptance carries zero charge.</li>
              <li>Post-acceptance APC payments cover immediate formatting and DOI costs, making fees non-refundable except for accidental duplicate transfers.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
