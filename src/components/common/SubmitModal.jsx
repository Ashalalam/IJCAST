import React, { useState } from 'react';
import { useJournal } from '../../context/JournalContext';
import { X, Mail, Copy, Check, Send, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';

export const SubmitModal = () => {
  const { settings, isSubmitOpen, setIsSubmitOpen } = useJournal();
  const [copied, setCopied] = useState(false);
  const [openedMail, setOpenedMail] = useState(false);

  if (!isSubmitOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(settings.contact_email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenMailApp = (e) => {
    e.preventDefault();
    // Copy email to clipboard automatically as a fallback guarantee
    navigator.clipboard.writeText(settings.contact_email);
    setCopied(true);
    setOpenedMail(true);
    
    // Trigger mailto link
    window.location.href = `mailto:${settings.contact_email}?subject=Manuscript Submission - IJCAST`;
    
    setTimeout(() => {
      setCopied(false);
      setOpenedMail(false);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 relative">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-amber-500/20 rounded-xl text-amber-400 border border-amber-500/30">
              <Send className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-serif">Submit Manuscript</h3>
              <p className="text-xs text-slate-300">Official Submission Guidance & Email Portal</p>
            </div>
          </div>
          <button
            onClick={() => setIsSubmitOpen(false)}
            className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
          {/* Email Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-amber-900">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-amber-800">Official Journal Email</span>
                <p className="text-2xl font-bold text-slate-900 mt-1 font-mono select-all">{settings.contact_email}</p>
                {settings.alternate_email && (
                  <p className="text-xs text-slate-600 mt-1">
                    Secondary: <span className="font-mono font-medium">{settings.alternate_email}</span>
                  </p>
                )}
              </div>
              <button
                onClick={handleCopyEmail}
                className="flex items-center space-x-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors flex-shrink-0"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied Email!' : 'Copy Email Address'}</span>
              </button>
            </div>
          </div>

          {/* Toast / Notification when clicking mail trigger */}
          {openedMail && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold rounded-xl flex items-center space-x-2">
              <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Email address copied to clipboard ({settings.contact_email}). Opening your default email client...</span>
            </div>
          )}

          {/* Submission Notice */}
          <div className="flex items-start space-x-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-slate-700 space-y-1">
              <p className="font-semibold text-slate-900">Important Submission Notice:</p>
              <p>Authors must submit manuscripts via email as an attachment (MS Word .doc/.docx format). There is <strong>NO author login or author registration portal</strong> on this website.</p>
            </div>
          </div>

          {/* Guidelines Checklist */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center space-x-2">
              <FileText className="w-4 h-4 text-amber-600" />
              <span>Submission Requirements Checklist:</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-600">
              <div className="flex items-center space-x-2 p-2 bg-white border border-slate-100 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Title Page with Author Affiliations & ORCID</span>
              </div>
              <div className="flex items-center space-x-2 p-2 bg-white border border-slate-100 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Structured Abstract (150–250 words)</span>
              </div>
              <div className="flex items-center space-x-2 p-2 bg-white border border-slate-100 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>4 to 6 Keywords</span>
              </div>
              <div className="flex items-center space-x-2 p-2 bg-white border border-slate-100 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Single/Double-line Spaced Word Doc</span>
              </div>
            </div>
          </div>

          {/* Direct Email Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleOpenMailApp}
              className="flex-1 inline-flex items-center justify-center space-x-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl shadow-lg transition-all text-xs uppercase tracking-wider"
            >
              <Mail className="w-4 h-4" />
              <span>Open Mail App to Submit</span>
            </button>

            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(settings.contact_email)}&su=Manuscript%20Submission%20-%20IJCAST`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleCopyEmail}
              className="flex-1 inline-flex items-center justify-center space-x-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-lg transition-all text-xs uppercase tracking-wider"
            >
              <Send className="w-4 h-4 text-amber-400" />
              <span>Open in Gmail Webmail</span>
            </a>

            <button
              onClick={() => setIsSubmitOpen(false)}
              className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
