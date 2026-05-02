'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, MapPin, Users, Fuel, IndianRupee } from 'lucide-react'

export function NationalHero() {
  return (
    <section className="relative overflow-hidden bg-navy-900 text-white india-map-bg">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(217,119,6,0.15),_transparent_60%)]" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container relative py-20 md:py-28 lg:py-36">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-gold-600/30 bg-gold-600/10 px-4 py-1.5 text-sm text-gold-300 mb-6"
          >
            <span className="h-2 w-2 rounded-full bg-gold-400 animate-pulse" />
            Exclusive National Partner of iFuel — PAN India Mandate
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-balance text-white"
          >
            Powering India's{' '}
            <span className="text-gold-400">Decentralized Fuel</span> Revolution
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 text-lg md:text-xl text-navy-200 max-w-2xl leading-relaxed"
          >
            AIVC is the Exclusive National Marketing, Implementation & Channel Development
            Partner for iFuel mini fuel pumps — building India's largest decentralized fuel
            distribution network across 28 states & 8 Union Territories.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Button asChild variant="gold" size="xl">
              <Link href="/become-state-partner">
                Become a State Partner
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="xl"
              className="bg-white/5 border-white/30 text-white hover:bg-white/10"
            >
              <Link href="/network">Explore the Network</Link>
            </Button>
          </motion.div>

          {/* Hero stat overlay */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl"
          >
            <HeroStat icon={MapPin} value="28+8" label="States & UTs" />
            <HeroStat icon={Users} value="500+" label="Districts" />
            <HeroStat icon={Fuel} value="1L+" label="Pumps Vision" />
            <HeroStat icon={IndianRupee} value="₹3.50/L" label="Network Margin" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function HeroStat({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ElementType
  value: string
  label: string
}) {
  return (
    <div className="border-l-2 border-gold-600/40 pl-4">
      <Icon className="h-5 w-5 text-gold-400 mb-2" />
      <div className="font-serif text-3xl font-bold text-white">{value}</div>
      <div className="text-xs uppercase tracking-wider text-navy-300 mt-1">{label}</div>
    </div>
  )
}
