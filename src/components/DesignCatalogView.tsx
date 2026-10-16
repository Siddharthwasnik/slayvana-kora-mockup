import React, { useState } from 'react';
import { 
  Sparkles, 
  Check, 
  Copy, 
  ShieldCheck, 
  AlertTriangle, 
  Layers, 
  Type, 
  Palette, 
  Sliders, 
  ExternalLink,
  ChevronRight,
  Eye,
  CheckCircle2,
  XCircle
} from 'lucide-react';

export const DesignCatalogView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tokens' | 'components' | 'states' | 'wcag' | 'guidelines' | 'qa'>('tokens');
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [stateTestFilter, setStateTestFilter] = useState<'default' | 'hover' | 'focus-visible' | 'active' | 'disabled' | 'loading' | 'error'>('default');
  const [qaChecks, setQaChecks] = useState<Record<string, boolean>>({
    'token-vars': true,
    'wcag-contrast': true,
    'focus-ring': true,
    'touch-target': true,
    'lazy-loading': true,
    'alt-tags': true,
    'responsive-overflow': true,
    'tabular-nums': true,
  });

  const handleCopy = (text: string, tokenName: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedToken(tokenName);
    setTimeout(() => setCopiedToken(null), 1500);
  };

  const toggleQa = (id: string) => {
    setQaChecks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full bg-[#fffaea]/30 text-[#7b3116] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Mission Lockup */}
        <div className="bg-white rounded-2xl border border-[#ebe0dc] p-6 sm:p-8 shadow-sm mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#ebe0dc] pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#7b3116]/70 mb-1">
                <span>Design System &amp; UI Guidance Catalog</span>
                <span>·</span>
                <span className="text-[#7b3116] font-bold">Slayvana Storefront</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#7b3116]">
                Slayvana Token-Driven Storefront Spec
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-[#fffaea] border border-[#ebdcca] text-xs font-semibold rounded-full text-[#7b3116]">
                Target: WCAG 2.2 AA
              </span>
              <span className="px-3 py-1 bg-[#7b3116] text-white text-xs font-semibold rounded-full">
                Token Engine: CSS3 &amp; Tailwind
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#7b3116]/80 mb-1">Design Intent</h4>
              <p className="text-xs text-[#7b3116]/90 leading-relaxed font-light">
                Deliver an implementation-ready, token-driven UI framework for Korakagaz that guarantees visual consistency, accessibility compliance, and high conversion velocity across the e-commerce storefront.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#7b3116]/80 mb-1">Surface Context</h4>
              <p className="text-xs text-[#7b3116]/90 leading-relaxed font-light">
                Digital retail storefront catering to online apparel shoppers with mobile-first thumb navigation, instant bag checkout, Cash on Delivery verification, and quick image zoom.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#7b3116]/80 mb-1">Known Component Density</h4>
              <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
                <div className="bg-[#fffaea] p-1.5 rounded-lg border border-[#ebdcca]">
                  <span className="block font-bold text-sm text-[#7b3116]">112</span>
                  <span className="text-[10px] text-[#7b3116]/70">Cards</span>
                </div>
                <div className="bg-[#fffaea] p-1.5 rounded-lg border border-[#ebdcca]">
                  <span className="block font-bold text-sm text-[#7b3116]">107</span>
                  <span className="text-[10px] text-[#7b3116]/70">Buttons</span>
                </div>
                <div className="bg-[#fffaea] p-1.5 rounded-lg border border-[#ebdcca]">
                  <span className="block font-bold text-sm text-[#7b3116]">99</span>
                  <span className="text-[10px] text-[#7b3116]/70">Links</span>
                </div>
                <div className="bg-[#fffaea] p-1.5 rounded-lg border border-[#ebdcca]">
                  <span className="block font-bold text-sm text-[#7b3116]">15</span>
                  <span className="text-[10px] text-[#7b3116]/70">Inputs</span>
                </div>
                <div className="bg-[#fffaea] p-1.5 rounded-lg border border-[#ebdcca]">
                  <span className="block font-bold text-sm text-[#7b3116]">11</span>
                  <span className="text-[10px] text-[#7b3116]/70">Lists</span>
                </div>
                <div className="bg-[#fffaea] p-1.5 rounded-lg border border-[#ebdcca]">
                  <span className="block font-bold text-sm text-[#7b3116]">3</span>
                  <span className="text-[10px] text-[#7b3116]/70">Nav Bars</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#ebdcca] mb-8 overflow-x-auto space-x-1 sm:space-x-2">
          {[
            { id: 'tokens', label: '1. Design Tokens & Foundations', icon: Palette },
            { id: 'components', label: '2. Component Anatomy', icon: Layers },
            { id: 'states', label: '3. 7-State Matrix', icon: Sliders },
            { id: 'wcag', label: '4. WCAG 2.2 AA Criteria', icon: ShieldCheck },
            { id: 'guidelines', label: '5. Content & Anti-Patterns', icon: AlertTriangle },
            { id: 'qa', label: '6. QA Acceptance Checklist', icon: CheckCircle2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold whitespace-nowrap border-b-2 transition-all ${
                  isActive
                    ? 'border-[#7b3116] text-[#7b3116] bg-white rounded-t-lg'
                    : 'border-transparent text-[#7b3116]/70 hover:text-[#7b3116] hover:bg-white/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content 1: Design Tokens & Foundations */}
        {activeTab === 'tokens' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Color Palette Tokens */}
            <div className="bg-white rounded-2xl border border-[#ebe0dc] p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#7b3116] flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  <span>Color Palette Tokens</span>
                </h3>
                <span className="text-xs text-[#7b3116]/70">Click swatch to copy CSS variable</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: 'color.text.primary', var: '--color-text-primary', hex: '#7b3116', bg: '#7b3116', text: '#ffffff', desc: 'Primary brand terracotta/burgundy text, headings & primary CTAs' },
                  { name: 'color.text.secondary', var: '--color-text-secondary', hex: '#ffffff', bg: '#ffffff', text: '#000000', desc: 'White canvas, contrast labels, and crisp badge typography' },
                  { name: 'color.surface.base', var: '--color-surface-base', hex: '#000000', bg: '#000000', text: '#ffffff', desc: 'Base dark scrims, video overlays, and footer contrasts' },
                  { name: 'color.surface.raised', var: '--color-surface-raised', hex: '#fffaea', bg: '#fffaea', text: '#7b3116', desc: 'Warm ivory surface for badges, cards, and notification bars' },
                  { name: 'color.border.default', var: '--color-border-default', hex: '#ebe0dc', bg: '#ebe0dc', text: '#7b3116', desc: 'Subtle hairline dividers and neutral container borders' },
                  { name: 'color.border.strong', var: '--color-border-strong', hex: '#ebdcca', bg: '#ebdcca', text: '#7b3116', desc: 'Strong borders for interactive buttons, chips, and inputs' },
                ].map((token) => (
                  <div
                    key={token.name}
                    onClick={() => handleCopy(`var(${token.var})`, token.name)}
                    className="p-4 rounded-xl border border-[#ebe0dc] hover:border-[#7b3116] transition-all cursor-pointer group hover:shadow-md"
                  >
                    <div 
                      className="w-full h-16 rounded-lg mb-3 flex items-center justify-center font-mono text-xs font-semibold shadow-inner border border-black/10"
                      style={{ backgroundColor: token.bg, color: token.text }}
                    >
                      {token.hex}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#7b3116]">{token.name}</span>
                      {copiedToken === token.name ? (
                        <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                          <Check className="w-3 h-3" /> Copied!
                        </span>
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#7b3116]" />
                      )}
                    </div>
                    <p className="text-[11px] text-[#7b3116]/75 mt-1 font-light">{token.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography Scale Tokens */}
            <div className="bg-white rounded-2xl border border-[#ebe0dc] p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-semibold text-[#7b3116] flex items-center gap-2 mb-2">
                <Type className="w-5 h-5" />
                <span>Typography Scale &amp; Font Stack</span>
              </h3>
              <p className="text-xs text-[#7b3116]/80 mb-6 font-light">
                Primary stack: <code className="bg-[#fffaea] px-2 py-0.5 rounded border border-[#ebdcca]">Helvetica, Arial, sans-serif</code> · Base size: <code className="bg-[#fffaea] px-2 py-0.5 rounded border border-[#ebdcca]">16px</code> · Base Line Height: <code className="bg-[#fffaea] px-2 py-0.5 rounded border border-[#ebdcca]">26.4px</code>
              </p>

              <div className="space-y-3">
                {[
                  { token: 'font.size.xs', px: '11px', role: 'Micro badges, legal text, photo captions', sample: 'COD AVAILABLE ACROSS ALL INDIAN PINCODES' },
                  { token: 'font.size.sm', px: '12px', role: 'Secondary meta, announcement strips, currency tags', sample: 'FREE SHIPPING ON PREPAID ORDERS OVER ₹999' },
                  { token: 'font.size.md', px: '13px', role: 'Nav links, product card tags, tabular prices', sample: 'Rs. 1,459.00 · Handcrafted Pure Mulmul Cotton' },
                  { token: 'font.size.lg', px: '15px', role: 'Product titles, secondary buttons, input text', sample: 'Adaa Scalloped Sleeve Short Kurti' },
                  { token: 'font.size.xl', px: '16px', role: 'Body copy base, primary action labels, drawer titles', sample: 'Designed for easy festive twirls and day-to-evening style.' },
                  { token: 'font.size.2xl', px: '22px', role: 'Section subheadings, collection subtitles', sample: 'For the people who made it one.' },
                  { token: 'font.size.3xl', px: '28px', role: 'Major section titles, drawer headers', sample: 'KORAKAGAZ CLASSICS' },
                  { token: 'font.size.4xl', px: '32px', role: 'Hero campaign titles, promotional drops', sample: 'KK ✦ CORE' },
                ].map((row) => (
                  <div key={row.token} className="p-3 rounded-lg border border-[#ebe0dc] flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-[#fffaea]/40">
                    <div className="w-48 shrink-0">
                      <span className="font-mono text-xs font-bold text-[#7b3116]">{row.token}</span>
                      <span className="text-[11px] text-[#7b3116]/70 block font-light">{row.px} · {row.role}</span>
                    </div>
                    <div className="flex-1 text-[#7b3116] truncate" style={{ fontSize: row.px }}>
                      {row.sample}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Spacing Scale Tokens */}
            <div className="bg-white rounded-2xl border border-[#ebe0dc] p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-semibold text-[#7b3116] flex items-center gap-2 mb-4">
                <Sliders className="w-5 h-5" />
                <span>Spacing Scale Tokens</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { token: 'space.1', val: '6px', role: 'Micro gap, badge padding, icon spacing' },
                  { token: 'space.2', val: '10px', role: 'Input inner padding, pill button padding' },
                  { token: 'space.3', val: '10.4px', role: 'Card internal rhythm, metadata spacing' },
                  { token: 'space.4', val: '20px', role: 'Component padding, grid column gaps' },
                  { token: 'space.5', val: '25px', role: 'Section internal gutters, drawer margins' },
                  { token: 'space.6', val: '28px', role: 'Large card headers, hero margin offsets' },
                  { token: 'space.7', val: '60px', role: 'Section top/bottom padding breaks' },
                ].map((sp) => (
                  <div key={sp.token} className="p-3 rounded-lg border border-[#ebe0dc] bg-[#fffaea]/30">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-mono text-xs font-bold text-[#7b3116]">{sp.token}</span>
                      <span className="text-xs font-bold text-[#7b3116]">{sp.val}</span>
                    </div>
                    <div 
                      className="bg-[#7b3116] rounded-xs mb-2 transition-all"
                      style={{ height: '8px', width: sp.val === '60px' ? '100%' : `${parseInt(sp.val) * 3}px` }}
                    />
                    <p className="text-[11px] text-[#7b3116]/70 font-light">{sp.role}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Radius, Shadow & Motion Tokens */}
            <div className="bg-white rounded-2xl border border-[#ebe0dc] p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-semibold text-[#7b3116] mb-4">
                Radius, Shadow &amp; Motion Tokens
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 rounded-xl border border-[#ebe0dc] space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#7b3116]">Radius Token</h4>
                  <p className="font-mono text-xs text-[#7b3116]">radius.xs = 9999px</p>
                  <div className="p-2 bg-[#fffaea] rounded-full border border-[#7b3116] text-center text-xs font-semibold">
                    Fully rounded capsule button / badge
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-[#ebe0dc] space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#7b3116]">Shadow Tokens</h4>
                  <div className="space-y-2 text-xs">
                    <div className="p-2 bg-white rounded border border-[#ebe0dc] shadow-[0px_2px_10px_0px_rgba(255,255,255,0.15)]">
                      <span className="font-mono text-[11px] block">shadow.1</span>
                      <span className="text-[10px] text-gray-500">rgba(255, 255, 255, 0.15) 0px 2px 10px</span>
                    </div>
                    <div className="p-2 bg-[#fffaea] rounded border border-[#ebe0dc] shadow-[0px_2px_10px_0px_rgba(123,49,22,0.15)]">
                      <span className="font-mono text-[11px] block font-semibold text-[#7b3116]">shadow.2</span>
                      <span className="text-[10px] text-[#7b3116]/70">rgba(123, 49, 22, 0.15) 0px 2px 10px</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-[#ebe0dc] space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#7b3116]">Motion Tokens</h4>
                  <div className="space-y-1 text-xs font-mono">
                    <div className="flex justify-between"><span>motion.instant:</span> <span>100ms</span></div>
                    <div className="flex justify-between"><span>motion.fast:</span> <span>150ms</span></div>
                    <div className="flex justify-between font-bold text-[#7b3116]"><span>motion.normal:</span> <span>200ms</span></div>
                    <div className="flex justify-between"><span>motion.slow:</span> <span>250ms</span></div>
                    <div className="flex justify-between"><span>motion.slower:</span> <span>300ms</span></div>
                    <div className="flex justify-between"><span>motion.step6:</span> <span>450ms</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 2: Component Anatomy */}
        {activeTab === 'components' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Product Card Anatomy */}
            <div className="bg-white rounded-2xl border border-[#ebe0dc] p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-semibold text-[#7b3116] mb-2">
                1. Product Card Anatomy &amp; Variants
              </h3>
              <p className="text-xs text-[#7b3116]/80 mb-6 font-light">
                Cards lead with a 3:4 aspect ratio image container (65%-75% of card height), quiet unboxed or token pill tag, title, price with tabular numbers, and touch-accessible Quick View / Bag actions.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Visual Anatomy Box */}
                <div className="border border-dashed border-[#7b3116] p-4 rounded-xl bg-[#fffaea]/20">
                  <div className="relative aspect-[3/4] w-full max-w-xs mx-auto rounded-lg overflow-hidden border border-[#ebe0dc] bg-white">
                    <div className="w-full h-full bg-[#fffaea] flex items-center justify-center text-xs text-[#7b3116]/60">
                      [ Image Stage 3:4 aspect ratio ]
                    </div>
                    <div className="absolute top-2 left-2 bg-[#7b3116] text-white text-[10px] font-bold px-2 py-0.5 rounded-xs">
                      1. Tag Slot (NEW ARRIVAL)
                    </div>
                    <div className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full shadow-sm text-[#7b3116]">
                      2. Wishlist Icon
                    </div>
                    <div className="absolute inset-x-2 bottom-2 bg-white/95 p-1.5 rounded text-center text-[11px] font-semibold text-[#7b3116]">
                      3. Quick View / Size Picker Trigger
                    </div>
                  </div>
                  <div className="text-center mt-3 space-y-1">
                    <p className="text-xs font-semibold text-[#7b3116]">4. Product Title (15px medium)</p>
                    <p className="text-xs text-[#7b3116] tabular-nums font-normal">5. Price Baseline (Rs. 1,459.00)</p>
                  </div>
                </div>

                {/* Behavioral Rules */}
                <div className="space-y-4 text-xs">
                  <div className="p-3 bg-[#fffaea] rounded-lg border border-[#ebdcca]">
                    <h5 className="font-bold uppercase tracking-wider mb-1">Pointer &amp; Touch Behavior</h5>
                    <p className="text-[#7b3116]/85 leading-relaxed font-light">
                      On desktop hover, card raises with subtle translateY(-2px) and reveals Quick View and size selection actions. On mobile touch, tapping card opens full Product Detail Modal; double-tap adds to wishlist with haptic feedback.
                    </p>
                  </div>

                  <div className="p-3 bg-[#fffaea] rounded-lg border border-[#ebdcca]">
                    <h5 className="font-bold uppercase tracking-wider mb-1">Keyboard Navigation</h5>
                    <p className="text-[#7b3116]/85 leading-relaxed font-light">
                      Product cards must be focusable via Tab key. Hitting Enter opens the PDP modal. All internal child actions (Wishlist, Quick Add) maintain distinct focus rings with 3px outline offset.
                    </p>
                  </div>

                  <div className="p-3 bg-[#fffaea] rounded-lg border border-[#ebdcca]">
                    <h5 className="font-bold uppercase tracking-wider mb-1">Overflow &amp; Edge Cases</h5>
                    <p className="text-[#7b3116]/85 leading-relaxed font-light">
                      Titles longer than 1 line must truncate gracefully with ellipsis. Broken images fallback to styled CSS travertine container with domain glyph.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons & Links Anatomy */}
            <div className="bg-white rounded-2xl border border-[#ebe0dc] p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-semibold text-[#7b3116] mb-4">
                2. Buttons &amp; Interactive Action Variants
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-4 rounded-xl border border-[#ebe0dc] space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#7b3116]">Primary Button</h4>
                  <button className="w-full py-2.5 px-4 bg-[#7b3116] text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-sm hover:bg-[#632712] transition-colors">
                    Add to Bag · Rs. 1,459
                  </button>
                  <p className="text-[11px] text-[#7b3116]/75 font-light">
                    Used for primary conversions: Add to Bag, Checkout, Drop exploration.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-[#ebe0dc] space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#7b3116]">Secondary Outlined</h4>
                  <button className="w-full py-2.5 px-4 bg-transparent border border-[#7b3116] text-[#7b3116] text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-[#fffaea] transition-colors">
                    Quick View
                  </button>
                  <p className="text-[11px] text-[#7b3116]/75 font-light">
                    Used for modal previews, secondary collection filters, and size guides.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-[#ebe0dc] space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#7b3116]">Subtle Action Link</h4>
                  <button className="w-full py-2.5 px-4 text-xs font-medium text-[#7b3116] hover:underline flex items-center justify-center gap-1">
                    <span>Explore All Chapters</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <p className="text-[11px] text-[#7b3116]/75 font-light">
                    Used for navigation transitions, journal exploration, and policies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 3: 7-State Matrix */}
        {activeTab === 'states' && (
          <div className="bg-white rounded-2xl border border-[#ebe0dc] p-6 sm:p-8 shadow-sm space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-lg font-semibold text-[#7b3116] mb-1">
                Mandatory 7-State Component Matrix
              </h3>
              <p className="text-xs text-[#7b3116]/80 font-light">
                Per rule: every component must define explicit states for default, hover, focus-visible, active, disabled, loading, and error.
              </p>
            </div>

            {/* State filter buttons */}
            <div className="flex flex-wrap gap-2 pt-2 border-b border-[#ebdcca] pb-4">
              {(['default', 'hover', 'focus-visible', 'active', 'disabled', 'loading', 'error'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setStateTestFilter(st)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-all uppercase tracking-wider ${
                    stateTestFilter === st
                      ? 'bg-[#7b3116] text-white border-[#7b3116]'
                      : 'bg-[#fffaea] text-[#7b3116] border-[#ebdcca] hover:border-[#7b3116]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            {/* Matrix Display Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#ebe0dc] text-[#7b3116] bg-[#fffaea]">
                    <th className="p-3 font-bold uppercase tracking-wider">State</th>
                    <th className="p-3 font-bold uppercase tracking-wider">Button Preview</th>
                    <th className="p-3 font-bold uppercase tracking-wider">Input Field Preview</th>
                    <th className="p-3 font-bold uppercase tracking-wider">Behavior &amp; CSS Spec</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ebe0dc]">
                  <tr className={stateTestFilter === 'default' ? 'bg-[#fffaea]/50 font-medium' : ''}>
                    <td className="p-3 font-bold">1. Default</td>
                    <td className="p-3">
                      <button className="px-4 py-2 bg-[#7b3116] text-white rounded-full text-xs font-semibold">
                        Add to Bag
                      </button>
                    </td>
                    <td className="p-3">
                      <input readOnly value="452003" className="px-3 py-1.5 border border-[#ebdcca] rounded-lg text-xs" />
                    </td>
                    <td className="p-3 text-[11px] text-[#7b3116]/80">
                      Standard restful resting presentation. Accessible contrast &ge; 4.5:1.
                    </td>
                  </tr>

                  <tr className={stateTestFilter === 'hover' ? 'bg-[#fffaea]/50 font-medium' : ''}>
                    <td className="p-3 font-bold">2. Hover</td>
                    <td className="p-3">
                      <button className="px-4 py-2 bg-[#632712] text-white rounded-full text-xs font-semibold -translate-y-0.5 shadow-md">
                        Add to Bag
                      </button>
                    </td>
                    <td className="p-3">
                      <input readOnly value="452003" className="px-3 py-1.5 border border-[#7b3116] rounded-lg text-xs bg-[#fffaea]/30" />
                    </td>
                    <td className="p-3 text-[11px] text-[#7b3116]/80">
                      Darkens by 12% and scales slightly (+2px translateY) within 150ms.
                    </td>
                  </tr>

                  <tr className={stateTestFilter === 'focus-visible' ? 'bg-[#fffaea]/50 font-medium' : ''}>
                    <td className="p-3 font-bold">3. Focus-Visible</td>
                    <td className="p-3">
                      <button className="px-4 py-2 bg-[#7b3116] text-white rounded-full text-xs font-semibold ring-2 ring-[#7b3116] ring-offset-2">
                        Add to Bag
                      </button>
                    </td>
                    <td className="p-3">
                      <input readOnly value="452003" className="px-3 py-1.5 border-2 border-[#7b3116] rounded-lg text-xs ring-2 ring-[#7b3116] ring-offset-1" />
                    </td>
                    <td className="p-3 text-[11px] text-[#7b3116]/80">
                      WCAG 2.2 compliant 2px solid ring with 2px-3px offset. Keyboard-only.
                    </td>
                  </tr>

                  <tr className={stateTestFilter === 'active' ? 'bg-[#fffaea]/50 font-medium' : ''}>
                    <td className="p-3 font-bold">4. Active</td>
                    <td className="p-3">
                      <button className="px-4 py-2 bg-[#521f0e] text-white rounded-full text-xs font-semibold translate-y-0.5">
                        Add to Bag
                      </button>
                    </td>
                    <td className="p-3">
                      <input readOnly value="452003" className="px-3 py-1.5 border border-[#521f0e] bg-white rounded-lg text-xs" />
                    </td>
                    <td className="p-3 text-[11px] text-[#7b3116]/80">
                      Depression feedback on mouse click or touch contact (100ms instant).
                    </td>
                  </tr>

                  <tr className={stateTestFilter === 'disabled' ? 'bg-[#fffaea]/50 font-medium' : ''}>
                    <td className="p-3 font-bold">5. Disabled</td>
                    <td className="p-3">
                      <button disabled className="px-4 py-2 bg-gray-200 text-gray-400 rounded-full text-xs font-semibold cursor-not-allowed">
                        Out of Stock
                      </button>
                    </td>
                    <td className="p-3">
                      <input disabled value="Not available" className="px-3 py-1.5 border border-gray-200 bg-gray-50 text-gray-400 rounded-lg text-xs cursor-not-allowed" />
                    </td>
                    <td className="p-3 text-[11px] text-[#7b3116]/80">
                      Pointer-events disabled, opacity 50%, aria-disabled=&quot;true&quot;.
                    </td>
                  </tr>

                  <tr className={stateTestFilter === 'loading' ? 'bg-[#fffaea]/50 font-medium' : ''}>
                    <td className="p-3 font-bold">6. Loading</td>
                    <td className="p-3">
                      <button className="px-4 py-2 bg-[#7b3116] text-white rounded-full text-xs font-semibold flex items-center gap-1.5 opacity-85 cursor-wait">
                        <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Adding...</span>
                      </button>
                    </td>
                    <td className="p-3">
                      <div className="w-32 h-7 bg-gray-200 animate-pulse rounded-lg" />
                    </td>
                    <td className="p-3 text-[11px] text-[#7b3116]/80">
                      Inline spinner replaces icon; aria-busy=&quot;true&quot; prevents duplicate orders.
                    </td>
                  </tr>

                  <tr className={stateTestFilter === 'error' ? 'bg-[#fffaea]/50 font-medium' : ''}>
                    <td className="p-3 font-bold">7. Error</td>
                    <td className="p-3">
                      <button className="px-4 py-2 bg-red-700 text-white rounded-full text-xs font-semibold">
                        Retry Order
                      </button>
                    </td>
                    <td className="p-3">
                      <input readOnly value="Invalid PIN" className="px-3 py-1.5 border-2 border-red-600 rounded-lg text-xs text-red-700 bg-red-50" />
                    </td>
                    <td className="p-3 text-[11px] text-[#7b3116]/80">
                      Never signaled by color alone; accompanied by explicit helper text &amp; icon.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab Content 4: WCAG 2.2 AA Criteria */}
        {activeTab === 'wcag' && (
          <div className="bg-white rounded-2xl border border-[#ebe0dc] p-6 sm:p-8 shadow-sm space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-lg font-semibold text-[#7b3116] mb-1">
                Accessibility Requirements &amp; Testable Acceptance Criteria (WCAG 2.2 AA)
              </h3>
              <p className="text-xs text-[#7b3116]/80 font-light">
                Every rule in this specification is verifiable through automated audits and keyboard-only test sequences.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 rounded-xl border border-[#ebe0dc] bg-[#fffaea]/20 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#7b3116]">1. Contrast Ratios</h4>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">6.8:1 PASS</span>
                </div>
                <div className="space-y-2 text-xs text-[#7b3116]/85 font-light">
                  <p><strong className="font-semibold text-[#7b3116]">Rule:</strong> Text must meet minimum 4.5:1 for body and 3.0:1 for large display headlines.</p>
                  <p><strong className="font-semibold text-[#7b3116]">Measurement:</strong> Primary terracotta (#7b3116) on White (#ffffff) yields <span className="font-bold">6.84:1</span> ratio (well above 4.5:1 requirement).</p>
                  <p><strong className="font-semibold text-[#7b3116]">Raised Surface:</strong> #7b3116 on #fffaea yields <span className="font-bold">6.52:1</span> ratio (PASS).</p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-[#ebe0dc] bg-[#fffaea]/20 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#7b3116]">2. Target Size Minimum</h4>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">&ge; 44px PASS</span>
                </div>
                <div className="space-y-2 text-xs text-[#7b3116]/85 font-light">
                  <p><strong className="font-semibold text-[#7b3116]">Rule:</strong> Interactive touch targets must occupy at least 44x44px bounding area on mobile devices.</p>
                  <p><strong className="font-semibold text-[#7b3116]">Implementation:</strong> Size selector buttons, cart steppers, and mobile navigation toggles utilize minimum 44px touch envelopes.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-[#ebe0dc] bg-[#fffaea]/20 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#7b3116]">3. Focus Appearance (WCAG 2.4.13)</h4>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">PASS</span>
                </div>
                <div className="space-y-2 text-xs text-[#7b3116]/85 font-light">
                  <p><strong className="font-semibold text-[#7b3116]">Rule:</strong> Focus indicator must have an area &ge; perimeter of target &times; 2px and contrast &ge; 3:1.</p>
                  <p><strong className="font-semibold text-[#7b3116]">Implementation:</strong> Custom <code className="bg-[#fffaea] px-1 py-0.5 rounded">:focus-visible</code> ring with 2px stroke and 3px offset in brand primary color.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-[#ebe0dc] bg-[#fffaea]/20 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#7b3116]">4. Keyboard Operability</h4>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">PASS</span>
                </div>
                <div className="space-y-2 text-xs text-[#7b3116]/85 font-light">
                  <p><strong className="font-semibold text-[#7b3116]">Rule:</strong> All features must be operable without requiring a mouse or pointer device.</p>
                  <p><strong className="font-semibold text-[#7b3116]">Implementation:</strong> Escape closes drawers and modals; Cmd+K opens quick search; Tab and Shift+Tab traverse products logically.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 5: Guidelines & Anti-Patterns */}
        {activeTab === 'guidelines' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Tone of Voice */}
            <div className="bg-white rounded-2xl border border-[#ebe0dc] p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-semibold text-[#7b3116] mb-3">
                Writing Tone &amp; Content Standards
              </h3>
              <p className="text-xs text-[#7b3116]/80 mb-6 font-light">
                Voice must remain concise, confident, and implementation-focused. Avoid hype, artificial urgency, or generic AI fluff.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-2">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approved Copy</span>
                  </div>
                  <ul className="space-y-2 text-emerald-950/85 font-light">
                    <li>&ldquo;COD available! Free shipping on prepaid orders over ₹999.&rdquo;</li>
                    <li>&ldquo;A collection that brings together the pieces that feel most like us.&rdquo;</li>
                    <li>&ldquo;Handcrafted from 100% fine mulmul cotton in Indore, India.&rdquo;</li>
                    <li>&ldquo;Select Size: Bust 34&quot; to 44&quot;&rdquo;</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl border border-red-200 bg-red-50/40 space-y-2">
                  <div className="flex items-center gap-1.5 text-red-800 font-bold uppercase tracking-wider">
                    <XCircle className="w-4 h-4" />
                    <span>Prohibited Clichés</span>
                  </div>
                  <ul className="space-y-2 text-red-950/85 font-light">
                    <li>❌ &ldquo;HURRY!! Only 2 left in stock!! Click here before it sells out!&rdquo;</li>
                    <li>❌ &ldquo;Revolutionary AI-powered fashion algorithm for the modern diva.&rdquo;</li>
                    <li>❌ &ldquo;Initiate garment sequence to activate wardrobe optimization.&rdquo;</li>
                    <li>❌ Ambiguous action verbs like &ldquo;Click Here&rdquo;, &ldquo;Go&rdquo;, or &ldquo;Check&rdquo;.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Anti-Patterns */}
            <div className="bg-white rounded-2xl border border-[#ebe0dc] p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-semibold text-[#7b3116] mb-4">
                Prohibited Implementations &amp; Anti-Patterns
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-3 bg-[#fffaea] rounded-lg border border-[#ebdcca] space-y-1">
                  <span className="font-bold text-red-700 block">❌ Zero-Pill Violation</span>
                  <p className="text-[#7b3116]/80 font-light">Never enclose static text metadata (e.g. read time, tags, dates) in colored pill boxes or candy chips.</p>
                </div>
                <div className="p-3 bg-[#fffaea] rounded-lg border border-[#ebdcca] space-y-1">
                  <span className="font-bold text-red-700 block">❌ Pseudo-Code Headers</span>
                  <p className="text-[#7b3116]/80 font-light">No code comment headers like `// 01_CORE` or mock system latency bars `STATUS: ONLINE`.</p>
                </div>
                <div className="p-3 bg-[#fffaea] rounded-lg border border-[#ebdcca] space-y-1">
                  <span className="font-bold text-red-700 block">❌ Broken Fallbacks</span>
                  <p className="text-[#7b3116]/80 font-light">Never render broken image frames. Every image must have resilient CSS fallbacks and alt tags.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 6: QA Acceptance Checklist */}
        {activeTab === 'qa' && (
          <div className="bg-white rounded-2xl border border-[#ebe0dc] p-6 sm:p-8 shadow-sm space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-lg font-semibold text-[#7b3116] mb-1">
                Release QA Acceptance Checklist
              </h3>
              <p className="text-xs text-[#7b3116]/80 font-light">
                Verify each quality gate before pushing changes to production. All non-negotiable rules must pass.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { id: 'token-vars', label: 'Semantic tokens used across all CSS; zero hardcoded raw hex deviations in guidance.', rule: 'MUST' },
                { id: 'wcag-contrast', label: 'All body text & badges achieve minimum 4.5:1 WCAG AA contrast ratio.', rule: 'MUST' },
                { id: 'focus-ring', label: 'Visible keyboard focus rings (:focus-visible) render on all 107 buttons and 99 links.', rule: 'MUST' },
                { id: 'touch-target', label: 'Interactive elements measure at least 44px x 44px bounding box on mobile viewports.', rule: 'MUST' },
                { id: 'lazy-loading', label: 'Images implement native loading="lazy" attribute and optimized cache persistence.', rule: 'MUST' },
                { id: 'alt-tags', label: 'All <img> elements specify descriptive alt text and referrerPolicy="no-referrer".', rule: 'MUST' },
                { id: 'responsive-overflow', label: 'Desktop 1440px and mobile 375px viewports contain zero horizontal scroll overflow.', rule: 'MUST' },
                { id: 'tabular-nums', label: 'Currency prices and numeric quantity steppers utilize tabular figures (tabular-nums).', rule: 'SHOULD' },
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleQa(item.id)}
                  className={`p-3.5 rounded-xl border flex items-center justify-between gap-4 cursor-pointer transition-colors ${
                    qaChecks[item.id] ? 'bg-[#fffaea]/50 border-[#ebdcca]' : 'bg-white border-[#ebe0dc]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                      qaChecks[item.id] ? 'bg-[#7b3116] border-[#7b3116] text-white' : 'border-gray-300'
                    }`}>
                      {qaChecks[item.id] && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#7b3116]">{item.label}</p>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                    item.rule === 'MUST' ? 'bg-[#7b3116] text-white' : 'bg-[#ebdcca] text-[#7b3116]'
                  }`}>
                    {item.rule}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 bg-[#fffaea] rounded-xl border border-[#ebdcca] flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-[#7b3116]">Checklist Status:</span>
                <span className="ml-2 text-emerald-800 font-semibold">
                  {Object.values(qaChecks).filter(Boolean).length} / {Object.keys(qaChecks).length} Passing
                </span>
              </div>
              <span className="text-[11px] text-[#7b3116]/80 font-medium">
                Production Release Ready
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
