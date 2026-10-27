import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TrendingUp, TrendingDown, Search, MapPin,
  BarChart3, RefreshCw, Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/lib/utils'

const districts = [
  'Nashik', 'Pune', 'Nagpur', 'Aurangabad', 'Kolhapur',
  'Solapur', 'Sangli', 'Satara', 'Jalgaon', 'Ahmednagar',
]

const commodities = [
  'Tomato', 'Onion', 'Potato', 'Grapes', 'Pomegranate',
  'Sugarcane', 'Wheat', 'Rice', 'Soybean', 'Cotton',
  'Turmeric', 'Red Chilli', 'Banana', 'Orange', 'Mango',
]

const generatePriceHistory = (basePrice) => {
  return Array.from({ length: 30 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (29 - i))
    const variation = (Math.random() - 0.5) * basePrice * 0.3
    return {
      date: date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
      price: Math.round(basePrice + variation),
      volume: Math.floor(Math.random() * 1000) + 100,
    }
  })
}

const generateCurrentPrices = () => [
  { commodity: 'Tomato', market: 'Nashik APMC', minPrice: 1800, maxPrice: 3000, modalPrice: 2500, arrival: 450, change: 5.2, trend: 'up' },
  { commodity: 'Onion', market: 'Nashik APMC', minPrice: 1200, maxPrice: 2100, modalPrice: 1800, arrival: 800, change: -3.1, trend: 'down' },
  { commodity: 'Potato', market: 'Pune APMC', minPrice: 800, maxPrice: 1400, modalPrice: 1100, arrival: 600, change: 2.8, trend: 'up' },
  { commodity: 'Grapes', market: 'Nashik APMC', minPrice: 4000, maxPrice: 6000, modalPrice: 5000, arrival: 200, change: 8.5, trend: 'up' },
  { commodity: 'Pomegranate', market: 'Solapur APMC', minPrice: 6000, maxPrice: 9000, modalPrice: 7500, arrival: 150, change: -1.2, trend: 'down' },
  { commodity: 'Sugarcane', market: 'Kolhapur APMC', minPrice: 2800, maxPrice: 3200, modalPrice: 3000, arrival: 1200, change: 0.5, trend: 'up' },
  { commodity: 'Wheat', market: 'Aurangabad APMC', minPrice: 2200, maxPrice: 2600, modalPrice: 2400, arrival: 500, change: 1.3, trend: 'up' },
  { commodity: 'Soybean', market: 'Latur APMC', minPrice: 4500, maxPrice: 5200, modalPrice: 4800, arrival: 350, change: -2.5, trend: 'down' },
]

