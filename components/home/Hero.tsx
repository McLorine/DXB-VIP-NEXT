import React from "react";
import { motion } from "framer-motion";
import { Image } from "@/components/ui/image";
import GoldButton from "@/components/common/GoldButton"
import StatStrip from "@/components/home/StatStrip";
import { IMAGES } from "@/lib/siteData";

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <Image src={IMAGES.hero} alt="Aerial view of Dubai city skyline at night" className="h-full w-full" focalPointY={0.4} />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/85 to-charcoal/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-charcoal/60" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10 pt-40 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <span className="eyebrow">UAE's No.1 Business Setup Company — Since 2008</span>
          <h1 className="mt-6 text-[2.7rem] sm:text-[3.6rem] lg:text-[4.6rem] leading-[1.02] text-white">
            Your #1 Trusted Business Setup <span className="text-gold">Consultants in Dubai</span>
          </h1>
          <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-white/80">
            We make business setup in Dubai simple and stress-free. From trade licenses and visa processing to bank account opening and office solutions, our experts guide you through every step — so you can focus on building your business, not battling paperwork.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <GoldButton to="/contact#consultation" className="bg-white text-charcoal hover:bg-white/90">Book a Consultation</GoldButton>
            <GoldButton to="/estimate" variant="outline" className="border-white/50 text-white hover:bg-white/10 hover:text-white">Cost Calculator</GoldButton>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 max-w-4xl"
        >
          <StatStrip dark />
        </motion.div>
      </div>
    </section>
  );
}