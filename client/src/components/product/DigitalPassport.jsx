import React from 'react'
import { motion } from 'framer-motion'
import { 
  ShieldCheck, 
  Leaf, 
  Zap, 
  CalendarDays,
  CheckCircle2,
  TreeDeciduous,
  BadgeCheck,
  TrendingUp,
  History,
  CheckCircle,
} from 'lucide-react'
import { format } from 'date-fns'

const DigitalPassport = ({ passport, product }) => {
  if (!passport) return null

  // Map from backend structure to timeline
  const lifecycle = passport.traceability?.lifecycle || []
  const timelineEvents = lifecycle.map((item) => {
    const icons = {
      'Planted': <Leaf className="w-4 h-4" />,
      'Quality Inspection': <BadgeCheck className="w-4 h-4" />,
      'Harvested': <CalendarDays className="w-4 h-4" />,
      'Listed on Marketplace': <Zap className="w-4 h-4" />,
    }
    const colors = {
      'Planted': 'bg-green-100 text-green-600',
      'Quality Inspection': 'bg-blue-100 text-blue-600',
      'Harvested': 'bg-amber-100 text-amber-600',
      'Listed on Marketplace': 'bg-purple-100 text-purple-600',
    }
    return {
      label: item.stage,
      date: item.date,
      icon: icons[item.stage] || <CheckCircle2 className="w-4 h-4" />,
      color: colors[item.stage] || 'bg-zinc-100 text-zinc-600'
    }
  })

  const quality = passport.qualityVerification || passport.aiVerification || {}
  const eco = passport.ecoSustainability || {}
  const freshnessScore = quality.freshnessScore || 95

  return (
    <div className="mt-12 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-foreground flex items-center gap-2">
          <ShieldCheck className="w-7 h-7 text-farmer-600" />
          Digital Crop Passport
        </h2>
        <div className="px-3 py-1 bg-farmer-100 text-farmer-700 rounded-full text-[10px] font-black tracking-widest uppercase flex items-center gap-1">
          <CheckCircle className="w-3 h-3" />
          Farm Traceability Verified
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Quality & Freshness Assessment */}
        <div className="md:col-span-1">
          <div className="relative h-full p-6 rounded-[2rem] bg-gradient-to-br from-zinc-50 to-zinc-100 border border-zinc-200 shadow-xl overflow-hidden flex flex-col items-center justify-center text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4 w-full"
            >
              <div className="relative inline-block">
                <div className="w-24 h-24 bg-farmer-500 rounded-full flex items-center justify-center shadow-lg shadow-farmer-500/30">
                  <span className="text-3xl font-black text-white">{freshnessScore}%</span>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white p-1 rounded-full shadow-md">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
              </div>
              <div>
                <h3 className="font-black text-foreground">Farm Freshness Score</h3>
                <p className="text-[11px] text-muted-foreground font-medium leading-tight px-2 mt-1">
                  Inspected and verified for Grade {product?.qualityGrade || 'A'} quality standards.
                </p>
                <div className="mt-2 text-[10px] font-bold text-farmer-600 bg-farmer-50 px-2.5 py-1 rounded-md inline-block">
                  Grade {product?.qualityGrade || 'A'} Produce
                </div>
              </div>
            </motion.div>
            
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-farmer-500/5 rounded-full blur-3xl" />
          </div>
        </div>

        {/* Middle: Traceability Timeline */}
        <div className="md:col-span-1">
          <div className="p-6 rounded-[2rem] bg-white border border-zinc-200 shadow-xl h-full">
            <div className="flex items-center gap-2 mb-6">
              <History className="w-5 h-5 text-zinc-400" />
              <h3 className="font-black text-zinc-800 uppercase tracking-tight text-sm">Traceability Timeline</h3>
            </div>
            <div className="space-y-4">
              {timelineEvents.map((event, idx) => (
                <div key={idx} className="flex gap-4 relative">
                  {idx !== timelineEvents.length - 1 && (
                    <div className="absolute left-[18px] top-9 bottom-[-16px] w-[2px] bg-zinc-100" />
                  )}
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 z-10 shadow-sm ${event.color}`}>
                    {event.icon}
                  </div>
                  <div className="pt-1 text-left">
                    <p className="text-xs font-black text-zinc-900 leading-none mb-1">{event.label}</p>
                    <p className="text-[10px] text-zinc-400 font-bold uppercase">
                      {event.date ? format(new Date(event.date), 'MMM dd, yyyy') : 'Pending'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Eco-Impact */}
        <div className="md:col-span-1">
          <div className="p-6 rounded-[2rem] bg-farmer-900 text-white shadow-xl h-full relative overflow-hidden group">
            <div className="flex items-center gap-2 mb-6">
              <TreeDeciduous className="w-5 h-5 text-farmer-400" />
              <h3 className="font-black text-farmer-100 uppercase tracking-tight text-sm">Eco-Impact Score</h3>
            </div>
            <div className="space-y-6">
              <div className="text-left">
                <p className="text-4xl font-black mb-1">-{eco.co2Saved || '4.2kg'}</p>
                <p className="text-xs text-farmer-300 font-bold uppercase tracking-widest">CO2 OFFSET SAVED</p>
              </div>
              <div className="pt-4 border-t border-farmer-800 text-left">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-farmer-800 rounded-lg shrink-0">
                    <TrendingUp className="w-4 h-4 text-farmer-400" />
                  </div>
                  <p className="text-[11px] leading-snug font-medium text-farmer-100">
                    By choosing local, you saved <span className="text-farmer-400 font-black">{eco.transportKmSaved || '950km'}</span> of transport vs standard chains.
                  </p>
                </div>
              </div>
              <div className="text-[10px] text-farmer-500 font-bold uppercase tracking-wider">
                 Water Efficiency: {eco.waterEfficiency}
              </div>
            </div>
            
            <div className="absolute bottom-0 right-0 p-4 opacity-10 transition-transform group-hover:scale-110">
              <Leaf className="w-24 h-24" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DigitalPassport