const MarketPrices = () => {
  const { user } = useAuth()
  const [selectedDistrict, setSelectedDistrict] = useState(user?.district || 'Nashik')
  const [selectedCommodity, setSelectedCommodity] = useState('Tomato')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPrices, setCurrentPrices] = useState(generateCurrentPrices())
  const [priceHistory, setPriceHistory] = useState(generatePriceHistory(2500))

  const filteredPrices = currentPrices.filter(p =>
    p.commodity.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCommoditySelect = (commodity) => {
    setSelectedCommodity(commodity)
    const basePrices = {
      Tomato: 2500, Onion: 1800, Potato: 1100, Grapes: 5000,
      Pomegranate: 7500, Sugarcane: 3000, Wheat: 2400, Soybean: 4800,
    }
    setPriceHistory(generatePriceHistory(basePrices[commodity] || 2000))
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700 w-full pb-10">
      {/* Dynamic Header */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-8 md:p-12 shadow-2xl border border-white/10 isolate">
        {/* Abstract Glowing Orbs */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-farmer-500 rounded-full mix-blend-multiply filter blur-[80px] opacity-40 animate-blob" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-[80px] opacity-40 animate-blob animation-delay-2000" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <Badge className="bg-card/10 text-white hover:bg-card/20 border-none px-3 py-1 mb-6 backdrop-blur-md">
              <Sparkles className="w-3 h-3 mr-2 text-farmer-400" /> Live APMC Data
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4">
              Market <span className="text-transparent bg-clip-text bg-gradient-to-r from-farmer-400 to-green-300">Intelligence</span>
            </h1>
            <p className="text-zinc-400 text-lg font-medium leading-relaxed max-w-xl">
              Real-time agricultural commodity prices and historical mandi market trends tailored to your district.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-black/20 p-2 rounded-3xl backdrop-blur-xl border border-white/5">
            <div className="flex items-center gap-2 bg-card/5 px-4 py-2 rounded-2xl">
              <MapPin className="w-4 h-4 text-farmer-400" />
              <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                <SelectTrigger className="w-[140px] border-none bg-transparent focus:ring-0 shadow-none h-8 text-white">
                  <SelectValue placeholder="District" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-white/10 text-white">
                  {districts.map(d => <SelectItem key={d} value={d} className="focus:bg-card/10 focus:text-white">{d}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Button variant="ghost" size="icon" className="rounded-2xl w-12 h-12 text-zinc-300 hover:text-white hover:bg-card/10 transition-all">
              <RefreshCw className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="prices" className="w-full">
        <div className="flex justify-center mb-10">
          <TabsList className="bg-muted/50 p-1.5 rounded-full border border-border/50 h-14 shadow-sm backdrop-blur-md">
            <TabsTrigger value="prices" className="rounded-full px-6 transition-all duration-300">
              <BarChart3 className="w-4 h-4 mr-2" />
              Real-time
            </TabsTrigger>
            <TabsTrigger value="trends" className="rounded-full px-6 transition-all duration-300">
              <TrendingUp className="w-4 h-4 mr-2" />
              Trends
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Current Prices Content */}
        <TabsContent value="prices" className="space-y-8 outline-none">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="relative group w-full md:max-w-md">
              <div className="absolute inset-0 bg-gradient-to-r from-farmer-500/20 to-blue-500/20 rounded-full blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-background/60 backdrop-blur-xl border border-border/60 rounded-full flex items-center shadow-sm">
                <Search className="w-5 h-5 ml-5 text-muted-foreground group-focus-within:text-farmer-600 transition-colors" />
                <Input
                  placeholder="Search specific commodity..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="border-none bg-transparent focus-visible:ring-0 px-4 h-14 text-base"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2 px-4 py-2 bg-muted/30 rounded-full border border-border/40">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                Showing {filteredPrices.length} Items
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredPrices.map((price, index) => (
                <motion.div
                  key={price.commodity}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05, duration: 0.4, type: 'spring', bounce: 0.4 }}
                  layout
                >
                  <Card
                    className={cn(
                      'group cursor-pointer rounded-3xl border-border/40 bg-background/40 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-farmer-500/10 hover:-translate-y-2',
                      selectedCommodity === price.commodity ? 'ring-2 ring-farmer-500 bg-farmer-500/5' : ''
                    )}
                    onClick={() => handleCommoditySelect(price.commodity)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <CardContent className="p-6 relative z-10">
                      <div className="flex items-start justify-between mb-8">
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-inner",
                            price.trend === 'up' ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
                          )}>
                            {price.trend === 'up' ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-foreground tracking-tight">{price.commodity}</h3>
                            <p className="text-[10px] font-semibold text-muted-foreground uppercase mt-0.5">{price.market}</p>
                          </div>
                        </div>
                        
                        <div className={cn(
                          'flex items-center gap-1 font-bold text-sm px-2.5 py-1 rounded-full',
                          price.trend === 'up' ? 'text-green-600 bg-green-500/10' : 'text-red-600 bg-red-500/10'
                        )}>
                          {Math.abs(price.change)}%
                        </div>
                      </div>

                      <div className="mb-8">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/60">
                            ₹{price.modalPrice.toLocaleString()}
                          </span>
                          <span className="text-sm font-semibold text-muted-foreground">/ qtl</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                          <span>Range</span>
                          <span>Arrivals: {price.arrival}T</span>
                        </div>
                        
                        <div className="relative h-2 w-full bg-muted/50 rounded-full overflow-hidden">
                          <div className="absolute inset-y-0 left-[20%] right-[30%] bg-gradient-to-r from-farmer-400 to-farmer-500 rounded-full" />
                        </div>
                        
                        <div className="flex justify-between items-center text-xs font-bold text-foreground">
                          <span>₹{price.minPrice}</span>
                          <span>₹{price.maxPrice}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {filteredPrices.length === 0 && (
              <div className="col-span-full py-20 text-center">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">No commodities found</h3>
                <p className="text-muted-foreground mt-2">Try adjusting your search term</p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Trends Content */}
        <TabsContent value="trends" className="space-y-6">
          <Card className="rounded-3xl border-border/50 overflow-hidden shadow-lg bg-background/50 backdrop-blur-sm">
            <CardHeader className="border-b border-border/30 bg-muted/10 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-farmer-500" />
                  {selectedCommodity} Analysis
                </CardTitle>
                <CardDescription>Price fluctuations over the last 30 days in {selectedDistrict}</CardDescription>
              </div>
              <Select value={selectedCommodity} onValueChange={handleCommoditySelect}>
                <SelectTrigger className="w-[180px] rounded-full border-border/50 bg-background/80 shadow-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {commodities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <div className="h-[450px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={priceHistory}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground))" opacity={0.1} />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 11, fontWeight: 500 }} 
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis 
                      tick={{ fontSize: 11, fontWeight: 500 }} 
                      tickFormatter={v => `₹${v}`}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--background))', borderRadius: '16px', border: '1px solid hsl(var(--border))', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      formatter={(v, n) => [n === 'price' ? `₹${v}/quintal` : `${v} quintals`, n === 'price' ? 'Price' : 'Volume']} 
                    />
                    <Legend iconType="circle" />
                    <Area type="monotone" dataKey="price" stroke="#22c55e" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" name="Price" activeDot={{ r: 6, strokeWidth: 0, fill: '#22c55e' }} />
                    <Area type="monotone" dataKey="volume" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorVolume)" name="Volume" strokeDasharray="5 5" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default MarketPrices
