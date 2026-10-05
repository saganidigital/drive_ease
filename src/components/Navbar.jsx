import React, { useState } from 'react';
import { useScroll } from '../hooks/useScroll';
import RoyalLogo from './RoyalLogo';
import { companyInfo } from '../data/company';
import { MessageSquare, Menu, X, ChevronRight } from 'lucide-react';

export default function Navbar({ onOpenBooking }) {
  const { isScrolled } = useScroll();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // `short` is used in the desktop bar (tight space), `label` in the mobile drawer
  const navLinks = [
    { label: "Fleet Showroom", short: "Fleet", href: "#fleet" },
    { label: "VIP Services", short: "Services", href: "#services" },
    { label: "Why Royal", short: "Why Royal", href: "#experience" },
    { label: "Performance", short: "Stats", href: "#stats" },
    { label: "Reviews", short: "Reviews", href: "#testimonials" },
    { label: "Contact", short: "Contact", href: "#contact" }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-[#0a0c12]/90 backdrop-blur-xl border-b border-amber-500/20 py-3 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]' 
          : 'bg-transparent py-5 sm:py-6 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 xl:gap-8">
          
          {/* Logo */}
          <RoyalLogo size="md" />

          {/* Desktop Navigation Links (xl+ only, so labels never wrap) */}
          <nav className="hidden xl:flex flex-1 items-center justify-center gap-7 2xl:gap-9" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="whitespace-nowrap text-xs uppercase tracking-[0.14em] text-slate-300 hover:text-amber-400 font-medium transition-colors duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-amber-400 hover:after:w-full after:transition-all after:duration-300"
              >
                {link.short}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Direct WhatsApp Call */}
            <a
              href={companyInfo.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 whitespace-nowrap px-3.5 py-2.5 rounded-lg text-xs font-semibold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-all duration-300 hover:scale-105"
              aria-label="Direct WhatsApp Hotline"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp</span>
            </a>

            {/* Primary VIP Booking CTA */}
            <button
              onClick={() => onOpenBooking(null)}
              className="hidden sm:inline-flex items-center whitespace-nowrap px-4 md:px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider font-semibold text-black bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] hover:scale-105 active:scale-95"
            >
              Reserve VIP
            </button>

            {/* Menu Button (below xl) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-zinc-800/80 border border-white/10 transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0c0e17]/95 backdrop-blur-2xl border-b border-amber-500/20 px-4 sm:px-6 pt-3 pb-6 space-y-3 mt-3">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm uppercase tracking-wider text-slate-200 hover:text-amber-400 hover:bg-amber-500/10 transition-colors"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-amber-400/60" />
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-zinc-800 flex flex-col gap-2">
            <a
              href={companyInfo.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-xs font-semibold text-white bg-emerald-700/30 border border-emerald-500/40"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              Chat on WhatsApp ({companyInfo.phone})
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking(null);
              }}
              className="w-full py-3 rounded-lg text-xs font-bold uppercase tracking-widest text-black bg-gradient-to-r from-amber-400 to-yellow-500 shadow-[0_0_15px_rgba(212,175,55,0.4)]"
            >
              Book Consultation & Drive
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
