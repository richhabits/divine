import React from 'react';
import { motion } from 'framer-motion';
import pricing from '@/lib/pricing.json';

// AdvertisingPricing component renders the advertising package grid.
// It uses the same visual style as the original static implementation but
// pulls its data from the JSON file for easier maintenance.

const AdvertisingPricing: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {pricing.packages.map((pkg: any, i: number) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15 }}
          className={`p-8 rounded-2xl border transition-all ${
            pkg.highlight
              ? 'bg-brand-gold/10 border-brand-gold/40 shadow-[0_0_40px_rgba(201,168,76,0.1)]'
              : 'glass-panel border-white/5'
          }`}
        >
          {pkg.highlight && (
            <span className="inline-block px-3 py-1 bg-brand-gold text-black text-[9px] font-bold tracking-[0.2em] uppercase rounded-full mb-4">
              Most Popular
            </span>
          )}
          <h3 className="text-2xl font-black mb-2">{pkg.tier}</h3>
          <p className="text-brand-gold font-bold text-lg mb-6">{pkg.price}</p>
          <ul className="space-y-3 mb-8">
            {pkg.features.map((f: string) => (
              <li key={f} className="flex items-start gap-3 text-sm text-white/60">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-1.5 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
          <a
            href="mailto:info@divineradiolondon.com?subject=Advertising%20Enquiry"
            className={`block w-full py-3 rounded-xl text-center text-[11px] font-black tracking-[0.2em] uppercase transition-all ${
              pkg.highlight
                ? 'bg-brand-gold text-black hover:bg-[#E8D48B]'
                : 'bg-white/5 text-white border border-white/10 hover:border-brand-gold/40'
            }`}
          >
            Get In Touch
          </a>
        </motion.div>
      ))}
    </div>
  );
};

export default AdvertisingPricing;
